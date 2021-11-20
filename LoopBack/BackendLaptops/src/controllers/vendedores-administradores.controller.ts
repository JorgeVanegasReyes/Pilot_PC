import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vendedores,
  Administradores,
} from '../models';
import {VendedoresRepository} from '../repositories';

export class VendedoresAdministradoresController {
  constructor(
    @repository(VendedoresRepository)
    public vendedoresRepository: VendedoresRepository,
  ) { }

  @get('/vendedores/{id}/administradores', {
    responses: {
      '200': {
        description: 'Administradores belonging to Vendedores',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administradores)},
          },
        },
      },
    },
  })
  async getAdministradores(
    @param.path.string('id') id: typeof Vendedores.prototype.id,
  ): Promise<Administradores> {
    return this.vendedoresRepository.administradores(id);
  }
}
