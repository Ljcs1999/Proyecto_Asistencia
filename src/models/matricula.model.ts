import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Alumno} from './alumno.model';
import {DetalleMatricula} from './detalle-matricula.model';

@model()
export class Matricula extends Entity {
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

  @belongsTo(() => Alumno, {name: 'alumno_Id'})
  alumno_id: number;

  @hasMany(() => DetalleMatricula, {keyTo: 'Matricula_id'})
  detalleMatriculas: DetalleMatricula[];

  constructor(data?: Partial<Matricula>) {
    super(data);
  }
}

export interface MatriculaRelations {
  // describe navigational properties here
}

export type MatriculaWithRelations = Matricula & MatriculaRelations;
