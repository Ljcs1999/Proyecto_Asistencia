import {Entity, model, property} from '@loopback/repository';

@model()
export class DetalleAsistencia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  Asistencia_id: number;

  @property({
    type: 'number',
    required: true,
  })
  Alumno_id: number;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;


  constructor(data?: Partial<DetalleAsistencia>) {
    super(data);
  }
}

export interface DetalleAsistenciaRelations {
  // describe navigational properties here
}

export type DetalleAsistenciaWithRelations = DetalleAsistencia & DetalleAsistenciaRelations;
