import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  AuthContext,
  AuthContextData,
} from "../../@core/presentation/contexts/auth.context";

export default function NavBar() {
  const { user } = useContext<AuthContextData>(AuthContext);

  return (
    <header className="py-4 m-auto max-w-screen-xl flex w-full items-center gap-x-10 border border-slate-800 px-10 shadow-sm shadow-blue-500/10 rounded-md">
      <h1 className="text-purple-300 font-bold text-2xl">
        <span className="text-purple-400">Only</span>Another
        <span className="text-purple-500">Blog</span>!
      </h1>

      <nav className="flex flex-1 items-center justify-between text-sm gap-x-4">
        <div className="flex flex-1 items-center gap-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive
                ? "text-purple-500 underline"
                : "text-white hover:underline";
            }}
          >
            <p className="leading-normal">Recentes</p>
          </NavLink>
        </div>

        <div className="flex items-center gap-x-4">
          {!user && (
            <>
              <NavLink
                to="/signin"
                className={({ isActive }) => {
                  return isActive
                    ? "text-purple-500 underline"
                    : "text-white hover:underline";
                }}
              >
                <p className="leading-normal">Entrar</p>
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  return isActive
                    ? "text-purple-500 underline"
                    : "text-white hover:underline";
                }}
              >
                <p className="leading-normal">Cadastrar</p>
              </NavLink>
            </>
          )}

          {user && <p className="text-white">{user.username}</p>}
        </div>
      </nav>
    </header>
  );
}
