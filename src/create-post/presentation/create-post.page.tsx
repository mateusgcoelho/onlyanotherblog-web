import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NavBar from "../../@shared/components/nav-bar.component";
import { EditorMarkdownComponent } from "./editor-markdown.component";

const userToSignInSchema = z.object({
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

type UserToSignInSchema = z.infer<typeof userToSignInSchema>;

export default function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<UserToSignInSchema>({
    resolver: zodResolver(userToSignInSchema),
  });

  const [source, setSource] = useState("");

  const feedElement = (syntax: string) => {
    return setSource(source + syntax);
  };

  return (
    <>
      <div className="bg-slate-950 h-screen w-screen flex flex-col overflow-y-auto pt-6 pb-4 gap-y-4">
        <NavBar />

        <div className="text-white w-full flex flex-col gap-y-6 px-10 pt-8 max-w-screen-xl m-auto flex-1 border border-slate-800 rounded-md shadow-2xl shadow-blue-500/20">
          <div className="flex flex-col border-b-[1px] border-b-slate-800 pb-4">
            <h1 className="text-2xl font-bold">
              Opa! Eae o que temos de novo?
            </h1>
          </div>
          <form
            onSubmit={handleSubmit((d) => {
              console.log(d);
            })}
            className="flex flex-col gap-y-4 w-full"
          >
            <div className="flex flex-col gap-y-1">
              <label htmlFor="title" className="text-sm text-slate-400">
                Título
              </label>
              <input
                type="text"
                placeholder="Exemplo: O por que Java causa depressão?"
                className="border placeholder:text-slate-700 border-slate-700 bg-transparent rounded-md text-sm p-2 focus:border-purple-600 outline-none focus:shadow-2xl focus:shadow-blue-500/20 transition-all"
                {...register("title")}
              />
              <p className="text-red-500 text-xs">{errors.title?.message}</p>
            </div>

            <EditorMarkdownComponent
              source={source}
              feedElement={feedElement}
              textAreaProps={register("content", {
                onChange(e) {
                  setSource(e.target.value);
                },
              })}
              errorTextArea={
                errors.content?.message ? errors.content?.message : ""
              }
            />

            <div className="flex items-center justify-end">
              <button className="flex mt-10 items-center justify-center p-2 px-4 bg-purple-600 rounded-md text-sm">
                <p>Criar Postagem</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
