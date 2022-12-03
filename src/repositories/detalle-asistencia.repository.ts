import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {DetalleAsistencia, DetalleAsistenciaRelations} from '../models';

export class DetalleAsistenciaRepository extends DefaultCrudRepository<
  DetalleAsistencia,
  typeof DetalleAsistencia.prototype.id,
  DetalleAsistenciaRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(DetalleAsistencia, dataSource);
  }
}
