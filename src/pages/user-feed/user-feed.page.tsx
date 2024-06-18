import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContainterComponent } from "../../@shared/components/container.component";
import { LoadingComponent } from "../../@shared/components/loading.component";
import { fakeDelay } from "../../@shared/utils/fake-delay";
import { PostFactory } from "../../application/post.factory";
import { Post } from "../../domain/models/post.model";

export default function UserFeedPage() {
  const getPostsOfUserUseCase = PostFactory.factoryGetPostsOfUserUseCase();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      setIsLoading(true);
      await fakeDelay(200);
      const response = await getPostsOfUserUseCase.execute(params.username!);
      if (response.isLeft()) {
        toast.error(response.value.message, {
          position: "bottom-right",
        });
        return;
      }

      setPosts(response.value);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ContainterComponent>
      <div className="flex flex-col border-b-[1px] border-b-slate-800">
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
        <h1 className="text-2xl font-bold">{params.username}</h1>

        <div className="w-full mt-4">
          <button className="py-2 text-sm border-b-[1px] text-purple-300 border-b-purple-500">
            <p>Postagens</p>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 flex-1 pb-6 items-center">
        {isLoading && <LoadingComponent />}
        {posts.length == 0 && !isLoading && (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-slate-500">Nenhuma postagem por aqui!</p>
          </div>
        )}
        {posts.map((post, i) => (
          <Link
            key={i}
            className="border w-full rounded-md p-4 border-slate-800 cursor-pointer hover:bg-slate-950/40 transition-all"
            to={`/posts/${post.id}`}
          >
            <h1 className="text-sm font-semibold">
              {i + 1}. {post.title}
            </h1>

            <div className="text-xs text-slate-600 flex gap-x-2">
              <p>{post.username}</p>
              <p>{post.getFormattedDiffTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </ContainterComponent>
  );
}
