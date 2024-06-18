import { IUseCaseExecutor } from "../../@core/application/use-cases/use-case-executor.interface";
import { Either, left, right } from "../../@core/either";
import { DefaultError } from "../../@core/error/default.error";
import { Post } from "../../domain/models/post.model";
import { IPostRepository } from "../../domain/repository/post.repository";

export class GetPostsByUsernameUseCase
  implements IUseCaseExecutor<Promise<Either<DefaultError, Post[]>>, string>
{
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(username: string): Promise<Either<DefaultError, Post[]>> {
    try {
      const posts = await this.postRepository.getPostsByUsername(username);
      return right(posts);
    } catch {
      return left(
        new DefaultError("Não foi possível buscar postagens de usuário.")
      );
    }
  }
}
