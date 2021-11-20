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
  Vendedores,
  Clientes,
} from '../models';
import {VendedoresRepository} from '../repositories';

export class VendedoresClientesController {
  constructor(
    @repository(VendedoresRepository) protected vendedoresRepository: VendedoresRepository,
  ) { }

  @get('/vendedores/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Vendedores has many Clientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Clientes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Clientes>,
  ): Promise<Clientes[]> {
    return this.vendedoresRepository.clientes(id).find(filter);
  }

  @post('/vendedores/{id}/clientes', {
    responses: {
      '200': {
        description: 'Vendedores model instance',
        content: {'application/json': {schema: getModelSchemaRef(Clientes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vendedores.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {
            title: 'NewClientesInVendedores',
            exclude: ['id'],
            optional: ['vendedoresId']
          }),
        },
      },
    }) clientes: Omit<Clientes, 'id'>,
  ): Promise<Clientes> {
    return this.vendedoresRepository.clientes(id).create(clientes);
  }

  @patch('/vendedores/{id}/clientes', {
    responses: {
      '200': {
        description: 'Vendedores.Clientes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Partial<Clientes>,
    @param.query.object('where', getWhereSchemaFor(Clientes)) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.vendedoresRepository.clientes(id).patch(clientes, where);
  }

  @del('/vendedores/{id}/clientes', {
    responses: {
      '200': {
        description: 'Vendedores.Clientes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Clientes)) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.vendedoresRepository.clientes(id).delete(where);
  }
}
