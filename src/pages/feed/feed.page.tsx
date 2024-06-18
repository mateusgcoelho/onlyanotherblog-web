import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CardPostComponent } from "../../@shared/components/card-post.component";
import { ContainterComponent } from "../../@shared/components/container.component";
import { LoadingComponent } from "../../@shared/components/loading.component";
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
    try {
      setIsLoading(true);
      const response = await getPostsUseCase.execute();
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
    <>
      <ContainterComponent>
        <div className="flex flex-col border-b-[1px] border-b-slate-800 pb-4">
          <h1 className="text-2xl font-bold">Postagens Recentes</h1>
        </div>

        <div className="flex flex-col gap-y-2 flex-1 pb-6 items-center">
          {isLoading && <LoadingComponent />}
          {posts.length == 0 && !isLoading && (
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-slate-500">Nenhuma postagem por aqui!</p>
            </div>
          )}
          {posts.map((post, i) => (
            <CardPostComponent index={i} post={post} />
          ))}
        </div>
      </ContainterComponent>
    </>
  );
}
