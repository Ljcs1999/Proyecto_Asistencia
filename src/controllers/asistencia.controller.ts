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
import {Asistencia} from '../models';
import {AsistenciaRepository} from '../repositories';

export class AsistenciaController {
  constructor(
    @repository(AsistenciaRepository)
    public asistenciaRepository : AsistenciaRepository,
  ) {}

  @post('/asistencias')
  @response(200, {
    description: 'Asistencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Asistencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asistencia, {
            title: 'NewAsistencia',
            exclude: ['id'],
          }),
        },
      },
    })
    asistencia: Omit<Asistencia, 'id'>,
  ): Promise<Asistencia> {
    return this.asistenciaRepository.create(asistencia);
  }

  @get('/asistencias/count')
  @response(200, {
    description: 'Asistencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Asistencia) where?: Where<Asistencia>,
  ): Promise<Count> {
    return this.asistenciaRepository.count(where);
  }

  @get('/asistencias')
  @response(200, {
    description: 'Array of Asistencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asistencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Asistencia) filter?: Filter<Asistencia>,
  ): Promise<Asistencia[]> {
    return this.asistenciaRepository.find(filter);
  }

  @patch('/asistencias')
  @response(200, {
    description: 'Asistencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asistencia, {partial: true}),
        },
      },
    })
    asistencia: Asistencia,
    @param.where(Asistencia) where?: Where<Asistencia>,
  ): Promise<Count> {
    return this.asistenciaRepository.updateAll(asistencia, where);
  }

  @get('/asistencias/{id}')
  @response(200, {
    description: 'Asistencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asistencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Asistencia, {exclude: 'where'}) filter?: FilterExcludingWhere<Asistencia>
  ): Promise<Asistencia> {
    return this.asistenciaRepository.findById(id, filter);
  }

  @patch('/asistencias/{id}')
  @response(204, {
    description: 'Asistencia PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asistencia, {partial: true}),
        },
      },
    })
    asistencia: Asistencia,
  ): Promise<void> {
    await this.asistenciaRepository.updateById(id, asistencia);
  }

  @put('/asistencias/{id}')
  @response(204, {
    description: 'Asistencia PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() asistencia: Asistencia,
  ): Promise<void> {
    await this.asistenciaRepository.replaceById(id, asistencia);
  }

  @del('/asistencias/{id}')
  @response(204, {
    description: 'Asistencia DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.asistenciaRepository.deleteById(id);
  }
}
