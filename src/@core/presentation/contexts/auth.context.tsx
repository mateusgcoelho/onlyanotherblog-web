import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserFactory } from "../../../application/user.factory";
import { User } from "../../../domain/models/user.model";

interface AuthCredentials {
  email: string;
  password: string;
}

interface UserInfoContext {
  user: User | null;
  token: string;
}

export interface AuthContextData {
  userInfo: UserInfoContext;
  signIn(props: AuthCredentials): Promise<void>;
  logOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const signInUseCase = UserFactory.factorySignInUseCase();
const getUserInfoUseCase = UserFactory.factoryGetUserInfoUseCase();

export const AuthProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const navigate = useNavigate();

  const cookies = new Cookies(null, { path: "/" });

  const [userInfo, setUserInfo] = useState<UserInfoContext>({
    token: "",
    user: null,
  });

  useEffect(() => {
    revalidateToken();
  }, []);

  async function signIn(props: AuthCredentials): Promise<void> {
    const response = await signInUseCase.execute(props);

    if (response.isLeft()) {
      toast.error(response.value.message, {
        position: "bottom-right",
      });
      return;
    }

    cookies.set("@onlyanotherblog:token", response.value.token, {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    });

    setUserInfo({
      user: response.value.user,
      token: response.value.token,
    });

    navigate("/");
    toast.success("Autenticado com sucesso!", {
      position: "bottom-right",
    });
  }

  async function revalidateToken(): Promise<void> {
    const token = cookies.get("@onlyanotherblog:token");

    if (!token) {
      return;
    }

    const response = await getUserInfoUseCase.execute();

    if (response.isLeft()) {
      cookies.remove("@onlyanotherblog:token");
      navigate("/signin");
      toast.error("Por favor valide seu usuário novamente.", {
        position: "bottom-right",
      });
      return;
    }

    console.log(response.value);
    setUserInfo({
      user: response.value,
      token: token,
    });
  }

  function logOut(): void {
    cookies.remove("@onlyanotherblog:token");
    setUserInfo({
      user: null,
      token: "",
    });
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ userInfo, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
