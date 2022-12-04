import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetalleAsistencia,
  Alumno,
} from '../models';
import {DetalleAsistenciaRepository} from '../repositories';

export class DetalleAsistenciaAlumnoController {
  constructor(
    @repository(DetalleAsistenciaRepository)
    public detalleAsistenciaRepository: DetalleAsistenciaRepository,
  ) { }

  @get('/detalle-asistencias/{id}/alumno', {
    responses: {
      '200': {
        description: 'Alumno belonging to DetalleAsistencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alumno)},
          },
        },
      },
    },
  })
  async getAlumno(
    @param.path.number('id') id: typeof DetalleAsistencia.prototype.id,
  ): Promise<Alumno> {
    return this.detalleAsistenciaRepository.Alumno(id);
  }
}
