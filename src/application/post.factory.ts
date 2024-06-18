import { HttpAxiosClient } from "../@core/gateway/http-axios-client";
import { PostRepository } from "../data/repository/post.repository";
import { IPostRepository } from "../domain/repository/post.repository";
import { CreatePostUseCase } from "./use-cases/create-post.use-case";
import { GetPostUseCase } from "./use-cases/get-post.use-case";
import { GetPostsOfUserUseCase } from "./use-cases/get-posts-of-user.use-case";
import { GetPostsUseCase } from "./use-cases/get-posts.use-case";

export class PostFactory {
  private static postRepository: IPostRepository = new PostRepository(
    new HttpAxiosClient()
  );

  static factoryCreatePostUseCase(): CreatePostUseCase {
    return new CreatePostUseCase(this.postRepository);
  }

  static factoryGetPostsUseCase(): GetPostsUseCase {
    return new GetPostsUseCase(this.postRepository);
  }

  static factoryGetPostsOfUserUseCase(): GetPostsOfUserUseCase {
    return new GetPostsOfUserUseCase(this.postRepository);
  }

  static factoryGetPostUseCase(): GetPostUseCase {
    return new GetPostUseCase(this.postRepository);
  }
}
