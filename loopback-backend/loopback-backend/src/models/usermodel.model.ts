import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Customer} from './customer.model';
import {Role} from './role.model';

@model()
export class Usermodel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Uid?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  Contact: number;
  @belongsTo(() => Customer)
  customerId: number;

  @belongsTo(() => Role)
  roleId: number;

  constructor(data?: Partial<Usermodel>) {
    super(data);
  }
}

export interface UsermodelRelations {
  // describe navigational properties here
}

export type UsermodelWithRelations = Usermodel & UsermodelRelations;
