import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vendedores, VendedoresRelations, Clientes, Administradores} from '../models';
import {ClientesRepository} from './clientes.repository';
import {AdministradoresRepository} from './administradores.repository';

export class VendedoresRepository extends DefaultCrudRepository<
  Vendedores,
  typeof Vendedores.prototype.id,
  VendedoresRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Clientes, typeof Vendedores.prototype.id>;

  public readonly administradores: BelongsToAccessor<Administradores, typeof Vendedores.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>, @repository.getter('AdministradoresRepository') protected administradoresRepositoryGetter: Getter<AdministradoresRepository>,
  ) {
    super(Vendedores, dataSource);
    this.administradores = this.createBelongsToAccessorFor('administradores', administradoresRepositoryGetter,);
    this.registerInclusionResolver('administradores', this.administradores.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clientesRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
