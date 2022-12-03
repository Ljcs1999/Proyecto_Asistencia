import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Asistencia, AsistenciaRelations} from '../models';

export class AsistenciaRepository extends DefaultCrudRepository<
  Asistencia,
  typeof Asistencia.prototype.id,
  AsistenciaRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Asistencia, dataSource);
  }
}
