import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Alumno, AlumnoRelations, Matricula, DetalleAsistencia} from '../models';
import {MatriculaRepository} from './matricula.repository';
import {DetalleAsistenciaRepository} from './detalle-asistencia.repository';

export class AlumnoRepository extends DefaultCrudRepository<
  Alumno,
  typeof Alumno.prototype.id,
  AlumnoRelations
> {

  public readonly matriculas: HasManyRepositoryFactory<Matricula, typeof Alumno.prototype.id>;

  public readonly detalleAsistencias: HasManyRepositoryFactory<DetalleAsistencia, typeof Alumno.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('MatriculaRepository') protected matriculaRepositoryGetter: Getter<MatriculaRepository>, @repository.getter('DetalleAsistenciaRepository') protected detalleAsistenciaRepositoryGetter: Getter<DetalleAsistenciaRepository>,
  ) {
    super(Alumno, dataSource);
    this.detalleAsistencias = this.createHasManyRepositoryFactoryFor('detalleAsistencias', detalleAsistenciaRepositoryGetter,);
    this.registerInclusionResolver('detalleAsistencias', this.detalleAsistencias.inclusionResolver);
    this.matriculas = this.createHasManyRepositoryFactoryFor('matriculas', matriculaRepositoryGetter,);
    this.registerInclusionResolver('matriculas', this.matriculas.inclusionResolver);
  }
}
