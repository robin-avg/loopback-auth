import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usermodel} from './usermodel.model';

@model()
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  rid?: number;

  @property({
    type: 'string',
    required: true,
  })
  role_name: string;

  @hasMany(() => Usermodel)
  usermodels: Usermodel[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
