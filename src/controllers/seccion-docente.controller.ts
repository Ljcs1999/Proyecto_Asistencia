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
  Docente,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionDocenteController {
  constructor(
    @repository(SeccionRepository)
    public seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/docente', {
    responses: {
      '200': {
        description: 'Docente belonging to Seccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Docente)},
          },
        },
      },
    },
  })
  async getDocente(
    @param.path.number('id') id: typeof Seccion.prototype.id,
  ): Promise<Docente> {
    return this.seccionRepository.docente(id);
  }
}
