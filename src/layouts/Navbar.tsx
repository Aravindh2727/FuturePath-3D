import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Menu, X, Rocket, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "../store/useLanguageStore";
import { t } from "../i18n/messages";

const links = [
  { to: "/", labelKey: "nav_home" },
  { to: "/streams", labelKey: "nav_streams" },
  { to: "/departments", labelKey: "nav_departments" },
  { to: "/explore-3d", labelKey: "nav_explore" },
  { to: "/compare-courses", labelKey: "nav_compare" },
  { to: "/career-quiz", labelKey: "nav_quiz" },
  { to: "/favorites", labelKey: "nav_favorites" },
  { to: "/parent", labelKey: "nav_parent" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const lang = useLanguageStore((s) => s.lang);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-surface/60 border-b border-white/5">
      <div className="page-container flex items-center gap-3 md:gap-4 lg:gap-6 py-4 min-w-0">
        <Link to="/" className="shrink-0 flex items-center gap-2 text-lg font-semibold tracking-tight min-w-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-surface shadow-glow">
            <Rocket size={22} />
          </span>
          <div className="leading-tight min-w-0">
            <div className="text-white">FuturePath 3D</div>
            <div className="text-xs text-neutral-300">Immersive Learning</div>
          </div>
        </Link>

        <div className="hidden md:flex flex-1 items-center gap-3 lg:gap-5 min-w-0">
          <nav className="flex flex-1 min-w-0 items-center gap-2 md:gap-2.5 lg:gap-5 text-sm text-neutral-200 flex-wrap lg:flex-nowrap">
              {links.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "hover:text-white transition-colors",
                      isActive ? "text-white" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                >
                  {t(lang, item.labelKey as any)}
                </NavLink>
              ))}
            </nav>

          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <Button as={Link} to="/admin" className="px-3 py-2 text-sm">
              <Sparkles size={18} className="mr-2" />
              Admin
            </Button>
          </div>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white shrink-0 ml-auto"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10 bg-surface-card/90 backdrop-blur-xl"
          >
            <div className="page-container flex flex-col gap-3 py-4">
              {links.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="py-2 text-neutral-100 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {t(lang, item.labelKey as any)}
                </NavLink>
              ))}
              <Button className="w-full" as={Link} to="/admin" onClick={() => setOpen(false)}>
                Admin
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
