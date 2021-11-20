import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Vendedores} from '../models';
import {VendedoresRepository} from '../repositories';

export class VendedoresController {
  constructor(
    @repository(VendedoresRepository)
    public vendedoresRepository : VendedoresRepository,
  ) {}

  @post('/vendedores')
  @response(200, {
    description: 'Vendedores model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vendedores)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedores, {
            title: 'NewVendedores',
            exclude: ['id'],
          }),
        },
      },
    })
    vendedores: Omit<Vendedores, 'id'>,
  ): Promise<Vendedores> {
    return this.vendedoresRepository.create(vendedores);
  }

  @get('/vendedores/count')
  @response(200, {
    description: 'Vendedores model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vendedores) where?: Where<Vendedores>,
  ): Promise<Count> {
    return this.vendedoresRepository.count(where);
  }

  @get('/vendedores')
  @response(200, {
    description: 'Array of Vendedores model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vendedores, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vendedores) filter?: Filter<Vendedores>,
  ): Promise<Vendedores[]> {
    return this.vendedoresRepository.find(filter);
  }

  @patch('/vendedores')
  @response(200, {
    description: 'Vendedores PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedores, {partial: true}),
        },
      },
    })
    vendedores: Vendedores,
    @param.where(Vendedores) where?: Where<Vendedores>,
  ): Promise<Count> {
    return this.vendedoresRepository.updateAll(vendedores, where);
  }

  @get('/vendedores/{id}')
  @response(200, {
    description: 'Vendedores model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vendedores, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vendedores, {exclude: 'where'}) filter?: FilterExcludingWhere<Vendedores>
  ): Promise<Vendedores> {
    return this.vendedoresRepository.findById(id, filter);
  }

  @patch('/vendedores/{id}')
  @response(204, {
    description: 'Vendedores PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vendedores, {partial: true}),
        },
      },
    })
    vendedores: Vendedores,
  ): Promise<void> {
    await this.vendedoresRepository.updateById(id, vendedores);
  }

  @put('/vendedores/{id}')
  @response(204, {
    description: 'Vendedores PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendedores: Vendedores,
  ): Promise<void> {
    await this.vendedoresRepository.replaceById(id, vendedores);
  }

  @del('/vendedores/{id}')
  @response(204, {
    description: 'Vendedores DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendedoresRepository.deleteById(id);
  }
}
