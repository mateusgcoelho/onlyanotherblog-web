import { IUseCaseExecutor } from "../../@core/application/use-cases/use-case-executor.interface";
import { Either, left, right } from "../../@core/either";
import { DefaultError } from "../../@core/error/default.error";
import { Post } from "../../domain/models/post.model";
import { IPostRepository } from "../../domain/repository/post.repository";

export class GetPostsOfUserUseCase
  implements IUseCaseExecutor<Promise<Either<DefaultError, Post[]>>, string>
{
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(userId: string): Promise<Either<DefaultError, Post[]>> {
    try {
      const posts = await this.postRepository.getPostsOfUser(userId);
      return right(posts);
    } catch {
      return left(
        new DefaultError("Não foi possível buscar postagens de usuário.")
      );
    }
  }
}
