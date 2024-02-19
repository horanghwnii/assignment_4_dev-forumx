import { Request, Response } from 'express';
import likeModel from './like.model';

class LikeService {
  async createLikedPost(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const postId = Number(req.params.postId);

      if (isNaN(postId) || isNaN(userId)) throw new Error('Not a number');

      const likedPost = await likeModel.createLikedPost(userId, postId);

      res.json(likedPost);
    } catch (e) {
      res.json(e);
    }
  }

  async getLikedPosts(req: Request, res: Response) {
    try {
      const parsedUserId = Number(req.params.userId);
      if (isNaN(parsedUserId)) throw new Error('UserId is not a number');

      const likedPosts = await likeModel.findLikedPosts(parsedUserId);
      if (!likedPosts) return res.sendStatus(400);

      res.json(likedPosts);
    } catch (e) {
      res.json(e);
    }
  }

  async deleteLikedPost(req: Request, res: Response) {
    try {
      const parsedUserId = Number(req.params.userId);
      if (isNaN(parsedUserId)) throw new Error('UserId is not a number');

      const parsedPostId = Number(req.params.postId);
      if (isNaN(parsedPostId)) throw new Error('UserId is not a number');

      const deletedPostId = await likeModel.deleteLikedPost(
        parsedUserId,
        parsedPostId
      );

      res.json(deletedPostId);
    } catch (e) {
      res.json(e);
    }
  }
}

const likeService = new LikeService();

export default likeService;
