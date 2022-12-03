import {Entity, model, property} from '@loopback/repository';

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
  alumno_id: number;

  @property({
    type: 'number',
    required: true,
  })
  periodo: number;


  constructor(data?: Partial<Matricula>) {
    super(data);
  }
}

export interface MatriculaRelations {
  // describe navigational properties here
}

export type MatriculaWithRelations = Matricula & MatriculaRelations;
