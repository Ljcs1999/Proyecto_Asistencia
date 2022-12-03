import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DetalleAsistencia} from '../models';
import {DetalleAsistenciaRepository} from '../repositories';

export class DetalleAsistenciaController {
  constructor(
    @repository(DetalleAsistenciaRepository)
    public detalleAsistenciaRepository : DetalleAsistenciaRepository,
  ) {}

  @post('/detalle-asistencias')
  @response(200, {
    description: 'DetalleAsistencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetalleAsistencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleAsistencia, {
            title: 'NewDetalleAsistencia',
            exclude: ['id'],
          }),
        },
      },
    })
    detalleAsistencia: Omit<DetalleAsistencia, 'id'>,
  ): Promise<DetalleAsistencia> {
    return this.detalleAsistenciaRepository.create(detalleAsistencia);
  }

  @get('/detalle-asistencias/count')
  @response(200, {
    description: 'DetalleAsistencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetalleAsistencia) where?: Where<DetalleAsistencia>,
  ): Promise<Count> {
    return this.detalleAsistenciaRepository.count(where);
  }

  @get('/detalle-asistencias')
  @response(200, {
    description: 'Array of DetalleAsistencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetalleAsistencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetalleAsistencia) filter?: Filter<DetalleAsistencia>,
  ): Promise<DetalleAsistencia[]> {
    return this.detalleAsistenciaRepository.find(filter);
  }

  @patch('/detalle-asistencias')
  @response(200, {
    description: 'DetalleAsistencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleAsistencia, {partial: true}),
        },
      },
    })
    detalleAsistencia: DetalleAsistencia,
    @param.where(DetalleAsistencia) where?: Where<DetalleAsistencia>,
  ): Promise<Count> {
    return this.detalleAsistenciaRepository.updateAll(detalleAsistencia, where);
  }

  @get('/detalle-asistencias/{id}')
  @response(200, {
    description: 'DetalleAsistencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetalleAsistencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DetalleAsistencia, {exclude: 'where'}) filter?: FilterExcludingWhere<DetalleAsistencia>
  ): Promise<DetalleAsistencia> {
    return this.detalleAsistenciaRepository.findById(id, filter);
  }

  @patch('/detalle-asistencias/{id}')
  @response(204, {
    description: 'DetalleAsistencia PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleAsistencia, {partial: true}),
        },
      },
    })
    detalleAsistencia: DetalleAsistencia,
  ): Promise<void> {
    await this.detalleAsistenciaRepository.updateById(id, detalleAsistencia);
  }

  @put('/detalle-asistencias/{id}')
  @response(204, {
    description: 'DetalleAsistencia PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() detalleAsistencia: DetalleAsistencia,
  ): Promise<void> {
    await this.detalleAsistenciaRepository.replaceById(id, detalleAsistencia);
  }

  @del('/detalle-asistencias/{id}')
  @response(204, {
    description: 'DetalleAsistencia DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.detalleAsistenciaRepository.deleteById(id);
  }
}
