import { Request, Response } from 'express';
import postsModel from './posts.model';

// 프론트엔드(boardId: 3), 백엔드(boardId: 4)

class PostsService {
  async createPost(req: Request, res: Response) {
    try {
      const { title, content, userId } = req.body;
      const parsedUserId = Number(userId);
      const parsedBoardId = Number(req.params.boardId);
      if (isNaN(parsedUserId) || isNaN(parsedBoardId))
        throw new Error('Not a number');

      const post = await postsModel.createPost(
        title,
        content,
        parsedUserId,
        parsedBoardId
      );

      res.json(post);
    } catch (e) {
      res.sendStatus(400);
    }
  }

  async getPublicPosts(req: Request, res: Response) {
    try {
      const preview = await postsModel.findManyPublicPosts();
      if (!preview) return res.sendStatus(400);

      res.json(preview);
    } catch (e) {
      res.json(e);
    }
  }

  async getFrontEndPosts(req: Request, res: Response) {
    try {
      const frontend = await postsModel.findManyFrontEnd();
      if (!frontend) return res.sendStatus(400);

      res.json(frontend);
    } catch (e) {
      res.json(e);
    }
  }

  async getBackEndPosts(req: Request, res: Response) {
    try {
      const backend = await postsModel.findManyBackEnd();
      if (!backend) return res.sendStatus(400);

      res.json(backend);
    } catch (e) {
      res.json(e);
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const parsedPostId = Number(req.params.postId);
      if (isNaN(parsedPostId)) throw new Error('PostId is not a number');

      const { title, content } = req.body;
      if (!title.trim()) throw new Error('No title');
      if (!content.trim()) throw new Error('No content');

      const updatedPost = await postsModel.updatePost(
        parsedPostId,
        title,
        content
      );

      res.json(updatedPost);
    } catch (e) {
      res.json(e);
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const parsedPostId = Number(req.params.postId);
      if (isNaN(parsedPostId)) throw new Error('PostId is not a number');

      const deletedPostId = await postsModel.deletePost(parsedPostId);

      res.json(deletedPostId);
    } catch (e) {
      res.json(e);
    }
  }
}

const postsService = new PostsService();

export default postsService;
