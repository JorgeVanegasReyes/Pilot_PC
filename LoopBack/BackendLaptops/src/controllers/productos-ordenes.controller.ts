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
  Productos,
  Ordenes,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosOrdenesController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Productos has one Ordenes',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ordenes),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ordenes>,
  ): Promise<Ordenes> {
    return this.productosRepository.ordenes(id).get(filter);
  }

  @post('/productos/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ordenes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Productos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {
            title: 'NewOrdenesInProductos',
            exclude: ['id'],
            optional: ['productosId']
          }),
        },
      },
    }) ordenes: Omit<Ordenes, 'id'>,
  ): Promise<Ordenes> {
    return this.productosRepository.ordenes(id).create(ordenes);
  }

  @patch('/productos/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Productos.Ordenes PATCH success count',
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
    return this.productosRepository.ordenes(id).patch(ordenes, where);
  }

  @del('/productos/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Productos.Ordenes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ordenes)) where?: Where<Ordenes>,
  ): Promise<Count> {
    return this.productosRepository.ordenes(id).delete(where);
  }
}
