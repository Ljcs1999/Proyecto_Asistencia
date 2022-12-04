import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Docente, DocenteRelations, Seccion} from '../models';
import {SeccionRepository} from './seccion.repository';

export class DocenteRepository extends DefaultCrudRepository<
  Docente,
  typeof Docente.prototype.id,
  DocenteRelations
> {

  public readonly seccions: HasManyRepositoryFactory<Seccion, typeof Docente.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>,
  ) {
    super(Docente, dataSource);
    this.seccions = this.createHasManyRepositoryFactoryFor('seccions', seccionRepositoryGetter,);
    this.registerInclusionResolver('seccions', this.seccions.inclusionResolver);
  }
}
