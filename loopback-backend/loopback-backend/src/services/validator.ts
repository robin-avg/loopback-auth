import * as isEmail from 'isemail';
import { HttpErrors } from '@loopback/rest';
import { Credentials } from '../repositories/usermodel.repository';

export function validateCredentials(credentials: Credentials) {
    if (!isEmail.validate(credentials.Email)) {
        throw new HttpErrors.UnprocessableEntity('invalid Email');
    }

    if (credentials.password.length < 8) {
        throw new HttpErrors.UnprocessableEntity(
            'password length should be greater than 8',
        );
    }
}