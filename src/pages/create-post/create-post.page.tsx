import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ContainterComponent } from "../../@shared/components/container.component";
import { EditorMarkdownComponent } from "../../@shared/components/editor-markdown.component";
import { PostFactory } from "../../application/post.factory";

const postToCreateSchema = z.object({
  title: z
    .string()
    .min(8, { message: "O título deve conter no mínimo 8 caracteres." })
    .max(60, { message: "O título deve conter no máximo 24 caracteres." }),
  content: z
    .string({
      message: "A postagem deve conter um conteúdo.",
    })
    .min(10, { message: "O conteúdo deve conter no mínimo 10 caracteres." }),
});

type PostToCreateSchema = z.infer<typeof postToCreateSchema>;

export default function CreatePostPage() {
  const createPostUseCase = PostFactory.factoryCreatePostUseCase();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostToCreateSchema>({
    resolver: zodResolver(postToCreateSchema),
  });

  const navigate = useNavigate();

  const [source, setSource] = useState("");

  const feedElement = (syntax: string) => {
    return setSource(source + syntax);
  };

  async function handleCreatePost(data: PostToCreateSchema) {
    const response = await createPostUseCase.execute(data);

    if (response.isLeft()) {
      toast.error(response.value.message, {
        position: "bottom-right",
      });
      return;
    }

    navigate(`/posts/${response.value.id}`);
    toast.success("Postagem criada com sucesso!", {
      position: "bottom-right",
    });
  }

  return (
    <ContainterComponent>
      <div className="flex flex-col border-b-[1px] border-b-slate-800 pb-4">
        <h1 className="text-2xl font-bold">Opa! Eae o que temos de novo?</h1>
      </div>
      <form
        onSubmit={handleSubmit(handleCreatePost)}
        className="flex flex-col gap-y-4 w-full"
      >
        <div className="flex flex-col gap-y-1">
          <label htmlFor="title" className="text-sm text-slate-400">
            Título
          </label>
          <input
            type="text"
            placeholder="Exemplo: O por que Java causa depressão?"
            className="border placeholder:text-slate-500 border-slate-500 bg-transparent rounded-md text-sm p-2 focus:border-purple-600 outline-none focus:shadow-2xl focus:shadow-blue-500/20 transition-all"
            {...register("title")}
            autoFocus
          />
          <p className="text-red-500 text-xs">{errors.title?.message}</p>
        </div>

        <h1 className="text-sm text-slate-400">Conteúdo da Postagem</h1>

        <EditorMarkdownComponent
          source={source}
          feedElement={feedElement}
          textAreaProps={register("content", {
            onChange(e) {
              setSource(e.target.value);
            },
          })}
          errorTextArea={errors.content?.message ? errors.content?.message : ""}
        />

        <div className="flex items-center justify-end">
          <button className="flex mt-10 items-center justify-center p-2 px-4 bg-purple-600 rounded-md text-sm">
            <p>Criar Postagem</p>
          </button>
        </div>
      </form>
    </ContainterComponent>
  );
}
