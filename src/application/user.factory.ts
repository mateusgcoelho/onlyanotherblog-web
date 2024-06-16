import { HttpAxiosClient } from "../@core/gateway/http-axios-client";
import { UserRepository } from "../data/repository/user.repository";
import { IUserRepository } from "../domain/repository/user.repository";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { GetUserInfoUseCase } from "./use-cases/get-user-info.use-case";
import { SignInUseCase } from "./use-cases/sign-in.use-case";

export class UserFactory {
  private static userRepository: IUserRepository = new UserRepository(
    new HttpAxiosClient()
  );

  static factoryCreateUserUseCase(): CreateUserUseCase {
    return new CreateUserUseCase(this.userRepository);
  }

  static factorySignInUseCase(): SignInUseCase {
    return new SignInUseCase(this.userRepository);
  }

  static factoryGetUserInfoUseCase(): GetUserInfoUseCase {
    return new GetUserInfoUseCase(this.userRepository);
  }
}
