import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../@core/presentation/contexts/auth.context";
import { CardPostComponent } from "../../@shared/components/card-post.component";
import { ContainterComponent } from "../../@shared/components/container.component";
import { LoadingComponent } from "../../@shared/components/loading.component";
import { PostFactory } from "../../application/post.factory";
import { Post } from "../../domain/models/post.model";

export default function ProfilePage() {
  const getPostsOfUserUseCase = PostFactory.factoryGetPostsOfUserUseCase();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      setIsLoading(true);
      const response = await getPostsOfUserUseCase.execute();
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
        <h1 className="text-2xl font-bold">{userInfo.user?.username ?? "-"}</h1>

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
          <CardPostComponent index={i} post={post} />
        ))}
      </div>
    </ContainterComponent>
  );
}
