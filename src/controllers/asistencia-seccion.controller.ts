import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asistencia,
  Seccion,
} from '../models';
import {AsistenciaRepository} from '../repositories';

export class AsistenciaSeccionController {
  constructor(
    @repository(AsistenciaRepository)
    public asistenciaRepository: AsistenciaRepository,
  ) { }

  @get('/asistencias/{id}/seccion', {
    responses: {
      '200': {
        description: 'Seccion belonging to Asistencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seccion)},
          },
        },
      },
    },
  })
  async getSeccion(
    @param.path.number('id') id: typeof Asistencia.prototype.id,
  ): Promise<Seccion> {
    return this.asistenciaRepository.Seccion(id);
  }
}
