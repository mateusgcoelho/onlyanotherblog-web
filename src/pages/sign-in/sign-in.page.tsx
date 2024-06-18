import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthContext } from "../../@core/presentation/contexts/auth.context";
import { ButtonComponent } from "../../@shared/components/button.component";
import { ContainterComponent } from "../../@shared/components/container.component";

const userToSignInSchema = z.object({
  email: z.string().email({ message: "Digite um email válido." }),
  password: z
    .string()
    .min(8, { message: "A senha deve conter no mínimo 8 caracteres." })
    .max(24, { message: "A senha deve conter no máximo 24 caracteres." }),
});

type UserToSignInSchema = z.infer<typeof userToSignInSchema>;

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserToSignInSchema>({
    resolver: zodResolver(userToSignInSchema),
  });

  async function handleSignUp(data: UserToSignInSchema) {
    try {
      setIsLoading(true);
      await signIn(data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ContainterComponent>
        <section className="flex-1 flex flex-col items-start justify-center gap-y-4 max-w-sm w-full h-full m-auto">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Acessar Blog</h1>
            <p className="text-sm text-slate-500">
              Bem-vindo novamente, campeão!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col gap-y-4 mt-4 w-full"
          >
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
              <p className="text-red-500 text-xs">{errors.password?.message}</p>
            </div>

            <ButtonComponent isLoading={isLoading}>
              <p>Acessar</p>
            </ButtonComponent>
          </form>
        </section>
      </ContainterComponent>
    </>
  );
}
