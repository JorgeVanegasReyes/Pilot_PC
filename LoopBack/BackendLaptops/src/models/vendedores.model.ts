import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Clientes} from './clientes.model';
import {Administradores} from './administradores.model';

@model()
export class Vendedores extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @hasMany(() => Clientes)
  clientes: Clientes[];

  @belongsTo(() => Administradores)
  administradoresId: string;

  constructor(data?: Partial<Vendedores>) {
    super(data);
  }
}

export interface VendedoresRelations {
  // describe navigational properties here
}

export type VendedoresWithRelations = Vendedores & VendedoresRelations;
