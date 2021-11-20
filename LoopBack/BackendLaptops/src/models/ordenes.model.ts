import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class Ordenes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  id_vendedor: string;

  @property({
    type: 'string',
    required: true,
  })
  id_producto: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => Persona)
  personaId: string;

  @property({
    type: 'string',
  })
  productosId?: string;

  constructor(data?: Partial<Ordenes>) {
    super(data);
  }
}

export interface OrdenesRelations {
  // describe navigational properties here
}

export type OrdenesWithRelations = Ordenes & OrdenesRelations;
