import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usermodel} from './usermodel.model';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  cid?: number;

  @property({
    type: 'string',
    required: true,
  })
  customer_name: string;

  @property({
    type: 'string',
    required: true,
  })
  customer_address: string;

  @hasMany(() => Usermodel)
  usermodels: Usermodel[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
