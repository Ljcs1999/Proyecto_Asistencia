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
  Alumno,
  DetalleAsistencia,
} from '../models';
import {AlumnoRepository} from '../repositories';

export class AlumnoDetalleAsistenciaController {
  constructor(
    @repository(AlumnoRepository) protected alumnoRepository: AlumnoRepository,
  ) { }

  @get('/alumnos/{id}/detalle-asistencias', {
    responses: {
      '200': {
        description: 'Array of Alumno has many DetalleAsistencia',
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
    return this.alumnoRepository.detalleAsistencias(id).find(filter);
  }

  @post('/alumnos/{id}/detalle-asistencias', {
    responses: {
      '200': {
        description: 'Alumno model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleAsistencia)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Alumno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleAsistencia, {
            title: 'NewDetalleAsistenciaInAlumno',
            exclude: ['id'],
            optional: ['Alumno_id']
          }),
        },
      },
    }) detalleAsistencia: Omit<DetalleAsistencia, 'id'>,
  ): Promise<DetalleAsistencia> {
    return this.alumnoRepository.detalleAsistencias(id).create(detalleAsistencia);
  }

  @patch('/alumnos/{id}/detalle-asistencias', {
    responses: {
      '200': {
        description: 'Alumno.DetalleAsistencia PATCH success count',
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
    return this.alumnoRepository.detalleAsistencias(id).patch(detalleAsistencia, where);
  }

  @del('/alumnos/{id}/detalle-asistencias', {
    responses: {
      '200': {
        description: 'Alumno.DetalleAsistencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DetalleAsistencia)) where?: Where<DetalleAsistencia>,
  ): Promise<Count> {
    return this.alumnoRepository.detalleAsistencias(id).delete(where);
  }
}
