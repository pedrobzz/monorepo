import { Post } from "../entities/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../types/context";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  getPosts(@Ctx() { em }: Context): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  getPost(@Arg("id") id: number, @Ctx() { em }: Context): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Arg("content", { nullable: true }) content: string,
    @Ctx() { em }: Context,
  ): Promise<Post> {
    const post = em.create(Post, { title, content });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", { nullable: true }) title: string,
    @Arg("content", { nullable: true }) content: string,
    @Ctx() { em }: Context,
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }
    Object.assign(post, {
      title: title || post.title,
      content: content || post.content,
    });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: Context,
  ): Promise<boolean> {
    await em.nativeDelete(Post, { id });
    return true;
  }
}
