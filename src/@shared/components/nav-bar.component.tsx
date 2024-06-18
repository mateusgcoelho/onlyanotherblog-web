import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../@core/presentation/contexts/auth.context";

export default function NavBarComponent() {
  const {
    userInfo: { user },
    logOut,
  } = useContext(AuthContext);

  return (
    <header className="bg-slate-950/75 z-10 backdrop-blur-[150px] py-4 m-auto max-w-screen-xl flex w-full items-center gap-x-10 border border-slate-800 px-10 shadow-sm shadow-blue-500/10 rounded-md">
      <Link to={"/"} className="text-purple-300 font-bold text-2xl">
        <span className="text-purple-400">Only</span>Another
        <span className="text-purple-500">Blog</span>!
      </Link>

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
