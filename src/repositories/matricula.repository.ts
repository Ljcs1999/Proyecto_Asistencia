import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Matricula, MatriculaRelations, Alumno, DetalleMatricula} from '../models';
import {AlumnoRepository} from './alumno.repository';
import {DetalleMatriculaRepository} from './detalle-matricula.repository';

export class MatriculaRepository extends DefaultCrudRepository<
  Matricula,
  typeof Matricula.prototype.id,
  MatriculaRelations
> {

  public readonly alumno_Id: BelongsToAccessor<Alumno, typeof Matricula.prototype.id>;

  public readonly detalleMatriculas: HasManyRepositoryFactory<DetalleMatricula, typeof Matricula.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AlumnoRepository') protected alumnoRepositoryGetter: Getter<AlumnoRepository>, @repository.getter('DetalleMatriculaRepository') protected detalleMatriculaRepositoryGetter: Getter<DetalleMatriculaRepository>,
  ) {
    super(Matricula, dataSource);
    this.detalleMatriculas = this.createHasManyRepositoryFactoryFor('detalleMatriculas', detalleMatriculaRepositoryGetter,);
    this.registerInclusionResolver('detalleMatriculas', this.detalleMatriculas.inclusionResolver);
    this.alumno_Id = this.createBelongsToAccessorFor('alumno_Id', alumnoRepositoryGetter,);
    this.registerInclusionResolver('alumno_Id', this.alumno_Id.inclusionResolver);
  }
}
