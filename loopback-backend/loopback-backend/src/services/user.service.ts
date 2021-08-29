import { UserService } from "@loopback/authentication";
import { inject } from "@loopback/core";
import { repository } from "@loopback/repository";
import { HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import { PasswordHasherBindings } from "../keys";
import { Usermodel } from "../models";
import { Credentials, UsermodelRepository } from "../repositories";
import { BcryptHasher } from "./hash.password.bcrypt";

export class MyUserService implements UserService<Usermodel, Credentials>{

    constructor(
        @repository(UsermodelRepository)
        public usermodelRepository: UsermodelRepository,
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public hasher: BcryptHasher,
    ) { }

    async verifyCredentials(credentials: Credentials): Promise<Usermodel> {
        console.log("entered");
        const foundUser = await this.usermodelRepository.findOne({
            where: {
                Email: credentials.Email
            }
        });
        console.log(foundUser);
        if (!foundUser) {
            throw new HttpErrors.NotFound(`user not found with this ${credentials.Email}`);
        }

        const passwordMatched = await this.hasher.comparePassword(credentials.password, foundUser.password!);

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized('Password doesnt matches');
        }
        return foundUser;
    }
    convertToUserProfile(user: Usermodel): UserProfile {
        let userName = '';
        if (user.firstname) {
            userName = user.firstname;
        }
        if (user.lastname) {
            userName = user.firstname
                ? `${user.firstname} ${user.lastname}`
                : user.lastname;
        }
        return { Uid: `${user.Uid}`, name: userName };
    }

}