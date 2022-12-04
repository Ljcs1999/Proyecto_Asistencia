import {Entity, model, property, hasMany} from '@loopback/repository';
import {Seccion} from './seccion.model';

@model()
export class Docente extends Entity {
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

  @hasMany(() => Seccion, {keyTo: 'docente_id'})
  seccions: Seccion[];

  constructor(data?: Partial<Docente>) {
    super(data);
  }
}

export interface DocenteRelations {
  // describe navigational properties here
}

export type DocenteWithRelations = Docente & DocenteRelations;
