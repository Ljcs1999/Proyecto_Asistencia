import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetalleMatricula,
  Seccion,
} from '../models';
import {DetalleMatriculaRepository} from '../repositories';

export class DetalleMatriculaSeccionController {
  constructor(
    @repository(DetalleMatriculaRepository)
    public detalleMatriculaRepository: DetalleMatriculaRepository,
  ) { }

  @get('/detalle-matriculas/{id}/seccion', {
    responses: {
      '200': {
        description: 'Seccion belonging to DetalleMatricula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seccion)},
          },
        },
      },
    },
  })
  async getSeccion(
    @param.path.number('id') id: typeof DetalleMatricula.prototype.id,
  ): Promise<Seccion> {
    return this.detalleMatriculaRepository.Seccion(id);
  }
}
