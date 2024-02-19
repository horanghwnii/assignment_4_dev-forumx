import prismaClient from '../../prisma/client.prisma';

class CommentsModel {
  async createCommentOfPost(postId: number, content: string) {
    const comment = await prismaClient.comment.create({
      data: { postId, content },
      select: { id: true, post: true, content: true },
    });

    return comment;
  }

  async getCommentsOfPost(postId: number) {
    const comments = await prismaClient.comment.findMany({
      where: { postId },
      select: { id: true, post: true, content: true },
    });

    return comments;
  }

  async getCommentOfPost(postId: number, commentId: number) {
    const comments = await prismaClient.comment.findUnique({
      where: { id: commentId, postId },
      select: { id: true, post: true, content: true },
    });

    return comments;
  }

  async updateCommentOfPost(
    postId: number,
    commentId: number,
    content: string
  ) {
    const comment = await prismaClient.comment.update({
      data: { content },
      where: { id: commentId, postId },
      select: { id: true, post: true, content: true },
    });

    return comment;
  }

  async deleteCommentOfPost(postId: number, commentId: number) {
    await prismaClient.comment.delete({
      where: { id: commentId, postId },
    });

    return commentId;
  }
}

const commentsModel = new CommentsModel();

export default commentsModel;
