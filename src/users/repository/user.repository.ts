import { CreateUserDto } from "../dtos/create-user.dto";
import { ResponseSignInDto } from "../dtos/response-sign-in.dto";
import { SignInDto } from "../dtos/sign-in.dto";
import { User } from "../models/user.model";

export interface IUserRepository {
  createUser(data: CreateUserDto): Promise<User>;
  getUserInfo(): Promise<User>;
  signIn(data: SignInDto): Promise<ResponseSignInDto>;
}
