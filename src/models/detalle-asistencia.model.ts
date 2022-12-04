import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Alumno} from './alumno.model';
import {Asistencia} from './asistencia.model';

@model()
export class DetalleAsistencia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @belongsTo(() => Alumno, {name: 'Alumno'})
  Alumno_id: number;

  @belongsTo(() => Asistencia, {name: 'Asistencia'})
  Asistencia_id: number;

  constructor(data?: Partial<DetalleAsistencia>) {
    super(data);
  }
}

export interface DetalleAsistenciaRelations {
  // describe navigational properties here
}

export type DetalleAsistenciaWithRelations = DetalleAsistencia & DetalleAsistenciaRelations;
