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
  Asistencia,
} from '../models';
import {DetalleAsistenciaRepository} from '../repositories';

export class DetalleAsistenciaAsistenciaController {
  constructor(
    @repository(DetalleAsistenciaRepository)
    public detalleAsistenciaRepository: DetalleAsistenciaRepository,
  ) { }

  @get('/detalle-asistencias/{id}/asistencia', {
    responses: {
      '200': {
        description: 'Asistencia belonging to DetalleAsistencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asistencia)},
          },
        },
      },
    },
  })
  async getAsistencia(
    @param.path.number('id') id: typeof DetalleAsistencia.prototype.id,
  ): Promise<Asistencia> {
    return this.detalleAsistenciaRepository.Asistencia(id);
  }
}
