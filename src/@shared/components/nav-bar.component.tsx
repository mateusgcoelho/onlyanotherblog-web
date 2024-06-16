import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../@core/presentation/contexts/auth.context";

export default function NavBar() {
  const {
    userInfo: { user },
    logOut,
  } = useContext(AuthContext);

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

          {user && (
            <NavLink
              to="/create-post"
              className={({ isActive }) => {
                return isActive
                  ? "text-purple-500 underline"
                  : "text-white hover:underline";
              }}
            >
              <p className="leading-normal">Nova publicação</p>
            </NavLink>
          )}
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

          {user && (
            <div className="flex items-center gap-x-4">
              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  return isActive
                    ? "text-purple-500 underline"
                    : "text-white hover:underline";
                }}
              >
                <p className="leading-normal">{user?.username ?? "..."}</p>
              </NavLink>

              <button
                onClick={() => logOut()}
                className="text-red-500 text-xl hover:text-red-700 transition-all"
              >
                <FiLogOut />
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
