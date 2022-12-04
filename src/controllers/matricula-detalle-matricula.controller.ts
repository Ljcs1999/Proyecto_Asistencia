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
  Matricula,
  DetalleMatricula,
} from '../models';
import {MatriculaRepository} from '../repositories';

export class MatriculaDetalleMatriculaController {
  constructor(
    @repository(MatriculaRepository) protected matriculaRepository: MatriculaRepository,
  ) { }

  @get('/matriculas/{id}/detalle-matriculas', {
    responses: {
      '200': {
        description: 'Array of Matricula has many DetalleMatricula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleMatricula)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DetalleMatricula>,
  ): Promise<DetalleMatricula[]> {
    return this.matriculaRepository.detalleMatriculas(id).find(filter);
  }

  @post('/matriculas/{id}/detalle-matriculas', {
    responses: {
      '200': {
        description: 'Matricula model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleMatricula)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Matricula.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleMatricula, {
            title: 'NewDetalleMatriculaInMatricula',
            exclude: ['id'],
            optional: ['Matricula_id']
          }),
        },
      },
    }) detalleMatricula: Omit<DetalleMatricula, 'id'>,
  ): Promise<DetalleMatricula> {
    return this.matriculaRepository.detalleMatriculas(id).create(detalleMatricula);
  }

  @patch('/matriculas/{id}/detalle-matriculas', {
    responses: {
      '200': {
        description: 'Matricula.DetalleMatricula PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleMatricula, {partial: true}),
        },
      },
    })
    detalleMatricula: Partial<DetalleMatricula>,
    @param.query.object('where', getWhereSchemaFor(DetalleMatricula)) where?: Where<DetalleMatricula>,
  ): Promise<Count> {
    return this.matriculaRepository.detalleMatriculas(id).patch(detalleMatricula, where);
  }

  @del('/matriculas/{id}/detalle-matriculas', {
    responses: {
      '200': {
        description: 'Matricula.DetalleMatricula DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DetalleMatricula)) where?: Where<DetalleMatricula>,
  ): Promise<Count> {
    return this.matriculaRepository.detalleMatriculas(id).delete(where);
  }
}
