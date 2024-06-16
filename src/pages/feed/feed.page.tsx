import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ContainterComponent } from "../../@shared/components/container.component";
import { LoadingComponent } from "../../@shared/components/loading.component";
import { fakeDelay } from "../../@shared/utils/fake-delay";
import { PostFactory } from "../../application/post.factory";
import { Post } from "../../domain/models/post.model";

export default function FeedPage() {
  const getPostsUseCase = PostFactory.factoryGetPostsUseCase();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    setIsLoading(true);
    await fakeDelay(200);
    const response = await getPostsUseCase.execute();
    if (response.isLeft()) {
      toast.error(response.value.message, {
        position: "bottom-right",
      });
      return;
    }

    setPosts(response.value);
    setIsLoading(false);
  }

  return (
    <>
      <ContainterComponent>
        <div className="flex flex-col border-b-[1px] border-b-slate-800 pb-4">
          <h1 className="text-2xl font-bold">Postagens Recentes</h1>
        </div>

        <div className="flex flex-col gap-y-2 flex-1 pb-6 items-center">
          {isLoading && <LoadingComponent />}
          {posts.map((post, i) => (
            <Link
              key={i}
              className="border w-full rounded-md p-4 border-slate-800 cursor-pointer hover:bg-slate-900 transition-all"
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
    </>
  );
}
