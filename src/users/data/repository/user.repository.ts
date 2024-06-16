import { IHttpClient } from "../../../@core/gateway/http-client.interface";
import { CreateUserDto } from "../../dtos/create-user.dto";
import { ResponseSignInDto } from "../../dtos/response-sign-in.dto";
import { SignInDto } from "../../dtos/sign-in.dto";
import { User } from "../../models/user.model";
import { IUserRepository } from "../../repository/user.repository";

export class UserRepository implements IUserRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getUserInfo(): Promise<User> {
    const response = await this.httpClient.get("/users/me");
    console.log(response);

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
