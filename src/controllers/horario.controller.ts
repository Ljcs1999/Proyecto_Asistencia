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
import {Horario} from '../models';
import {HorarioRepository} from '../repositories';

export class HorarioController {
  constructor(
    @repository(HorarioRepository)
    public horarioRepository : HorarioRepository,
  ) {}

  @post('/horarios')
  @response(200, {
    description: 'Horario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Horario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Horario, {
            title: 'NewHorario',
            exclude: ['id'],
          }),
        },
      },
    })
    horario: Omit<Horario, 'id'>,
  ): Promise<Horario> {
    return this.horarioRepository.create(horario);
  }

  @get('/horarios/count')
  @response(200, {
    description: 'Horario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Horario) where?: Where<Horario>,
  ): Promise<Count> {
    return this.horarioRepository.count(where);
  }

  @get('/horarios')
  @response(200, {
    description: 'Array of Horario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Horario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Horario) filter?: Filter<Horario>,
  ): Promise<Horario[]> {
    return this.horarioRepository.find(filter);
  }

  @patch('/horarios')
  @response(200, {
    description: 'Horario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Horario, {partial: true}),
        },
      },
    })
    horario: Horario,
    @param.where(Horario) where?: Where<Horario>,
  ): Promise<Count> {
    return this.horarioRepository.updateAll(horario, where);
  }

  @get('/horarios/{id}')
  @response(200, {
    description: 'Horario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Horario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Horario, {exclude: 'where'}) filter?: FilterExcludingWhere<Horario>
  ): Promise<Horario> {
    return this.horarioRepository.findById(id, filter);
  }

  @patch('/horarios/{id}')
  @response(204, {
    description: 'Horario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Horario, {partial: true}),
        },
      },
    })
    horario: Horario,
  ): Promise<void> {
    await this.horarioRepository.updateById(id, horario);
  }

  @put('/horarios/{id}')
  @response(204, {
    description: 'Horario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() horario: Horario,
  ): Promise<void> {
    await this.horarioRepository.replaceById(id, horario);
  }

  @del('/horarios/{id}')
  @response(204, {
    description: 'Horario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.horarioRepository.deleteById(id);
  }
}
