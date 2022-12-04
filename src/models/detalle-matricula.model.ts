import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Matricula} from './matricula.model';
import {Seccion} from './seccion.model';

@model()
export class DetalleMatricula extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @belongsTo(() => Matricula, {name: 'Matricula'})
  Matricula_id: number;

  @belongsTo(() => Seccion, {name: 'Seccion'})
  Seccion_id: number;

  constructor(data?: Partial<DetalleMatricula>) {
    super(data);
  }
}

export interface DetalleMatriculaRelations {
  // describe navigational properties here
}

export type DetalleMatriculaWithRelations = DetalleMatricula & DetalleMatriculaRelations;
