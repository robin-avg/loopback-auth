import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {Customer, CustomerRelations, Usermodel} from '../models';
import {UsermodelRepository} from './usermodel.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.cid,
  CustomerRelations
> {

  public readonly usermodels: HasManyRepositoryFactory<Usermodel, typeof Customer.prototype.cid>;

  constructor(
    @inject('datasources.postgreSQL') dataSource: PostgreSqlDataSource, @repository.getter('UsermodelRepository') protected usermodelRepositoryGetter: Getter<UsermodelRepository>,
  ) {
    super(Customer, dataSource);
    this.usermodels = this.createHasManyRepositoryFactoryFor('usermodels', usermodelRepositoryGetter,);
    this.registerInclusionResolver('usermodels', this.usermodels.inclusionResolver);
  }
}
