import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {DetalleAsistencia} from './detalle-asistencia.model';
import {Seccion} from './seccion.model';

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
  @hasMany(() => DetalleAsistencia, {keyTo: 'Asistencia_id'})
  detalleAsistencias: DetalleAsistencia[];

  @belongsTo(() => Seccion, {name: 'Seccion'})
  Seccion_id: number;

  constructor(data?: Partial<Asistencia>) {
    super(data);
  }
}

export interface AsistenciaRelations {
  // describe navigational properties here
}

export type AsistenciaWithRelations = Asistencia & AsistenciaRelations;
