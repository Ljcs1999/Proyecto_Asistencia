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
import {DetalleMatricula} from '../models';
import {DetalleMatriculaRepository} from '../repositories';

export class DetalleMatriculaController {
  constructor(
    @repository(DetalleMatriculaRepository)
    public detalleMatriculaRepository : DetalleMatriculaRepository,
  ) {}

  @post('/detalle-matriculas')
  @response(200, {
    description: 'DetalleMatricula model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetalleMatricula)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleMatricula, {
            title: 'NewDetalleMatricula',
            exclude: ['id'],
          }),
        },
      },
    })
    detalleMatricula: Omit<DetalleMatricula, 'id'>,
  ): Promise<DetalleMatricula> {
    return this.detalleMatriculaRepository.create(detalleMatricula);
  }

  @get('/detalle-matriculas/count')
  @response(200, {
    description: 'DetalleMatricula model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetalleMatricula) where?: Where<DetalleMatricula>,
  ): Promise<Count> {
    return this.detalleMatriculaRepository.count(where);
  }

  @get('/detalle-matriculas')
  @response(200, {
    description: 'Array of DetalleMatricula model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetalleMatricula, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetalleMatricula) filter?: Filter<DetalleMatricula>,
  ): Promise<DetalleMatricula[]> {
    return this.detalleMatriculaRepository.find(filter);
  }

  @patch('/detalle-matriculas')
  @response(200, {
    description: 'DetalleMatricula PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleMatricula, {partial: true}),
        },
      },
    })
    detalleMatricula: DetalleMatricula,
    @param.where(DetalleMatricula) where?: Where<DetalleMatricula>,
  ): Promise<Count> {
    return this.detalleMatriculaRepository.updateAll(detalleMatricula, where);
  }

  @get('/detalle-matriculas/{id}')
  @response(200, {
    description: 'DetalleMatricula model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetalleMatricula, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DetalleMatricula, {exclude: 'where'}) filter?: FilterExcludingWhere<DetalleMatricula>
  ): Promise<DetalleMatricula> {
    return this.detalleMatriculaRepository.findById(id, filter);
  }

  @patch('/detalle-matriculas/{id}')
  @response(204, {
    description: 'DetalleMatricula PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleMatricula, {partial: true}),
        },
      },
    })
    detalleMatricula: DetalleMatricula,
  ): Promise<void> {
    await this.detalleMatriculaRepository.updateById(id, detalleMatricula);
  }

  @put('/detalle-matriculas/{id}')
  @response(204, {
    description: 'DetalleMatricula PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() detalleMatricula: DetalleMatricula,
  ): Promise<void> {
    await this.detalleMatriculaRepository.replaceById(id, detalleMatricula);
  }

  @del('/detalle-matriculas/{id}')
  @response(204, {
    description: 'DetalleMatricula DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.detalleMatriculaRepository.deleteById(id);
  }
}
