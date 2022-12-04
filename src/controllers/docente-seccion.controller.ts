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
  Docente,
  Seccion,
} from '../models';
import {DocenteRepository} from '../repositories';

export class DocenteSeccionController {
  constructor(
    @repository(DocenteRepository) protected docenteRepository: DocenteRepository,
  ) { }

  @get('/docentes/{id}/seccions', {
    responses: {
      '200': {
        description: 'Array of Docente has many Seccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Seccion>,
  ): Promise<Seccion[]> {
    return this.docenteRepository.seccions(id).find(filter);
  }

  @post('/docentes/{id}/seccions', {
    responses: {
      '200': {
        description: 'Docente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Seccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Docente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {
            title: 'NewSeccionInDocente',
            exclude: ['id'],
            optional: ['docente_id']
          }),
        },
      },
    }) seccion: Omit<Seccion, 'id'>,
  ): Promise<Seccion> {
    return this.docenteRepository.seccions(id).create(seccion);
  }

  @patch('/docentes/{id}/seccions', {
    responses: {
      '200': {
        description: 'Docente.Seccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {partial: true}),
        },
      },
    })
    seccion: Partial<Seccion>,
    @param.query.object('where', getWhereSchemaFor(Seccion)) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.docenteRepository.seccions(id).patch(seccion, where);
  }

  @del('/docentes/{id}/seccions', {
    responses: {
      '200': {
        description: 'Docente.Seccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Seccion)) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.docenteRepository.seccions(id).delete(where);
  }
}
