import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administradores, AdministradoresRelations, Vendedores} from '../models';
import {VendedoresRepository} from './vendedores.repository';

export class AdministradoresRepository extends DefaultCrudRepository<
  Administradores,
  typeof Administradores.prototype.id,
  AdministradoresRelations
> {

  public readonly vendedores: HasManyRepositoryFactory<Vendedores, typeof Administradores.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VendedoresRepository') protected vendedoresRepositoryGetter: Getter<VendedoresRepository>,
  ) {
    super(Administradores, dataSource);
    this.vendedores = this.createHasManyRepositoryFactoryFor('vendedores', vendedoresRepositoryGetter,);
    this.registerInclusionResolver('vendedores', this.vendedores.inclusionResolver);
  }
}
