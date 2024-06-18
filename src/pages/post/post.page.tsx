import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContainterComponent } from "../../@shared/components/container.component";
import { MyMarkdownPreview } from "../../@shared/components/editor-markdown.component";
import { LoadingComponent } from "../../@shared/components/loading.component";
import { PostFactory } from "../../application/post.factory";
import { Post } from "../../domain/models/post.model";

export default function PostPage() {
  const getPostUseCase = PostFactory.factoryGetPostUseCase();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Post | undefined>();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPostInfo();
  }, []);

  async function getPostInfo() {
    setIsLoading(true);
    const response = await getPostUseCase.execute(params.id!);

    if (response.isLeft()) {
      navigate("/");
      return;
    }

    setPost(response.value);
    setIsLoading(false);
  }

  return (
    <ContainterComponent>
      <div className="flex flex-col">
        <Link
          to={".."}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="mb-2 text-purple-500 underline hover:text-purple-700 transition-all"
        >
          Voltar
        </Link>

        <h1 className="text-2xl font-bold break-words line-clamp-2">
          {post?.title}
        </h1>
        <p className="text-sm text-slate-500">
          <Link
            to={`/${post?.username}`}
            className="text-slate-500 underline hover:text-slate-800 transition-all"
          >
            {post?.username}
          </Link>
          {post?.getFormattedDiffTime ? ` | ${post.getFormattedDiffTime}` : ""}
        </p>
      </div>

      {isLoading && <LoadingComponent />}
      {!isLoading && (
        <div className="w-full">
          <MyMarkdownPreview source={post?.content ?? ""} />
        </div>
      )}
    </ContainterComponent>
  );
}
