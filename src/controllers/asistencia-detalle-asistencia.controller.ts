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
  Asistencia,
  DetalleAsistencia,
} from '../models';
import {AsistenciaRepository} from '../repositories';

export class AsistenciaDetalleAsistenciaController {
  constructor(
    @repository(AsistenciaRepository) protected asistenciaRepository: AsistenciaRepository,
  ) { }

  @get('/asistencias/{id}/detalle-asistencias', {
    responses: {
      '200': {
        description: 'Array of Asistencia has many DetalleAsistencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleAsistencia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DetalleAsistencia>,
  ): Promise<DetalleAsistencia[]> {
    return this.asistenciaRepository.detalleAsistencias(id).find(filter);
  }

  @post('/asistencias/{id}/detalle-asistencias', {
    responses: {
      '200': {
        description: 'Asistencia model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleAsistencia)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Asistencia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleAsistencia, {
            title: 'NewDetalleAsistenciaInAsistencia',
            exclude: ['id'],
            optional: ['Asistencia_id']
          }),
        },
      },
    }) detalleAsistencia: Omit<DetalleAsistencia, 'id'>,
  ): Promise<DetalleAsistencia> {
    return this.asistenciaRepository.detalleAsistencias(id).create(detalleAsistencia);
  }

  @patch('/asistencias/{id}/detalle-asistencias', {
    responses: {
      '200': {
        description: 'Asistencia.DetalleAsistencia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleAsistencia, {partial: true}),
        },
      },
    })
    detalleAsistencia: Partial<DetalleAsistencia>,
    @param.query.object('where', getWhereSchemaFor(DetalleAsistencia)) where?: Where<DetalleAsistencia>,
  ): Promise<Count> {
    return this.asistenciaRepository.detalleAsistencias(id).patch(detalleAsistencia, where);
  }

  @del('/asistencias/{id}/detalle-asistencias', {
    responses: {
      '200': {
        description: 'Asistencia.DetalleAsistencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DetalleAsistencia)) where?: Where<DetalleAsistencia>,
  ): Promise<Count> {
    return this.asistenciaRepository.detalleAsistencias(id).delete(where);
  }
}
