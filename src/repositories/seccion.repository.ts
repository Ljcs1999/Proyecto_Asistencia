import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Seccion, SeccionRelations, Asistencia, DetalleMatricula, Materia, Docente, Horario} from '../models';
import {AsistenciaRepository} from './asistencia.repository';
import {DetalleMatriculaRepository} from './detalle-matricula.repository';
import {MateriaRepository} from './materia.repository';
import {DocenteRepository} from './docente.repository';
import {HorarioRepository} from './horario.repository';

export class SeccionRepository extends DefaultCrudRepository<
  Seccion,
  typeof Seccion.prototype.id,
  SeccionRelations
> {

  public readonly asistencias: HasManyRepositoryFactory<Asistencia, typeof Seccion.prototype.id>;

  public readonly detalleMatriculas: HasManyRepositoryFactory<DetalleMatricula, typeof Seccion.prototype.id>;

  public readonly materia: BelongsToAccessor<Materia, typeof Seccion.prototype.id>;

  public readonly docente: BelongsToAccessor<Docente, typeof Seccion.prototype.id>;

  public readonly horario: BelongsToAccessor<Horario, typeof Seccion.prototype.id>;

  public readonly horarios: HasManyRepositoryFactory<Horario, typeof Seccion.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AsistenciaRepository') protected asistenciaRepositoryGetter: Getter<AsistenciaRepository>, @repository.getter('DetalleMatriculaRepository') protected detalleMatriculaRepositoryGetter: Getter<DetalleMatriculaRepository>, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>, @repository.getter('DocenteRepository') protected docenteRepositoryGetter: Getter<DocenteRepository>, @repository.getter('HorarioRepository') protected horarioRepositoryGetter: Getter<HorarioRepository>,
  ) {
    super(Seccion, dataSource);
    this.horarios = this.createHasManyRepositoryFactoryFor('horarios', horarioRepositoryGetter,);
    this.registerInclusionResolver('horarios', this.horarios.inclusionResolver);
    this.horario = this.createBelongsToAccessorFor('horario', horarioRepositoryGetter,);
    this.registerInclusionResolver('horario', this.horario.inclusionResolver);
    this.docente = this.createBelongsToAccessorFor('docente', docenteRepositoryGetter,);
    this.registerInclusionResolver('docente', this.docente.inclusionResolver);
    this.materia = this.createBelongsToAccessorFor('materia', materiaRepositoryGetter,);
    this.registerInclusionResolver('materia', this.materia.inclusionResolver);
    this.detalleMatriculas = this.createHasManyRepositoryFactoryFor('detalleMatriculas', detalleMatriculaRepositoryGetter,);
    this.registerInclusionResolver('detalleMatriculas', this.detalleMatriculas.inclusionResolver);
    this.asistencias = this.createHasManyRepositoryFactoryFor('asistencias', asistenciaRepositoryGetter,);
    this.registerInclusionResolver('asistencias', this.asistencias.inclusionResolver);
  }
}
