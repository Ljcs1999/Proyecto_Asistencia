import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Asistencia} from './asistencia.model';
import {DetalleMatricula} from './detalle-matricula.model';
import {Materia} from './materia.model';
import {Docente} from './docente.model';
import {Horario} from './horario.model';

@model()
export class Seccion extends Entity {
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
  periodo: number;

  @hasMany(() => Asistencia, {keyTo: 'Seccion_id'})
  asistencias: Asistencia[];

  @hasMany(() => DetalleMatricula, {keyTo: 'Seccion_id'})
  detalleMatriculas: DetalleMatricula[];

  @belongsTo(() => Materia, {name: 'materia'})
  materia_id: number;

  @belongsTo(() => Docente, {name: 'docente'})
  docente_id: number;

  @belongsTo(() => Horario, {name: 'horario'})
  horario_id: number;

  @hasMany(() => Horario, {keyTo: 'seccion_id'})
  horarios: Horario[];

  constructor(data?: Partial<Seccion>) {
    super(data);
  }
}

export interface SeccionRelations {
  // describe navigational properties here
}

export type SeccionWithRelations = Seccion & SeccionRelations;
