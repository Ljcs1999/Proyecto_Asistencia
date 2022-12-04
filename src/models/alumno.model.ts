import {Entity, model, property, hasMany} from '@loopback/repository';
import {Matricula} from './matricula.model';
import {DetalleAsistencia} from './detalle-asistencia.model';

@model()
export class Alumno extends Entity {
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
  nombre: string;

  @hasMany(() => Matricula, {keyTo: 'alumno_id'})
  matriculas: Matricula[];

  @hasMany(() => DetalleAsistencia, {keyTo: 'Alumno_id'})
  detalleAsistencias: DetalleAsistencia[];

  constructor(data?: Partial<Alumno>) {
    super(data);
  }
}

export interface AlumnoRelations {
  // describe navigational properties here
}

export type AlumnoWithRelations = Alumno & AlumnoRelations;
