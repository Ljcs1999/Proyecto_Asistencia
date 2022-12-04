import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Materia, MateriaRelations, Seccion} from '../models';
import {SeccionRepository} from './seccion.repository';

export class MateriaRepository extends DefaultCrudRepository<
  Materia,
  typeof Materia.prototype.id,
  MateriaRelations
> {

  public readonly seccions: HasManyRepositoryFactory<Seccion, typeof Materia.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>,
  ) {
    super(Materia, dataSource);
    this.seccions = this.createHasManyRepositoryFactoryFor('seccions', seccionRepositoryGetter,);
    this.registerInclusionResolver('seccions', this.seccions.inclusionResolver);
  }
}
