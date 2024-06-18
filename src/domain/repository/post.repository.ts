import { CreatePostDto } from "../dtos/create-post.dto";
import { Post } from "../models/post.model";

export interface IPostRepository {
  getPosts(): Promise<Post[]>;
  getPostsOfUser(userId: string): Promise<Post[]>;
  getPost(id: string): Promise<Post>;
  createPost(data: CreatePostDto): Promise<Post>;
}
