import { motion } from "framer-motion";
import { ArrowRight, Brain, ChartSpline, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "../components/ui/Button";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card } from "../components/ui/Card";
import { streams } from "../data/streams";
import { departments } from "../data/departments";
import { jobs } from "../data/jobs";
import { useThemeStore } from "../store/useThemeStore";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useLanguageStore } from "../store/useLanguageStore";
import { localizeStream } from "../utils/i18n";
import { Seo } from "../components/Seo";
import { mapStreamToSlug } from "./StreamsPage";
import { Link } from "react-router-dom";

const whyItems = [
  {
    title: "See your path",
    icon: Compass,
    text: "Spatial visualizations and guided journeys help you pick the right stream after 12th.",
  },
  {
    title: "Build confidently",
    icon: ShieldCheck,
    text: "Secure, Firebase-ready foundation with real-time collaboration baked in.",
  },
  {
    title: "Stay future-proof",
    icon: ChartSpline,
    text: "Keeps pace with emerging careers through modular content and 3D labs.",
  },
];

const HomePage = () => {
  const accent = useThemeStore((state) => state.accent);
  const toggleAccent = useThemeStore((state) => state.toggleAccent);
  const accentGradient = accent === "aqua" ? "from-primary to-accent" : "from-accent to-primary";
  const favorites = useFavoritesStore();
  const lang = useLanguageStore((s) => s.lang);
  const totalStreams = streams.length;
  const totalCourses = new Set(departments.map((d) => d.id)).size;

  return (
    <div className="page-container py-14 md:py-16 space-y-16">
      <Seo
        title="FuturePath 3D | Career Guidance After 12th with Courses, Colleges & Jobs"
        description="Discover courses, colleges, and career paths after 12th across engineering, medical, arts, commerce, government, diplomas, and more with guided tools and comparisons."
        canonicalPath="/"
      />
      {/* Hero */}
      <section className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm text-primary shadow-glow">
            <Sparkles size={16} />
            Premium guidance after 12th
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white break-words">FuturePath 3D</h1>
          <p className="text-neutral-300 max-w-xl">
            Explore your higher studies and future careers after 12th in a visual interactive way. Compare
            courses, simulate labs, and get parent-ready insights.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full">
            <Button className={`bg-gradient-to-r ${accentGradient} w-full sm:w-auto`} as="a" href="/streams">
              Streams
            </Button>
            <Button variant="outline" as="a" href="/career-quiz" className="w-full sm:w-auto">
              Take Career Quiz
            </Button>
            <Button variant="ghost" as="a" href="/compare-courses" className="w-full sm:w-auto">
              Compare Courses
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="ghost" className="px-3 text-xs" onClick={toggleAccent}>
              Toggle Accent ({accent})
            </Button>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Animated page transitions & smooth UI
            </div>
          </div>
        </div>

        <motion.div
          className="relative glass-panel rounded-2xl p-6 overflow-hidden min-w-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="absolute -right-8 -top-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-accent/25 blur-3xl" />
          <div className="relative grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-surface-muted/80 p-5 shadow-lg">
              <div className="text-[11px] uppercase tracking-[0.24em] text-primary/80 mb-2">Streams</div>
              <div className="flex items-baseline justify-between">
                <div className="text-4xl font-semibold text-white leading-none">{totalStreams}</div>
                <span className="text-xs text-neutral-400">Main paths</span>
              </div>
              <p className="text-sm text-neutral-400 mt-2">Explore immersive pathways across every major stream.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-surface-muted/80 p-5 shadow-lg">
              <div className="text-[11px] uppercase tracking-[0.24em] text-primary/80 mb-2">Courses</div>
              <div className="flex items-baseline justify-between">
                <div className="text-4xl font-semibold text-white leading-none">{totalCourses}</div>
                <span className="text-xs text-neutral-400">Unique depts</span>
              </div>
              <p className="text-sm text-neutral-400 mt-2">Compare departments side by side to plan your journey.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why it helps */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Why FuturePath 3D"
          title="Clarity, confidence, and collaboration for students & parents."
        />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {whyItems.map(({ title, text, icon: Icon }) => (
            <Card
              key={title}
              title={title}
              icon={<Icon size={18} />}
              className="hover:-translate-y-1 transition-transform"
            >
              {text}
            </Card>
          ))}
        </div>
      </section>

      {/* Streams preview */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Streams"
          title="Choose a pathway designed for immersive learning."
          subtitle="Swap these previews for your API-fed data or CMS content."
        />
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
          {streams.slice(0, 3).map((stream) => {
            const ls = localizeStream(stream.id, lang)!;
            return (
            <Card
              key={stream.id}
              eyebrow={stream.id.toUpperCase()}
              title={ls.title}
              actions={
                <div className="flex gap-2">
                  <Button as={Link} to={`/stream/${mapStreamToSlug(stream.id)}`} variant="ghost" className="text-xs px-3">
                    View details
                  </Button>
                  <Button
                    variant={favorites.isSaved(stream.id) ? "outline" : "ghost"}
                    className="text-xs px-3"
                    onClick={() =>
                      favorites.toggle({
                        id: stream.id,
                        type: "stream",
                        name: ls.title,
                        description: ls.summary,
                      })
                    }
                  >
                    {favorites.isSaved(stream.id) ? "Saved" : "Save"}
                  </Button>
                </div>
              }
            >
              <div className="space-y-2">
                <p>{ls.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {ls.focus.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs rounded-full bg-white/5 px-2 py-1 text-neutral-200 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          )})}
        </div>
      </section>

      {/* Future jobs preview */}
      <section className="space-y-6">
        <SectionHeader
          eyebrow="Future jobs"
          title="Careers you can grow into."
          subtitle="Connect hiring partner data or labor insights here."
        />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {jobs.slice(0, 3).map((job) => (
            <Card
              key={job.title}
              title={job.title}
              icon={<Brain size={18} />}
              actions={<span className="text-xs text-primary">{job.outlook}</span>}
            >
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs rounded-full bg-white/5 px-2 py-1 text-neutral-200 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="glass-panel rounded-2xl border border-white/10 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-white">Start building your path today.</h3>
          <p className="text-neutral-300 text-sm max-w-xl">
            Swap placeholders with your React Three Fiber scenes and Firebase collections without rebuilding
            the UI stack.
          </p>
        </div>
        <div className="flex gap-3">
          <Button as="a" href="/streams">
            Browse streams
          </Button>
          <Button variant="outline" as="a" href="/about">
            Learn more
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
