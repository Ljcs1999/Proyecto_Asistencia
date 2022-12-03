import {Entity, model, property} from '@loopback/repository';

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
  horario_id: number;

  @property({
    type: 'number',
    required: true,
  })
  docente_id: number;

  @property({
    type: 'number',
    required: true,
  })
  materia_id: number;

  @property({
    type: 'number',
    required: true,
  })
  periodo: number;


  constructor(data?: Partial<Seccion>) {
    super(data);
  }
}

export interface SeccionRelations {
  // describe navigational properties here
}

export type SeccionWithRelations = Seccion & SeccionRelations;
