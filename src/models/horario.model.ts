import {Entity, model, property, hasMany} from '@loopback/repository';
import {Seccion} from './seccion.model';

@model()
export class Horario extends Entity {
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
  dias: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_inicio: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_final: string;

  @property({
    type: 'number',
    required: true,
  })
  seccion_id: number;

  @hasMany(() => Seccion, {keyTo: 'horario_id'})
  seccions: Seccion[];

  constructor(data?: Partial<Horario>) {
    super(data);
  }
}

export interface HorarioRelations {
  // describe navigational properties here
}

export type HorarioWithRelations = Horario & HorarioRelations;
