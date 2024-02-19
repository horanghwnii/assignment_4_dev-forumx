import prismaClient from '../../prisma/client.prisma';

class PostsModel {
  async createPost(
    title: string,
    content: string,
    userId: number,
    boardId: number
  ) {
    const post = await prismaClient.post.create({
      data: {
        title,
        content,
        userId,
        boardId,
      },
    });

    return post;
  }

  async findManyPublicPosts() {
    const frontPreview = await prismaClient.post.findMany({
      select: {
        boardId: true,
        title: true,
        content: true,
        createdAt: true,
        comment: true,
        like: true,
      },
      where: { boardId: 3 },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const backPreview = await prismaClient.post.findMany({
      select: {
        boardId: true,
        title: true,
        content: true,
        createdAt: true,
        comment: true,
        like: true,
      },
      where: { boardId: 4 },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const preview = [...frontPreview, ...backPreview];

    return preview;
  }

  async findManyFrontEnd() {
    const getFrontEnd = await prismaClient.post.findMany({
      select: {
        title: true,
        content: true,
        createdAt: true,
        comment: true,
        like: true,
      },
      where: { boardId: 3 },
    });

    return getFrontEnd;
  }

  async findManyBackEnd() {
    const getBackEnd = await prismaClient.post.findMany({
      select: {
        title: true,
        content: true,
        createdAt: true,
        comment: true,
        like: true,
      },
      where: { boardId: 4 },
    });

    return getBackEnd;
  }

  async updatePost(postId: number, title: string, content: string) {
    const updatedPost = await prismaClient.post.update({
      data: { title, content },
      where: { id: postId },
    });

    return updatedPost;
  }

  async deletePost(postId: number) {
    // 1.해당 게시물과 관련된 모든 댓글 데이터 삭제
    await prismaClient.comment.deleteMany({
      where: { postId: postId },
    });

    // 2.해당 게시물 삭제
    await prismaClient.post.delete({
      where: { id: postId },
    });

    return postId;
  }
}

const postsModel = new PostsModel();

export default postsModel;
