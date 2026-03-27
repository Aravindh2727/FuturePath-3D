import { Outlet, ScrollRestoration, Navigate, NavLink } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ShieldCheck, LogOut, Layers, Workflow, Briefcase, HelpCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const AdminLayout = () => {
  const auth = useAuthStore();
  if (!auth.user) {
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <div className="min-h-screen bg-surface text-neutral-100">
      <header className="border-b border-white/5 bg-surface-card/80 backdrop-blur-xl">
      <div className="page-container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">FuturePath 3D</div>
              <div className="text-xs text-neutral-400">Admin Console</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Button variant="ghost" className="h-9 px-3" onClick={() => auth.signOut()}>
              <LogOut size={16} className="mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-white/5 bg-surface/80 backdrop-blur p-4 hidden lg:block">
          <div className="flex flex-col gap-2 text-sm text-neutral-300">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5 ${isActive ? "bg-white/10 text-white" : ""}`
              }
            >
              <ShieldCheck size={16} />
              Overview
            </NavLink>
            <NavLink
              to="/admin/streams"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5 ${isActive ? "bg-white/10 text-white" : ""}`
              }
            >
              <Layers size={16} />
              Streams
            </NavLink>
            <NavLink
              to="/admin/departments"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5 ${isActive ? "bg-white/10 text-white" : ""}`
              }
            >
              <Workflow size={16} />
              Departments
            </NavLink>
            <NavLink
              to="/admin/jobs"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5 ${isActive ? "bg-white/10 text-white" : ""}`
              }
            >
              <Briefcase size={16} />
              Jobs
            </NavLink>
            <NavLink
              to="/admin/quiz"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5 ${isActive ? "bg-white/10 text-white" : ""}`
              }
            >
              <HelpCircle size={16} />
              Quiz
            </NavLink>
          </div>
        </aside>
        <main className="p-4 lg:p-8">
          {/* Mobile nav */}
          <div className="lg:hidden mb-4 grid grid-cols-2 gap-2 text-xs">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 border border-white/10 text-center ${isActive ? "bg-white/10 text-white" : "text-neutral-200"}`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/admin/streams"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 border border-white/10 text-center ${isActive ? "bg-white/10 text-white" : "text-neutral-200"}`
              }
            >
              Streams
            </NavLink>
            <NavLink
              to="/admin/departments"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 border border-white/10 text-center ${isActive ? "bg-white/10 text-white" : "text-neutral-200"}`
              }
            >
              Departments
            </NavLink>
            <NavLink
              to="/admin/jobs"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 border border-white/10 text-center ${isActive ? "bg-white/10 text-white" : "text-neutral-200"}`
              }
            >
              Jobs
            </NavLink>
            <NavLink
              to="/admin/quiz"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 border border-white/10 text-center ${isActive ? "bg-white/10 text-white" : "text-neutral-200"}`
              }
            >
              Quiz
            </NavLink>
          </div>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AdminLayout;
