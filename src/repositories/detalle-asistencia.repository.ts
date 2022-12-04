import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {DetalleAsistencia, DetalleAsistenciaRelations, Alumno, Asistencia} from '../models';
import {AlumnoRepository} from './alumno.repository';
import {AsistenciaRepository} from './asistencia.repository';

export class DetalleAsistenciaRepository extends DefaultCrudRepository<
  DetalleAsistencia,
  typeof DetalleAsistencia.prototype.id,
  DetalleAsistenciaRelations
> {

  public readonly Alumno: BelongsToAccessor<Alumno, typeof DetalleAsistencia.prototype.id>;

  public readonly Asistencia: BelongsToAccessor<Asistencia, typeof DetalleAsistencia.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AlumnoRepository') protected alumnoRepositoryGetter: Getter<AlumnoRepository>, @repository.getter('AsistenciaRepository') protected asistenciaRepositoryGetter: Getter<AsistenciaRepository>,
  ) {
    super(DetalleAsistencia, dataSource);
    this.Asistencia = this.createBelongsToAccessorFor('Asistencia', asistenciaRepositoryGetter,);
    this.registerInclusionResolver('Asistencia', this.Asistencia.inclusionResolver);
    this.Alumno = this.createBelongsToAccessorFor('Alumno', alumnoRepositoryGetter,);
    this.registerInclusionResolver('Alumno', this.Alumno.inclusionResolver);
  }
}
