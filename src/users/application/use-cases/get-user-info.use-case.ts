import { IUseCaseExecutor } from "../../../@core/application/use-cases/use-case-executor.interface";
import { Either, left, right } from "../../../@core/either";
import { DefaultError } from "../../../@core/error/default.error";
import { User } from "../../models/user.model";
import { IUserRepository } from "../../repository/user.repository";

export class GetUserInfoUseCase
  implements IUseCaseExecutor<Promise<Either<DefaultError, User>>, void>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<Either<DefaultError, User>> {
    try {
      const user = await this.userRepository.getUserInfo();
      return right(user);
    } catch (exc) {
      return left(
        new DefaultError("Não foi possível buscar informações de usuário.")
      );
    }
  }
}
