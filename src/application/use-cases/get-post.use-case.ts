import { IUseCaseExecutor } from "../../@core/application/use-cases/use-case-executor.interface";
import { Either, left, right } from "../../@core/either";
import { DefaultError } from "../../@core/error/default.error";
import { Post } from "../../domain/models/post.model";
import { IPostRepository } from "../../domain/repository/post.repository";

export class GetPostUseCase
  implements IUseCaseExecutor<Promise<Either<DefaultError, Post>>, string>
{
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(id: string): Promise<Either<DefaultError, Post>> {
    try {
      const post = await this.postRepository.getPost(id);
      return right(post);
    } catch {
      return left(new DefaultError("Não foi possível buscar postagem."));
    }
  }
}
