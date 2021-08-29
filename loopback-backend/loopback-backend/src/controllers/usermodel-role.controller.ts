import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usermodel,
  Role,
} from '../models';
import {UsermodelRepository} from '../repositories';

export class UsermodelRoleController {
  constructor(
    @repository(UsermodelRepository)
    public usermodelRepository: UsermodelRepository,
  ) { }

  @get('/usermodels/{id}/role', {
    responses: {
      '200': {
        description: 'Role belonging to Usermodel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Role)},
          },
        },
      },
    },
  })
  async getRole(
    @param.path.number('id') id: typeof Usermodel.prototype.Uid,
  ): Promise<Role> {
    return this.usermodelRepository.role(id);
  }
}
