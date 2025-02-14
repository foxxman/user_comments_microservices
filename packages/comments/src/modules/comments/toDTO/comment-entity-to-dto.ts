import { ICommentResponse } from 'common';
import { CommentEntity } from 'entities/comment.entity';

export const commentEntityToDto = (
  comment: CommentEntity,
): ICommentResponse => {
  return {
    id: comment.id,
    text: comment.text,
    userId: comment.userId,
    createdAt: comment.createdAt.toISOString(),
    updatedAt: comment.updatedAt.toISOString(),
  };
};
