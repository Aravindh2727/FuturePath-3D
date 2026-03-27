import { Outlet, ScrollRestoration } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PageTransition } from "../components/ui/PageTransition";
import { useAuthStore } from "../store/useAuthStore";

const MainLayout = () => {
  const auth = useAuthStore();

  useEffect(() => {
    auth.init();
    // run once on mount
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-surface/90 text-neutral-100 relative">
      <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,240,255,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.14),transparent_30%)]" />

      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
