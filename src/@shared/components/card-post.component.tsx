import { Link } from "react-router-dom";
import { Post } from "../../domain/models/post.model";

type CardPostComponentProps = {
  post: Post;
  index?: number;
};

export function CardPostComponent({ post, index }: CardPostComponentProps) {
  return (
    <Link
      key={index}
      className="border w-full rounded-md p-4 border-slate-800 cursor-pointer hover:bg-slate-950/40 transition-all"
      to={`/posts/${post.id}`}
    >
      <h1 className="text-sm font-semibold line-clamp-2 break-words">
        {(!!!index ? 0 : index) + 1}. {post.title}
      </h1>

      <div className="text-xs text-slate-600 flex gap-x-2 flex-wrap">
        <p>{post.username}</p>
        <p>{post.getFormattedDiffTime}</p>
      </div>
    </Link>
  );
}
