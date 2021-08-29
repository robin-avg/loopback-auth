import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Role,
  Usermodel,
} from '../models';
import {RoleRepository} from '../repositories';

export class RoleUsermodelController {
  constructor(
    @repository(RoleRepository) protected roleRepository: RoleRepository,
  ) { }

  @get('/roles/{id}/usermodels', {
    responses: {
      '200': {
        description: 'Array of Role has many Usermodel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usermodel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usermodel>,
  ): Promise<Usermodel[]> {
    return this.roleRepository.usermodels(id).find(filter);
  }

  @post('/roles/{id}/usermodels', {
    responses: {
      '200': {
        description: 'Role model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usermodel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Role.prototype.rid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usermodel, {
            title: 'NewUsermodelInRole',
            exclude: ['Uid'],
            optional: ['roleId']
          }),
        },
      },
    }) usermodel: Omit<Usermodel, 'Uid'>,
  ): Promise<Usermodel> {
    return this.roleRepository.usermodels(id).create(usermodel);
  }

  @patch('/roles/{id}/usermodels', {
    responses: {
      '200': {
        description: 'Role.Usermodel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usermodel, {partial: true}),
        },
      },
    })
    usermodel: Partial<Usermodel>,
    @param.query.object('where', getWhereSchemaFor(Usermodel)) where?: Where<Usermodel>,
  ): Promise<Count> {
    return this.roleRepository.usermodels(id).patch(usermodel, where);
  }

  @del('/roles/{id}/usermodels', {
    responses: {
      '200': {
        description: 'Role.Usermodel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usermodel)) where?: Where<Usermodel>,
  ): Promise<Count> {
    return this.roleRepository.usermodels(id).delete(where);
  }
}
