import { IUseCaseExecutor } from "../../@core/application/use-cases/use-case-executor.interface";
import { Either, left, right } from "../../@core/either";
import { DefaultError } from "../../@core/error/default.error";
import { CreateUserDto } from "../../domain/dtos/create-user.dto";
import { User } from "../../domain/models/user.model";
import { IUserRepository } from "../../domain/repository/user.repository";

export class CreateUserUseCase
  implements
    IUseCaseExecutor<Promise<Either<DefaultError, User>>, CreateUserDto>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDto): Promise<Either<DefaultError, User>> {
    try {
      const user = await this.userRepository.createUser(data);
      return right(user);
    } catch {
      return left(
        new DefaultError(
          "Não foi possível criar usuário, por favor verifique as informações."
        )
      );
    }
  }
}
