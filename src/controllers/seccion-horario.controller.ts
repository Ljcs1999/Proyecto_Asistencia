import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Seccion,
  Horario,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionHorarioController {
  constructor(
    @repository(SeccionRepository)
    public seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/horario', {
    responses: {
      '200': {
        description: 'Horario belonging to Seccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Horario)},
          },
        },
      },
    },
  })
  async getHorario(
    @param.path.number('id') id: typeof Seccion.prototype.id,
  ): Promise<Horario> {
    return this.seccionRepository.horario(id);
  }
}
