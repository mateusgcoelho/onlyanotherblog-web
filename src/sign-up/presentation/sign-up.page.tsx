import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import NavBar from "../../@shared/components/nav-bar.component";
import { UserFactory } from "../../users/user.factory";

const userToCreateSchema = z.object({
  email: z.string().email({ message: "Digite um email válido." }),
  password: z
    .string()
    .min(8, { message: "A senha deve conter no mínimo 8 caracteres." })
    .max(24, { message: "A senha deve conter no máximo 24 caracteres." }),
  username: z
    .string()
    .min(4, {
      message: "O nome de usuário deve conter no mínimo 4 caracteres.",
    })
    .max(16, {
      message: "O nome de usuário deve conter no máximo 16 caracteres.",
    }),
});

type UserToCreateSchema = z.infer<typeof userToCreateSchema>;

export default function SignUpPage() {
  const createUserUseCase = UserFactory.factoryCreateUserUseCase();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserToCreateSchema>({
    resolver: zodResolver(userToCreateSchema),
  });

  async function handleSignUp(data: UserToCreateSchema) {
    const response = await createUserUseCase.execute(data);

    if (response.isLeft()) {
      toast.error(response.value.message, {
        position: "bottom-right",
      });
      return;
    }

    toast.success("Usuário criado com sucesso!", {
      position: "bottom-right",
    });
  }

  return (
    <>
      <div className="bg-slate-950 h-screen w-screen flex flex-col overflow-y-auto pt-6 pb-4 gap-y-4">
        <NavBar />
        <Toaster
          containerStyle={{
            position: "absolute",
            padding: 0,
            margin: 0,
            overflow: "hidden",
          }}
        />

        <div className="text-white w-full flex flex-col items-center flex-1 gap-y-6 py-8 px-10 max-w-screen-xl m-auto border border-slate-800 rounded-md shadow-2xl shadow-blue-500/20">
          <section className="flex-1 flex flex-col items-start justify-center gap-y-4 max-w-sm w-full h-full m-auto">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Precisa de um Blog?</h1>
              <p className="text-sm text-slate-500">
                Simples, bonito e rápido!
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex flex-col gap-y-4 mt-4 w-full"
            >
              <div className="flex flex-col gap-y-1">
                <label htmlFor="username" className="text-sm text-slate-400">
                  Nome de usuário
                </label>
                <p className="text-xs text-slate-600">
                  Esse nome será exibido publicamente.
                </p>
                <input
                  type="text"
                  placeholder="Exemplo: m3gagamers"
                  className="border placeholder:text-slate-700 border-slate-700 bg-transparent rounded-md text-sm p-2 focus:border-purple-600 outline-none focus:shadow-2xl focus:shadow-blue-500/20 transition-all"
                  {...register("username")}
                />
                <p className="text-red-500 text-xs">
                  {errors.username?.message}
                </p>
              </div>

              <div className="flex flex-col gap-y-1">
                <label htmlFor="email" className="text-sm text-slate-400">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Exemplo: helloworld@gmail.com"
                  className="border placeholder:text-slate-700 border-slate-700 bg-transparent rounded-md text-sm p-2 focus:border-purple-600 outline-none focus:shadow-2xl focus:shadow-blue-500/20 transition-all"
                  {...register("email")}
                />
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              </div>

              <div className="flex flex-col gap-y-1">
                <label htmlFor="password" className="text-sm text-slate-400">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="****************"
                  className="border placeholder:text-slate-700 border-slate-700 bg-transparent rounded-md text-sm p-2 focus:border-purple-600 outline-none focus:shadow-2xl focus:shadow-blue-500/20 transition-all"
                  {...register("password")}
                />
                <p className="text-red-500 text-xs">
                  {errors.password?.message}
                </p>
              </div>

              <button className="flex mt-10 items-center justify-center p-2 bg-purple-600 rounded-md text-sm">
                <p>Cadastrar</p>
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
