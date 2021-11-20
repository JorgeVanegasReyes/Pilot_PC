import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ordenes,
  Persona,
} from '../models';
import {OrdenesRepository} from '../repositories';

export class OrdenesPersonaController {
  constructor(
    @repository(OrdenesRepository)
    public ordenesRepository: OrdenesRepository,
  ) { }

  @get('/ordenes/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Ordenes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Ordenes.prototype.id,
  ): Promise<Persona> {
    return this.ordenesRepository.persona(id);
  }
}
