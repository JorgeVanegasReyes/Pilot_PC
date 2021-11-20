import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vendedores} from './vendedores.model';

@model()
export class Administradores extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasMany(() => Vendedores)
  vendedores: Vendedores[];

  constructor(data?: Partial<Administradores>) {
    super(data);
  }
}

export interface AdministradoresRelations {
  // describe navigational properties here
}

export type AdministradoresWithRelations = Administradores & AdministradoresRelations;
