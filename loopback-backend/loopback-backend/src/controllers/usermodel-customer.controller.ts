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
  Customer,
} from '../models';
import {UsermodelRepository} from '../repositories';

export class UsermodelCustomerController {
  constructor(
    @repository(UsermodelRepository)
    public usermodelRepository: UsermodelRepository,
  ) { }

  @get('/usermodels/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Usermodel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Usermodel.prototype.Uid,
  ): Promise<Customer> {
    return this.usermodelRepository.customer(id);
  }
}
