import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Ordenes,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaOrdenesController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Array of Persona has many Ordenes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ordenes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ordenes>,
  ): Promise<Ordenes[]> {
    return this.personaRepository.ordenes(id).find(filter);
  }

  @post('/personas/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ordenes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {
            title: 'NewOrdenesInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) ordenes: Omit<Ordenes, 'id'>,
  ): Promise<Ordenes> {
    return this.personaRepository.ordenes(id).create(ordenes);
  }

  @patch('/personas/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Persona.Ordenes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {partial: true}),
        },
      },
    })
    ordenes: Partial<Ordenes>,
    @param.query.object('where', getWhereSchemaFor(Ordenes)) where?: Where<Ordenes>,
  ): Promise<Count> {
    return this.personaRepository.ordenes(id).patch(ordenes, where);
  }

  @del('/personas/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Persona.Ordenes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ordenes)) where?: Where<Ordenes>,
  ): Promise<Count> {
    return this.personaRepository.ordenes(id).delete(where);
  }
}
