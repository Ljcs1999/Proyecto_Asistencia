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
  Materia,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionMateriaController {
  constructor(
    @repository(SeccionRepository)
    public seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/materia', {
    responses: {
      '200': {
        description: 'Materia belonging to Seccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Materia)},
          },
        },
      },
    },
  })
  async getMateria(
    @param.path.number('id') id: typeof Seccion.prototype.id,
  ): Promise<Materia> {
    return this.seccionRepository.materia(id);
  }
}
