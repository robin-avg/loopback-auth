import { BindingKey } from '@loopback/core';
import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from './repositories';
import { Usermodel } from './models';
import { PasswordHasher } from './services/hash.password.bcrypt';
import { JWTservice } from './services/jwt-service';

export namespace TokenServiceConstants {
    export const TOKEN_SECRET_VALUE = '138asda8213';
    export const TOKEN_EXPIRES_IN_VALUE = '7h';
}
export namespace TokenServiceBindings {
    export const TOKEN_SECRET = BindingKey.create<string>(
        'authentication.jwt.secret',
    );
    export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
        'authentication.jwt.expiresIn',
    );
    export const TOKEN_SERVICE = BindingKey.create<JWTservice>(
        'services.jwt.service',
    );
}

export namespace PasswordHasherBindings {
    export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
        'services.hasher',
    );
    export const ROUNDS = BindingKey.create<number>('services.hasher.rounds');
}

export namespace UserServiceBindings {
    export const USER_SERVICE = BindingKey.create<UserService<Credentials, Usermodel>>(
        'services.user.service',
    );
}
