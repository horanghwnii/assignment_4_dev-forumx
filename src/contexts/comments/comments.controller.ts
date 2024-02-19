import { Router } from 'express';
import commentsService from './comments.service';

const commentsController = Router();

commentsController.post(
  '/:postId/comments',
  commentsService.createCommentOfPost
);

commentsController.get('/:postId/comments', commentsService.getCommentsOfPost);

commentsController.get(
  '/:postId/comments/:commentId',
  commentsService.getCommentOfPost
);

commentsController.put(
  '/:postId/comments/:commentId',
  commentsService.updateCommentOfPost
);

commentsController.delete(
  '/:postId/comments/:commentId',
  commentsService.deleteCommentOfPost
);

export default commentsController;
