import { User } from "../models/user.model";

export interface ResponseSignInDtoProps {
  user: User;
  token: string;
}

export class ResponseSignInDto {
  user: User;
  token: string;

  constructor(props: ResponseSignInDtoProps) {
    this.user = props.user;
    this.token = props.token;
  }

  static fromJson(json: any): ResponseSignInDto {
    return new ResponseSignInDto({
      user: User.fromJson(json["user"]),
      token: json["token"],
    });
  }
}
