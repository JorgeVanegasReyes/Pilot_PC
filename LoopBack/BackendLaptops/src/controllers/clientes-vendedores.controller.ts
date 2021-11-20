import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Clientes,
  Vendedores,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesVendedoresController {
  constructor(
    @repository(ClientesRepository)
    public clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/vendedores', {
    responses: {
      '200': {
        description: 'Vendedores belonging to Clientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vendedores)},
          },
        },
      },
    },
  })
  async getVendedores(
    @param.path.string('id') id: typeof Clientes.prototype.id,
  ): Promise<Vendedores> {
    return this.clientesRepository.vendedores(id);
  }
}
