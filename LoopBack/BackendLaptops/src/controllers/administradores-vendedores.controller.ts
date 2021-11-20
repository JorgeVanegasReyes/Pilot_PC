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
  Administradores,
  Vendedores,
} from '../models';
import {AdministradoresRepository} from '../repositories';

export class AdministradoresVendedoresController {
  constructor(
    @repository(AdministradoresRepository) protected administradoresRepository: AdministradoresRepository,
  ) { }

  @get('/administradores/{id}/vendedores', {
    responses: {
      '200': {
        description: 'Array of Administradores has many Vendedores',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vendedores)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vendedores>,
  ): Promise<Vendedores[]> {
    return this.administradoresRepository.vendedores(id).find(filter);
  }

  @post('/administradores/{id}/vendedores', {
    responses: {
      '200': {
        description: 'Administradores model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vendedores)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administradores.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedores, {
            title: 'NewVendedoresInAdministradores',
            exclude: ['id'],
            optional: ['administradoresId']
          }),
        },
      },
    }) vendedores: Omit<Vendedores, 'id'>,
  ): Promise<Vendedores> {
    return this.administradoresRepository.vendedores(id).create(vendedores);
  }

  @patch('/administradores/{id}/vendedores', {
    responses: {
      '200': {
        description: 'Administradores.Vendedores PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedores, {partial: true}),
        },
      },
    })
    vendedores: Partial<Vendedores>,
    @param.query.object('where', getWhereSchemaFor(Vendedores)) where?: Where<Vendedores>,
  ): Promise<Count> {
    return this.administradoresRepository.vendedores(id).patch(vendedores, where);
  }

  @del('/administradores/{id}/vendedores', {
    responses: {
      '200': {
        description: 'Administradores.Vendedores DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vendedores)) where?: Where<Vendedores>,
  ): Promise<Count> {
    return this.administradoresRepository.vendedores(id).delete(where);
  }
}
