import { HttpAxiosClient } from "../@core/gateway/http-axios-client";
import { CreateUserUseCase } from "./application/use-cases/create-user.use-case";
import { GetUserInfoUseCase } from "./application/use-cases/get-user-info.use-case";
import { SignInUseCase } from "./application/use-cases/sign-in.use-case";
import { UserRepository } from "./data/repository/user.repository";
import { IUserRepository } from "./repository/user.repository";

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
