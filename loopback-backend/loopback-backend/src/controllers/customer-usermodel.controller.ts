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
  Customer,
  Usermodel,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerUsermodelController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/usermodels', {
    responses: {
      '200': {
        description: 'Array of Customer has many Usermodel',
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
    return this.customerRepository.usermodels(id).find(filter);
  }

  @post('/customers/{id}/usermodels', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usermodel)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.cid,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usermodel, {
            title: 'NewUsermodelInCustomer',
            exclude: ['Uid'],
            optional: ['customerId']
          }),
        },
      },
    }) usermodel: Omit<Usermodel, 'Uid'>,
  ): Promise<Usermodel> {
    return this.customerRepository.usermodels(id).create(usermodel);
  }

  @patch('/customers/{id}/usermodels', {
    responses: {
      '200': {
        description: 'Customer.Usermodel PATCH success count',
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
    return this.customerRepository.usermodels(id).patch(usermodel, where);
  }

  @del('/customers/{id}/usermodels', {
    responses: {
      '200': {
        description: 'Customer.Usermodel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usermodel)) where?: Where<Usermodel>,
  ): Promise<Count> {
    return this.customerRepository.usermodels(id).delete(where);
  }
}
