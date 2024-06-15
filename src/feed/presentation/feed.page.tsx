import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../@shared/components/nav-bar.component";

type Posts = {
  post_id: string;
  post_title: string;
  post_content: string;
  username: string;
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts?itens_per_page=10").then((value) => {
      setPosts(value.data["data"]);
    });
  }, []);

  return (
    <>
      <div className="bg-slate-950 h-screen w-screen flex flex-col justify-center overflow-y-auto pt-6 pb-4 gap-y-4">
        <NavBar />

        <div className="text-white w-full flex flex-col gap-y-6 px-10 pt-8 max-w-screen-xl m-auto flex-1 border border-slate-800 rounded-md shadow-2xl shadow-blue-500/20">
          <div className="flex flex-col border-b-[1px] border-b-slate-800 pb-4">
            <h1 className="text-2xl font-bold">Postagens Recentes</h1>
          </div>

          <div className="flex flex-col gap-y-2 flex-1 pb-6">
            {posts.map((post, i) => (
              <Link
                key={post.post_id}
                className="border rounded-md p-4 border-slate-800 cursor-pointer hover:bg-slate-900 transition-all"
                to={"/" + post.post_id}
              >
                <h1 className="text-sm font-semibold">
                  {i + 1}. {post.post_title}
                </h1>

                <div className="text-xs text-slate-600 flex gap-x-2">
                  <p>{post.username}</p>
                  <p>22 horas atrás</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
