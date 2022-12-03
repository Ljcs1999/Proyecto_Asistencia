import {Entity, model, property} from '@loopback/repository';

@model()
export class DetalleMatricula extends Entity {
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
  Matricula_id: number;

  @property({
    type: 'number',
    required: true,
  })
  Seccion_id: number;


  constructor(data?: Partial<DetalleMatricula>) {
    super(data);
  }
}

export interface DetalleMatriculaRelations {
  // describe navigational properties here
}

export type DetalleMatriculaWithRelations = DetalleMatricula & DetalleMatriculaRelations;
