import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Productos, ProductosRelations, Ordenes} from '../models';
import {OrdenesRepository} from './ordenes.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {

  public readonly ordenes: HasOneRepositoryFactory<Ordenes, typeof Productos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrdenesRepository') protected ordenesRepositoryGetter: Getter<OrdenesRepository>,
  ) {
    super(Productos, dataSource);
    this.ordenes = this.createHasOneRepositoryFactoryFor('ordenes', ordenesRepositoryGetter);
    this.registerInclusionResolver('ordenes', this.ordenes.inclusionResolver);
  }
}
