import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Horario, HorarioRelations} from '../models';

export class HorarioRepository extends DefaultCrudRepository<
  Horario,
  typeof Horario.prototype.id,
  HorarioRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Horario, dataSource);
  }
}
