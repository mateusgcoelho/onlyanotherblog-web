import { CreatePostDto } from "../dtos/create-post.dto";
import { Post } from "../models/post.model";

export interface IPostRepository {
  getPosts(): Promise<Post[]>;
  getPostsByUsername(username: string): Promise<Post[]>;
  getPostsOfUser(): Promise<Post[]>;
  getPost(id: string): Promise<Post>;
  createPost(data: CreatePostDto): Promise<Post>;
}
