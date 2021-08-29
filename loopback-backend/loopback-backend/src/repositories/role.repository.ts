import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {Role, RoleRelations, Usermodel} from '../models';
import {UsermodelRepository} from './usermodel.repository';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.rid,
  RoleRelations
> {

  public readonly usermodels: HasManyRepositoryFactory<Usermodel, typeof Role.prototype.rid>;

  constructor(
    @inject('datasources.postgreSQL') dataSource: PostgreSqlDataSource, @repository.getter('UsermodelRepository') protected usermodelRepositoryGetter: Getter<UsermodelRepository>,
  ) {
    super(Role, dataSource);
    this.usermodels = this.createHasManyRepositoryFactoryFor('usermodels', usermodelRepositoryGetter,);
    this.registerInclusionResolver('usermodels', this.usermodels.inclusionResolver);
  }
}
