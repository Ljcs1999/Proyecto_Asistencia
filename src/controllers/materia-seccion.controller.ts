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
  Materia,
  Seccion,
} from '../models';
import {MateriaRepository} from '../repositories';

export class MateriaSeccionController {
  constructor(
    @repository(MateriaRepository) protected materiaRepository: MateriaRepository,
  ) { }

  @get('/materias/{id}/seccions', {
    responses: {
      '200': {
        description: 'Array of Materia has many Seccion',
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
    return this.materiaRepository.seccions(id).find(filter);
  }

  @post('/materias/{id}/seccions', {
    responses: {
      '200': {
        description: 'Materia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Seccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Materia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {
            title: 'NewSeccionInMateria',
            exclude: ['id'],
            optional: ['materia_id']
          }),
        },
      },
    }) seccion: Omit<Seccion, 'id'>,
  ): Promise<Seccion> {
    return this.materiaRepository.seccions(id).create(seccion);
  }

  @patch('/materias/{id}/seccions', {
    responses: {
      '200': {
        description: 'Materia.Seccion PATCH success count',
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
    return this.materiaRepository.seccions(id).patch(seccion, where);
  }

  @del('/materias/{id}/seccions', {
    responses: {
      '200': {
        description: 'Materia.Seccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Seccion)) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.materiaRepository.seccions(id).delete(where);
  }
}
