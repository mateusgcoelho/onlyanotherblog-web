import MarkdownPreview from "@uiw/react-markdown-preview";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../@shared/components/nav-bar.component";

type Posts = {
  post_id: string;
  post_title: string;
  post_content: string;
  username: string;
};

export default function PostPage() {
  const [post, setPost] = useState<Posts | undefined>();
  let params = useParams();

  useEffect(() => {
    axios.get("http://localhost:3000/posts/" + params.id).then((value) => {
      setPost(value.data["data"]);
    });
  }, []);

  return (
    <>
      <div className="bg-slate-950 h-screen w-screen flex flex-col overflow-y-auto pt-6 pb-4 gap-y-4">
        <NavBar />

        <div className="text-white w-full flex flex-col flex-1 gap-y-6 py-8 px-10 max-w-screen-xl m-auto border border-slate-800 rounded-md shadow-2xl shadow-blue-500/20">
          <div className="flex flex-col">
            <Link
              to={"/"}
              className="mb-2 text-purple-500 underline hover:text-purple-700 transition-all"
            >
              Voltar
            </Link>
            <h1 className="text-2xl font-bold">{post?.post_title}</h1>
            <p className="text-sm text-slate-500">
              <Link
                to={"/"}
                className="text-slate-500 underline hover:text-white transition-all"
              >
                {post?.username}
              </Link>{" "}
              | 20 Horas atrás | 5 Minutos de Leitura
            </p>
          </div>

          <MarkdownPreview
            source={post?.post_content}
            className="flex-1 p-0 overflow-y-visible bg-transparent h-full w-full"
          />
        </div>
      </div>
    </>
  );
}
