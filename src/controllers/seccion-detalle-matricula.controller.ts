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
  DetalleMatricula,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionDetalleMatriculaController {
  constructor(
    @repository(SeccionRepository) protected seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/detalle-matriculas', {
    responses: {
      '200': {
        description: 'Array of Seccion has many DetalleMatricula',
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
    return this.seccionRepository.detalleMatriculas(id).find(filter);
  }

  @post('/seccions/{id}/detalle-matriculas', {
    responses: {
      '200': {
        description: 'Seccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleMatricula)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Seccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleMatricula, {
            title: 'NewDetalleMatriculaInSeccion',
            exclude: ['id'],
            optional: ['Seccion_id']
          }),
        },
      },
    }) detalleMatricula: Omit<DetalleMatricula, 'id'>,
  ): Promise<DetalleMatricula> {
    return this.seccionRepository.detalleMatriculas(id).create(detalleMatricula);
  }

  @patch('/seccions/{id}/detalle-matriculas', {
    responses: {
      '200': {
        description: 'Seccion.DetalleMatricula PATCH success count',
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
    return this.seccionRepository.detalleMatriculas(id).patch(detalleMatricula, where);
  }

  @del('/seccions/{id}/detalle-matriculas', {
    responses: {
      '200': {
        description: 'Seccion.DetalleMatricula DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DetalleMatricula)) where?: Where<DetalleMatricula>,
  ): Promise<Count> {
    return this.seccionRepository.detalleMatriculas(id).delete(where);
  }
}
