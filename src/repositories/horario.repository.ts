import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Horario, HorarioRelations, Seccion} from '../models';
import {SeccionRepository} from './seccion.repository';

export class HorarioRepository extends DefaultCrudRepository<
  Horario,
  typeof Horario.prototype.id,
  HorarioRelations
> {

  public readonly seccions: HasManyRepositoryFactory<Seccion, typeof Horario.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>,
  ) {
    super(Horario, dataSource);
    this.seccions = this.createHasManyRepositoryFactoryFor('seccions', seccionRepositoryGetter,);
    this.registerInclusionResolver('seccions', this.seccions.inclusionResolver);
  }
}
