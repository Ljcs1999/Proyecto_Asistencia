import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Asistencia, AsistenciaRelations, DetalleAsistencia, Seccion} from '../models';
import {DetalleAsistenciaRepository} from './detalle-asistencia.repository';
import {SeccionRepository} from './seccion.repository';

export class AsistenciaRepository extends DefaultCrudRepository<
  Asistencia,
  typeof Asistencia.prototype.id,
  AsistenciaRelations
> {

  public readonly detalleAsistencias: HasManyRepositoryFactory<DetalleAsistencia, typeof Asistencia.prototype.id>;

  public readonly Seccion: BelongsToAccessor<Seccion, typeof Asistencia.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DetalleAsistenciaRepository') protected detalleAsistenciaRepositoryGetter: Getter<DetalleAsistenciaRepository>, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>,
  ) {
    super(Asistencia, dataSource);
    this.Seccion = this.createBelongsToAccessorFor('Seccion', seccionRepositoryGetter,);
    this.registerInclusionResolver('Seccion', this.Seccion.inclusionResolver);
    this.detalleAsistencias = this.createHasManyRepositoryFactoryFor('detalleAsistencias', detalleAsistenciaRepositoryGetter,);
    this.registerInclusionResolver('detalleAsistencias', this.detalleAsistencias.inclusionResolver);
  }
}
