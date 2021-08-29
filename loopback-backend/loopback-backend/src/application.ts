import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';
import { BcryptHasher } from './services/hash.password.bcrypt';
import { MyUserService } from './services/user.service';
import { JWTservice } from './services/jwt-service';
import { PasswordHasherBindings, TokenServiceBindings, TokenServiceConstants, UserServiceBindings } from './keys';
import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import { JWTAuthenticationComponent } from '@loopback/authentication-jwt'
import { PostgreSqlDataSource } from './datasources'
import { JWTStrategy } from './authentication/jwt-strategy';
import { DefaultSequence } from '@loopback/rest';

export { ApplicationConfig };

export class LoopbackBackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);



    //setup bindings
    this.setupBindings();

    //this.sequence(DefaultSequence);
    this.sequence(MySequence);


    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTStrategy);

    // Set up the custom sequence

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
  setupBindings(): void {
    // this.bind('service.hasher').toClass(BcryptHasher);
    // this.bind('rounds').to(10);
    // this.bind('services.user.service').toClass(MyUserService);
    // this.bind('services.jwt.service').toClass(JWTservice);
    // this.bind('authentication.jwt.secret').to('123asdf5');
    // this.bind('authentication.jwt.expiresIn').to('7h');
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTservice);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );
  }
}


