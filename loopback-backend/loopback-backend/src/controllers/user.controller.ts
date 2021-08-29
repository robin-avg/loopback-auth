import { authenticate, AuthenticationBindings } from '@loopback/authentication';
import { inject } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  getJsonSchemaRef,
  SchemaObject,
} from '@loopback/rest';
import _ from 'lodash';
import { PasswordHasherBindings, TokenServiceBindings, UserServiceBindings } from '../keys';
import { Usermodel } from '../models';
import { Credentials, UsermodelRepository } from '../repositories';
import { BcryptHasher } from '../services/hash.password.bcrypt';
import { JWTservice } from '../services/jwt-service';
import { MyUserService } from '../services/user.service';
import { validateCredentials } from '../services/validator';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { AuthenticationBindings as AB } from '@loopback/authentication';



const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['Email', 'password'],
  properties: {
    Email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};

export class UserController {
  constructor(
    @repository(UsermodelRepository)
    public usermodelRepository: UsermodelRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
    // @inject(SecurityBindings.USER, { optional: true })
    // private user: UserProfile,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTservice,

  ) { }

  @post('/users/signup')
  @response(200, {
    description: 'User',
    content: { 'application/json': { schema: getJsonSchemaRef(Usermodel) } }
  })
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usermodel, {
            title: 'NewUsermodel',
            // exclude: ['id'],
          }),
        },
      },
    })
    usermodel: Usermodel
  ): Promise<Usermodel> {
    validateCredentials(_.pick(usermodel, ['Email', 'password']));

    usermodel.password = await this.hasher.hashPassword(usermodel.password);
    const savedUser = await this.usermodelRepository.create(usermodel);
    return savedUser;
  }

  @post('/users/login')
  @response(200, {
    description: 'Token',
    content: { 'application/json': { schema: { type: 'object', properties: { token: { type: 'string' } } } } }
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // console.log(user);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    console.log("userProfile");
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({ token });
  }

  @authenticate('jwt')
  @get('/users/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(AB.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    return Promise.resolve(currentUser)
  }

  @post('/users')
  @response(200, {
    description: 'Usermodel model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Usermodel) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usermodel, {
            title: 'NewUsermodel',
            // exclude: ['id'],
          }),
        },
      },
    })
    usermodel: Omit<Usermodel, 'id'>,
  ): Promise<Usermodel> {
    return this.usermodelRepository.create(usermodel);
  }

  @get('/users/count')
  @response(200, {
    description: 'Usermodel model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Usermodel) where?: Where<Usermodel>,
  ): Promise<Count> {
    return this.usermodelRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of Usermodel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usermodel, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Usermodel) filter?: Filter<Usermodel>,
  ): Promise<Usermodel[]> {
    return this.usermodelRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'Usermodel PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usermodel, { partial: true }),
        },
      },
    })
    usermodel: Usermodel,
    @param.where(Usermodel) where?: Where<Usermodel>,
  ): Promise<Count> {
    return this.usermodelRepository.updateAll(usermodel, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Usermodel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usermodel, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usermodel, { exclude: 'where' }) filter?: FilterExcludingWhere<Usermodel>
  ): Promise<Usermodel> {
    return this.usermodelRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'Usermodel PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usermodel, { partial: true }),
        },
      },
    })
    usermodel: Usermodel,
  ): Promise<void> {
    await this.usermodelRepository.updateById(id, usermodel);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'Usermodel PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usermodel: Usermodel,
  ): Promise<void> {
    await this.usermodelRepository.replaceById(id, usermodel);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'Usermodel DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usermodelRepository.deleteById(id);
  }
}
