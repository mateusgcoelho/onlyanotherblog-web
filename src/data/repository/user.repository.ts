import { IHttpClient } from "../../@core/gateway/http-client.interface";
import { CreateUserDto } from "../../domain/dtos/create-user.dto";
import { ResponseSignInDto } from "../../domain/dtos/response-sign-in.dto";
import { SignInDto } from "../../domain/dtos/sign-in.dto";
import { User } from "../../domain/models/user.model";
import { IUserRepository } from "../../domain/repository/user.repository";

export class UserRepository implements IUserRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getUserInfo(): Promise<User> {
    const response = await this.httpClient.get("/users/me");

    return User.fromJson(response.data["data"]);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const response = await this.httpClient.post("/users", {
      data,
    });

    return User.fromJson(response.data["data"]);
  }

  async signIn(data: SignInDto): Promise<ResponseSignInDto> {
    const response = await this.httpClient.post("/auth", {
      data,
    });

    return ResponseSignInDto.fromJson(response.data["data"]);
  }
}
