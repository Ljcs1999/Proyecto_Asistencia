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
  Matricula,
} from '../models';
import {DetalleMatriculaRepository} from '../repositories';

export class DetalleMatriculaMatriculaController {
  constructor(
    @repository(DetalleMatriculaRepository)
    public detalleMatriculaRepository: DetalleMatriculaRepository,
  ) { }

  @get('/detalle-matriculas/{id}/matricula', {
    responses: {
      '200': {
        description: 'Matricula belonging to DetalleMatricula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Matricula)},
          },
        },
      },
    },
  })
  async getMatricula(
    @param.path.number('id') id: typeof DetalleMatricula.prototype.id,
  ): Promise<Matricula> {
    return this.detalleMatriculaRepository.Matricula(id);
  }
}
