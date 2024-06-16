export interface UserProps {
  id: string;
  username: string;
  email: string;
}

export class User {
  id: string;
  username: string;
  email: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
  }

  static fromJson(json: any): User {
    return new User({
      id: json["id"],
      username: json["username"],
      email: json["email"],
    });
  }
}
