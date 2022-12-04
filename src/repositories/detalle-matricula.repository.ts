import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {DetalleMatricula, DetalleMatriculaRelations, Matricula, Seccion} from '../models';
import {MatriculaRepository} from './matricula.repository';
import {SeccionRepository} from './seccion.repository';

export class DetalleMatriculaRepository extends DefaultCrudRepository<
  DetalleMatricula,
  typeof DetalleMatricula.prototype.id,
  DetalleMatriculaRelations
> {

  public readonly Matricula: BelongsToAccessor<Matricula, typeof DetalleMatricula.prototype.id>;

  public readonly Seccion: BelongsToAccessor<Seccion, typeof DetalleMatricula.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('MatriculaRepository') protected matriculaRepositoryGetter: Getter<MatriculaRepository>, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>,
  ) {
    super(DetalleMatricula, dataSource);
    this.Seccion = this.createBelongsToAccessorFor('Seccion', seccionRepositoryGetter,);
    this.registerInclusionResolver('Seccion', this.Seccion.inclusionResolver);
    this.Matricula = this.createBelongsToAccessorFor('Matricula', matriculaRepositoryGetter,);
    this.registerInclusionResolver('Matricula', this.Matricula.inclusionResolver);
  }
}
