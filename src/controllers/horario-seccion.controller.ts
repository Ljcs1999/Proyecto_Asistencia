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
  Horario,
  Seccion,
} from '../models';
import {HorarioRepository} from '../repositories';

export class HorarioSeccionController {
  constructor(
    @repository(HorarioRepository) protected horarioRepository: HorarioRepository,
  ) { }

  @get('/horarios/{id}/seccions', {
    responses: {
      '200': {
        description: 'Array of Horario has many Seccion',
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
    return this.horarioRepository.seccions(id).find(filter);
  }

  @post('/horarios/{id}/seccions', {
    responses: {
      '200': {
        description: 'Horario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Seccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Horario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {
            title: 'NewSeccionInHorario',
            exclude: ['id'],
            optional: ['horario_id']
          }),
        },
      },
    }) seccion: Omit<Seccion, 'id'>,
  ): Promise<Seccion> {
    return this.horarioRepository.seccions(id).create(seccion);
  }

  @patch('/horarios/{id}/seccions', {
    responses: {
      '200': {
        description: 'Horario.Seccion PATCH success count',
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
    return this.horarioRepository.seccions(id).patch(seccion, where);
  }

  @del('/horarios/{id}/seccions', {
    responses: {
      '200': {
        description: 'Horario.Seccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Seccion)) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.horarioRepository.seccions(id).delete(where);
  }
}
