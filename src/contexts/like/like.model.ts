import prismaClient from '../../prisma/client.prisma';

class LikeModel {
  async createLikedPost(userId: number, postId: number) {
    const likePost = await prismaClient.like.create({
      data: { userId, postId },
    });

    return likePost;
  }

  async findLikedPosts(userId: number) {
    const likedPosts = await prismaClient.like.findMany({
      where: { userId: userId },
      select: { post: true },
    });

    return likedPosts;
  }

  async deleteLikedPost(userId: number, postId: number) {
    await prismaClient.like.deleteMany({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    return postId;
  }
}

const likeModel = new LikeModel();

export default likeModel;
