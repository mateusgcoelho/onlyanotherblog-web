import { IUseCaseExecutor } from "../../../@core/application/use-cases/use-case-executor.interface";
import { Either, left, right } from "../../../@core/either";
import { DefaultError } from "../../../@core/error/default.error";
import { ResponseSignInDto } from "../../dtos/response-sign-in.dto";
import { SignInDto } from "../../dtos/sign-in.dto";
import { IUserRepository } from "../../repository/user.repository";

export class SignInUseCase
  implements
    IUseCaseExecutor<
      Promise<Either<DefaultError, ResponseSignInDto>>,
      SignInDto
    >
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    data: SignInDto
  ): Promise<Either<DefaultError, ResponseSignInDto>> {
    try {
      const response = await this.userRepository.signIn(data);
      return right(response);
    } catch {
      return left(
        new DefaultError(
          "Email e/ou senha inválidos, por favor tente novamente."
        )
      );
    }
  }
}
