import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {DetalleMatricula, DetalleMatriculaRelations} from '../models';

export class DetalleMatriculaRepository extends DefaultCrudRepository<
  DetalleMatricula,
  typeof DetalleMatricula.prototype.id,
  DetalleMatriculaRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(DetalleMatricula, dataSource);
  }
}
