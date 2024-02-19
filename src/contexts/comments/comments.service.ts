import { Request, Response } from 'express';
import commentsModel from './comments.model';

class CommentsService {
  async createCommentOfPost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      if (isNaN(postId)) throw new Error('PostId is not a number');

      const { content } = req.body;
      if (!content.trim()) throw new Error('No content');

      const comment = await commentsModel.createCommentOfPost(postId, content);

      res.json(comment);
    } catch (e) {
      res.json(e);
    }
  }

  async getCommentsOfPost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      if (isNaN(postId)) throw new Error('PostId is not a number');

      const comments = await commentsModel.getCommentsOfPost(postId);

      res.json(comments);
    } catch (e) {
      res.json(e);
    }
  }

  async getCommentOfPost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const commentId = Number(req.params.commentId);
      if (isNaN(postId) || isNaN(commentId))
        throw new Error('PostId is not a number');

      const comment = await commentsModel.getCommentOfPost(postId, commentId);

      res.json(comment);
    } catch (e) {
      res.json(e);
    }
  }

  async updateCommentOfPost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const commentId = Number(req.params.commentId);
      if (isNaN(postId) || isNaN(commentId))
        throw new Error('PostId is not a number');

      const { content } = req.body;
      if (!content.trim()) throw new Error('No content');

      const comment = await commentsModel.updateCommentOfPost(
        postId,
        commentId,
        content
      );

      res.json(comment);
    } catch (e) {
      res.json(e);
    }
  }

  async deleteCommentOfPost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const commentId = Number(req.params.commentId);
      if (isNaN(postId) || isNaN(commentId))
        throw new Error('PostId is not a number');

      const deletedCommentId = await commentsModel.deleteCommentOfPost(
        postId,
        commentId
      );

      res.json(deletedCommentId);
    } catch (e) {
      res.json(e);
    }
  }
}

const commentsService = new CommentsService();

export default commentsService;
