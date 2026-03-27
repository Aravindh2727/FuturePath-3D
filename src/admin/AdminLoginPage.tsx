import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Phone, Globe, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Seo } from "../components/seo/Seo";

const AdminLoginPage = () => {
  const auth = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    const target = auth.user ? "/admin" : "/";
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(target, { replace: true });
  };
  const whatsappLink = `https://wa.me/9342695097?text=${encodeURIComponent(
    "Hi Aravindh V, I have an idea to share about the project.",
  )}`;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signIn(email, password);
  };

  // Once signed in, send the user to the dashboard.
  useEffect(() => {
    if (auth.user) {
      navigate("/admin", { replace: true });
    }
  }, [auth.user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 md:pt-28 pb-10">
      <Seo
        title="Admin Login | FuturePath 3D Content Dashboard"
        description="Secure admin access to manage FuturePath 3D content, data, and updates."
        canonicalPath="/admin"
        noIndex
      />
      <div className="page-container max-w-2xl space-y-8">
        <div className="flex">
          <Button
            type="button"
            variant="ghost"
            className="px-3 py-2 text-sm"
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
        <SectionHeader
          eyebrow="Admin"
          title="Admin login"
          subtitle="Sign in to manage FuturePath 3D data. Works with Firebase Auth; falls back to mock session if Firebase is not configured."
          align="left"
        />
        <form onSubmit={onSubmit} className="glass-panel rounded-2xl border border-white/10 p-6 space-y-4 max-w-xl mx-auto">
          <label className="text-sm text-neutral-200 flex flex-col gap-1">
            Email
            <input
              type="email"
              required
              className="h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="text-sm text-neutral-200 flex flex-col gap-1">
            Password
            <input
              type="password"
              required
              className="h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {auth.error ? <div className="text-xs text-rose-300">{auth.error}</div> : null}
          <Button type="submit" className="w-full">
            {auth.loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <Card
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-surface-card/60 to-black/50 backdrop-blur-2xl shadow-[0_20px_80px_-40px_rgba(0,0,0,0.8)] p-7 sm:p-8 space-y-8"
        >
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Developer Details</h3>
            <p className="text-sm text-neutral-300">
              Any idea or update suggestion? Share it on WhatsApp and contact the developer.
            </p>
          </div>

          {/* Profile block */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner/10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-primary to-accent">
              <img src="/av-logo.jpg" alt="Aravindh V logo" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="leading-tight space-y-1">
              <div className="text-base font-semibold text-white">Aravindh V</div>
              <div className="text-xs text-primary font-semibold">Student Developer</div>
              <div className="text-[11px] text-neutral-300">B.Sc Computer Science (AI & ML)</div>
            </div>
          </div><br />

          {/* Contact info */}
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.16em] text-neutral-400">Contact Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:border-primary/40 transition">
                <Phone size={18} className="text-primary shrink-0 mt-0.5" />
                <div className="leading-tight space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">WhatsApp</div>
                  <div className="text-sm font-semibold text-white">9342695097</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:border-primary/40 transition">
                <Globe size={18} className="text-primary shrink-0 mt-0.5" />
                <div className="leading-tight space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">Portfolio</div>
                  <a
                    href="https://aravindh2727.github.io/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-primary hover:underline break-all"
                  >
                    aravindh2727.github.io
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-5 border-t border-white/10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-neutral-400">Quick actions</div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                <Button as="a" href={whatsappLink} target="_blank" rel="noreferrer" className="text-sm w-full sm:w-auto px-6 py-3">
                  Contact on WhatsApp
                </Button>
                <Button
                  as="a"
                  href="https://aravindh2727.github.io/"
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                  className="text-sm w-full sm:w-auto px-6 py-3"
                >
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
