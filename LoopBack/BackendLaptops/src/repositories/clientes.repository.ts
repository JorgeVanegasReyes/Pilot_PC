import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Clientes, ClientesRelations, Vendedores} from '../models';
import {VendedoresRepository} from './vendedores.repository';

export class ClientesRepository extends DefaultCrudRepository<
  Clientes,
  typeof Clientes.prototype.id,
  ClientesRelations
> {

  public readonly vendedores: BelongsToAccessor<Vendedores, typeof Clientes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VendedoresRepository') protected vendedoresRepositoryGetter: Getter<VendedoresRepository>,
  ) {
    super(Clientes, dataSource);
    this.vendedores = this.createBelongsToAccessorFor('vendedores', vendedoresRepositoryGetter,);
    this.registerInclusionResolver('vendedores', this.vendedores.inclusionResolver);
  }
}
