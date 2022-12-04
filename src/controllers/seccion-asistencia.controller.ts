import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Seccion,
  Asistencia,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionAsistenciaController {
  constructor(
    @repository(SeccionRepository) protected seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/asistencias', {
    responses: {
      '200': {
        description: 'Array of Seccion has many Asistencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asistencia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Asistencia>,
  ): Promise<Asistencia[]> {
    return this.seccionRepository.asistencias(id).find(filter);
  }

  @post('/seccions/{id}/asistencias', {
    responses: {
      '200': {
        description: 'Seccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asistencia)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Seccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asistencia, {
            title: 'NewAsistenciaInSeccion',
            exclude: ['id'],
            optional: ['Seccion_id']
          }),
        },
      },
    }) asistencia: Omit<Asistencia, 'id'>,
  ): Promise<Asistencia> {
    return this.seccionRepository.asistencias(id).create(asistencia);
  }

  @patch('/seccions/{id}/asistencias', {
    responses: {
      '200': {
        description: 'Seccion.Asistencia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asistencia, {partial: true}),
        },
      },
    })
    asistencia: Partial<Asistencia>,
    @param.query.object('where', getWhereSchemaFor(Asistencia)) where?: Where<Asistencia>,
  ): Promise<Count> {
    return this.seccionRepository.asistencias(id).patch(asistencia, where);
  }

  @del('/seccions/{id}/asistencias', {
    responses: {
      '200': {
        description: 'Seccion.Asistencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Asistencia)) where?: Where<Asistencia>,
  ): Promise<Count> {
    return this.seccionRepository.asistencias(id).delete(where);
  }
}
