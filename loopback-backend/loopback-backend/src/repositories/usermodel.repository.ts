import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { PostgreSqlDataSource } from '../datasources';
import { Usermodel, UsermodelRelations, Customer, Role } from '../models';
import { CustomerRepository } from './customer.repository';
import { RoleRepository } from './role.repository';

export type Credentials = {
  Email: string,
  password: string
}

export class UsermodelRepository extends DefaultCrudRepository<
  Usermodel,
  typeof Usermodel.prototype.Uid,
  UsermodelRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof Usermodel.prototype.Uid>;

  public readonly role: BelongsToAccessor<Role, typeof Usermodel.prototype.Uid>;

  constructor(
    @inject('datasources.postgreSQL') dataSource: PostgreSqlDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(Usermodel, dataSource);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter,);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
