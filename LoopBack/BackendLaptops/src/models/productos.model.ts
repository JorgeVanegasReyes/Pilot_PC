import {Entity, model, property, hasOne} from '@loopback/repository';
import {Ordenes} from './ordenes.model';

@model()
export class Productos extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'number',
    required: true,
  })
  existencia: number;

  @property({
    type: 'number',
    required: true,
  })
  valor_und: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @hasOne(() => Ordenes)
  ordenes: Ordenes;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
