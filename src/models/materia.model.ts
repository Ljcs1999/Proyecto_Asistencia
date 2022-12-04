import {Entity, model, property, hasMany} from '@loopback/repository';
import {Seccion} from './seccion.model';

@model()
export class Materia extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  codigo: number;

  @property({
    type: 'number',
    required: true,
  })
  UV: number;

  @hasMany(() => Seccion, {keyTo: 'materia_id'})
  seccions: Seccion[];

  constructor(data?: Partial<Materia>) {
    super(data);
  }
}

export interface MateriaRelations {
  // describe navigational properties here
}

export type MateriaWithRelations = Materia & MateriaRelations;
