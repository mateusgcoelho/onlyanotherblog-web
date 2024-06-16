import moment from "moment";
import { getFormatedTime } from "../../@shared/utils/my-date-utils";

export interface PostProps {
  id: string;
  title: string;
  content: string;
  username: string;
  createdAt: Date;
}

export class Post {
  id: string;
  title: string;
  content: string;
  username: string;
  createdAt: Date;

  constructor(props: PostProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.username = props.username;
    this.createdAt = props.createdAt;
  }

  static fromJson(json: any): Post {
    return new Post({
      id: json["id"],
      title: json["title"],
      content: json["content"],
      username: json["username"],
      createdAt: new Date(json["created_at"]),
    });
  }

  static fromGetPostsJson(json: any): Post {
    return new Post({
      id: json["post_id"],
      title: json["post_title"],
      content: json["post_content"],
      username: json["username"],
      createdAt: new Date(json["post_created_at"]),
    });
  }

  get getFormattedDiffTime(): string {
    const createdAt = moment(this.createdAt);
    const now = moment();
    const milliseconds = now.diff(createdAt, "milliseconds");

    return getFormatedTime(milliseconds);
  }
}
