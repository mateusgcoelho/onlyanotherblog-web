import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { SignInUseCase } from "../../../users/application/use-cases/sign-in.use-case";
import { User } from "../../../users/models/user.model";
import { UserFactory } from "../../../users/user.factory";

interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  user: User | null;
  token: string;
  signIn(props: AuthCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const signInUseCase: SignInUseCase = UserFactory.factorySignInUseCase();

export const AuthProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  async function signIn(props: AuthCredentials): Promise<void> {
    const response = await signInUseCase.execute(props);

    if (response.isLeft()) {
      toast.error(response.value.message, {
        position: "bottom-right",
      });
      return;
    }

    toast.success("Autenticado com sucesso!", {
      position: "bottom-right",
    });
    setUser(response.value.user);
    setToken(response.value.token);
  }

  return (
    <AuthContext.Provider value={{ user: user, token: token, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
