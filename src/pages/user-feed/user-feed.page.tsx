import NavBarComponent from "../../@shared/components/nav-bar.component";

export default function UserFeedPage() {
  return (
    <>
      <div className="bg-slate-950 h-screen w-screen flex flex-col justify-center overflow-y-auto pt-6 pb-4 gap-y-4">
        <NavBarComponent />

        <div className="text-white w-full flex flex-col gap-y-6 px-10 pt-8 max-w-screen-xl m-auto flex-1 border border-slate-800 rounded-md shadow-2xl shadow-blue-500/20">
          <div className="flex flex-col border-b-[1px] border-b-slate-800 pb-4">
            <h1 className="text-2xl font-bold">mateusgcoelho</h1>
            <p className="text-slate-600 text-sm">Blog criado em: 15/06/2024</p>
          </div>

          <div className="flex flex-col gap-y-2 flex-1 pb-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div className="border rounded-md p-4 border-slate-800 cursor-pointer hover:bg-slate-900 transition-all">
                <h1 className="text-sm font-semibold">
                  {i + 1}. How to Create a WebSite with React??
                </h1>

                <div className="text-xs text-slate-600 flex gap-x-2">
                  <p>mateusgcoelho</p>
                  <p>22 horas atrás</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
