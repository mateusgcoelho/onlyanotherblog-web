import { IUseCaseExecutor } from "../../@core/application/use-cases/use-case-executor.interface";
import { Either, left, right } from "../../@core/either";
import { DefaultError } from "../../@core/error/default.error";
import { CreatePostDto } from "../../domain/dtos/create-post.dto";
import { Post } from "../../domain/models/post.model";
import { IPostRepository } from "../../domain/repository/post.repository";

export class CreatePostUseCase
  implements
    IUseCaseExecutor<Promise<Either<DefaultError, Post>>, CreatePostDto>
{
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(data: CreatePostDto): Promise<Either<DefaultError, Post>> {
    try {
      const post = await this.postRepository.createPost(data);
      return right(post);
    } catch {
      return left(
        new DefaultError(
          "Não foi possível criar publicação, tente novamente mais tarde."
        )
      );
    }
  }
}
