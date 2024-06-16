import { IHttpClient } from "../../@core/gateway/http-client.interface";
import { CreatePostDto } from "../../domain/dtos/create-post.dto";
import { Post } from "../../domain/models/post.model";
import { IPostRepository } from "../../domain/repository/post.repository";

export class PostRepository implements IPostRepository {
  constructor(private readonly httpClient: IHttpClient) {}

  async getPost(id: string): Promise<Post> {
    const response = await this.httpClient.get(`/posts/${id}`);

    return Post.fromGetPostsJson(response["data"]["data"]);
  }

  async getPosts(): Promise<Post[]> {
    const response = await this.httpClient.get("/posts", {
      queryParams: {
        itens_per_page: 10,
      },
    });

    let posts: Post[] = [];

    for (var item of response["data"]["data"]) {
      posts.push(Post.fromGetPostsJson(item));
    }

    return posts;
  }

  async createPost(data: CreatePostDto): Promise<Post> {
    const response = await this.httpClient.post("/posts", {
      data,
    });

    return Post.fromJson(response["data"]["data"]);
  }
}
