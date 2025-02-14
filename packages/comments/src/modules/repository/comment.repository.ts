import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'entities/comment.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async findOne(where: { id: string }): Promise<CommentEntity | null> {
    const comment = await this.commentRepository.findOne({ where });
    return comment;
  }

  async create({
    text,
    userId,
    deleteAfter,
  }: {
    text: string;
    userId: string;
    deleteAfter?: Date;
  }): Promise<CommentEntity> {
    const comment = this.commentRepository.create({
      text,
      userId,
      deleteAfter,
    });
    return this.commentRepository.save(comment);
  }

  async update(
    id: string,
    data: Partial<CommentEntity>,
  ): Promise<CommentEntity | null> {
    const comment = await this.findOne({ id });

    if (comment) {
      return this.commentRepository.save({ ...comment, ...data });
    }

    return null;
  }

  async find(data: {
    offset: number;
    limit: number;
    where: Partial<CommentEntity>;
  }): Promise<CommentEntity[]> {
    return this.commentRepository.find({
      skip: data.offset,
      take: data.limit,
      where: data.where,
    });
  }

  async count(data: { where: Partial<CommentEntity> }): Promise<number> {
    return this.commentRepository.count(data);
  }

  async deleteById(id: string): Promise<CommentEntity | null> {
    const comment = await this.findOne({ id });

    if (!comment) {
      return null;
    }

    await this.commentRepository.delete(id);

    return comment;
  }

  async delete(where: FindOptionsWhere<CommentEntity>): Promise<void> {
    await this.commentRepository.delete(where);
  }
}
