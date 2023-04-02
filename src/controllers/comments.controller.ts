import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Comments} from '../models';
import {CommentsRepository} from '../repositories';

import {authenticate} from '@loopback/authentication';

@authenticate('jwt')

export class CommentsController {
  constructor(
    @repository(CommentsRepository)
    public commentsRepository: CommentsRepository,
  ) { }

  @post('/comments')
  @response(200, {
    description: 'Comments model instance',
    content: {'application/json': {schema: getModelSchemaRef(Comments)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {
            title: 'NewComments',
            exclude: ['_id'],
          }),
        },
      },
    })
    comments: Omit<Comments, '_id'>,
  ): Promise<Comments> {
    return this.commentsRepository.create(comments);
  }

  @get('/comments/count')
  @response(200, {
    description: 'Comments model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Comments) where?: Where<Comments>,
  ): Promise<Count> {
    return this.commentsRepository.count(where);
  }

  @get('/comments')
  @response(200, {
    description: 'Array of Comments model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Comments, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Comments) filter?: Filter<Comments>,
  ): Promise<Comments[]> {
    return this.commentsRepository.find(filter);
  }

  @patch('/comments')
  @response(200, {
    description: 'Comments PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {partial: true}),
        },
      },
    })
    comments: Comments,
    @param.where(Comments) where?: Where<Comments>,
  ): Promise<Count> {
    return this.commentsRepository.updateAll(comments, where);
  }

  @get('/comments/{id}')
  @response(200, {
    description: 'Comments model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Comments, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Comments, {exclude: 'where'}) filter?: FilterExcludingWhere<Comments>
  ): Promise<Comments> {
    return this.commentsRepository.findById(id, filter);
  }

  @patch('/comments/{id}')
  @response(204, {
    description: 'Comments PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comments, {partial: true}),
        },
      },
    })
    comments: Comments,
  ): Promise<void> {
    await this.commentsRepository.updateById(id, comments);
  }

  @put('/comments/{id}')
  @response(204, {
    description: 'Comments PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() comments: Comments,
  ): Promise<void> {
    await this.commentsRepository.replaceById(id, comments);
  }

  @del('/comments/{id}')
  @response(204, {
    description: 'Comments DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.commentsRepository.deleteById(id);
  }
}
