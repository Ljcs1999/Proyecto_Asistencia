import {Entity, model, property} from '@loopback/repository';

@model()
export class Asistencia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  Seccion_id: number;


  constructor(data?: Partial<Asistencia>) {
    super(data);
  }
}

export interface AsistenciaRelations {
  // describe navigational properties here
}

export type AsistenciaWithRelations = Asistencia & AsistenciaRelations;
