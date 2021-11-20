import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Ordenes} from '../models';
import {OrdenesRepository} from './ordenes.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly ordenes: HasManyRepositoryFactory<Ordenes, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OrdenesRepository') protected ordenesRepositoryGetter: Getter<OrdenesRepository>,
  ) {
    super(Persona, dataSource);
    this.ordenes = this.createHasManyRepositoryFactoryFor('ordenes', ordenesRepositoryGetter,);
    this.registerInclusionResolver('ordenes', this.ordenes.inclusionResolver);
  }
}
