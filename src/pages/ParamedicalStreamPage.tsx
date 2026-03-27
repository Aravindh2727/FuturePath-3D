import { useMemo, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paramedicalCategories } from "../data/paramedicalCategories";
import { paramedicalDepartments } from "../data/paramedicalDepartments";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Seo } from "../components/Seo";
import { cn } from "../utils/cn";
import type { Department } from "../types/content";
import { Badge } from "../components/ui/Badge";
import { FlaskConical, ScanLine, HeartPulse, Activity, Droplets, Brain, Mic, Sparkles, HandHeart, Salad, Layers } from "lucide-react";

type Sort = "trending" | "az";

const pathTypeLabels: Partial<Record<NonNullable<Department["pathType"]>, string>> = {
  degree: "Degree",
  diploma: "Diploma",
  certificate: "Certificate",
  technician: "Technician",
  "allied-health": "Allied Health",
  therapy: "Therapy",
  "support-care": "Support Care",
};

const catIcon: Record<string, ReactNode> = {
  "lab-diagnostics": <FlaskConical size={18} />,
  "radiology-imaging": <ScanLine size={18} />,
  "cardiology-care": <HeartPulse size={18} />,
  "ot-critical-care": <Activity size={18} />,
  "dialysis-renal": <Droplets size={18} />,
  "neurology-brain": <Brain size={18} />,
  "speech-hearing": <Mic size={18} />,
  "dental-paramedical": <Sparkles size={18} />,
  "patient-care": <HandHeart size={18} />,
  "nutrition-support": <Salad size={18} />,
  "specialized-paramedical": <Layers size={18} />,
};

const catShade: Record<string, string> = {
  "lab-diagnostics": "from-sky-500/20 to-cyan-500/10",
  "radiology-imaging": "from-indigo-500/20 to-slate-500/10",
  "cardiology-care": "from-rose-500/20 to-pink-400/10",
  "ot-critical-care": "from-amber-500/20 to-orange-400/10",
  "dialysis-renal": "from-emerald-500/20 to-teal-400/10",
  "neurology-brain": "from-violet-500/20 to-purple-400/10",
  "speech-hearing": "from-lime-500/20 to-emerald-400/10",
  "dental-paramedical": "from-fuchsia-500/20 to-purple-400/10",
  "patient-care": "from-blue-500/20 to-indigo-400/10",
  "nutrition-support": "from-teal-500/20 to-emerald-400/10",
  "specialized-paramedical": "from-slate-500/20 to-slate-300/10",
};

const pathTypeTone: Partial<Record<NonNullable<Department["pathType"]>, string>> = {
  degree: "border-sky-300/50 bg-sky-400/15 text-sky-50",
  diploma: "border-amber-300/50 bg-amber-400/15 text-amber-50",
  certificate: "border-slate-300/60 bg-slate-200/10 text-slate-50",
  technician: "border-indigo-300/50 bg-indigo-400/15 text-indigo-50",
  "allied-health": "border-emerald-300/50 bg-emerald-400/15 text-emerald-50",
  therapy: "border-rose-300/50 bg-rose-400/15 text-rose-50",
  "support-care": "border-blue-300/50 bg-blue-400/15 text-blue-50",
};

const sortDepartments = (sort: Sort) => (a: Department, b: Department) => {
  if (sort === "az") return a.name.localeCompare(b.name);
  const score = (d: Department) => (d.trendingLevel === "high" ? 2 : d.trendingLevel === "medium" ? 1 : 0);
  return score(b) - score(a) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
};

const ParamedicalStreamPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("trending");
  const [pathFilter, setPathFilter] = useState<Department["pathType"] | "all">("all");

  const uniqueDepartments = useMemo(() => {
    const map = new Map<string, Department>();
    paramedicalDepartments.forEach((d) => {
      if (!map.has(d.id)) map.set(d.id, d);
    });
    return Array.from(map.values());
  }, []);

  const activeCategory = categorySlug ?? "";

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return uniqueDepartments
      .filter((d) =>
        activeCategory ? d.category === activeCategory || d.relatedCategories?.includes(activeCategory) : true,
      )
      .filter((d) => (pathFilter === "all" ? true : d.pathType === pathFilter))
      .filter((d) => (q ? d.name.toLowerCase().includes(q) : true))
      .sort(sortDepartments(sort));
  }, [activeCategory, pathFilter, search, sort, uniqueDepartments]);

  const categoryCount = (id: string) =>
    uniqueDepartments.filter((d) => d.category === id || d.relatedCategories?.includes(id)).length;

  const pathTypes = Array.from(
    new Set(uniqueDepartments.map((d) => d.pathType).filter(Boolean) as NonNullable<Department["pathType"]>[]),
  );

  return (
    <div className="page-container py-12 space-y-8">
      <Seo
        title="Paramedical Courses After 12th | Radiology, Lab Tech, OT, Dialysis & More"
        description="Explore allied health diplomas and degrees—radiology, lab technology, OT, dialysis, cardiac care—with eligibility, skills, and job roles."
        canonicalPath="/stream/paramedical"
      />
      <SectionHeader
        eyebrow="Paramedical Stream"
        title="Discover paramedical and technical healthcare careers"
        subtitle="Search, filter by category or path type, and scan concise cards before opening full details."
      />

      <div className="glass-panel rounded-2xl border border-white/5 p-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!activeCategory ? "primary" : "ghost"}
            onClick={() => navigate("/stream/paramedical")}
            className="text-xs px-3 rounded-full"
          >
            All categories
          </Button>
          <div className="flex flex-wrap gap-2">
            {paramedicalCategories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={activeCategory === cat.id ? "primary" : "ghost"}
                className={cn("text-xs px-3 rounded-full", activeCategory === cat.id ? "ring-1 ring-primary/60" : "")}
                onClick={() =>
                  activeCategory === cat.id
                    ? navigate("/stream/paramedical")
                    : navigate(`/stream/paramedical/category/${cat.id}`)
                }
              >
                {cat.title.split(" ")[0]}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search course"
            className="h-10 w-52 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={pathFilter === "all" ? "primary" : "ghost"}
              className="text-xs px-3 rounded-full"
              onClick={() => setPathFilter("all")}
            >
              All paths
            </Button>
            {pathTypes.map((pt) => (
              <Button
                key={pt}
                size="sm"
                variant={pathFilter === pt ? "primary" : "ghost"}
                className="text-xs px-3 rounded-full"
                onClick={() => setPathFilter(pt)}
              >
                {pathTypeLabels[pt] ?? pt}
              </Button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="trending">Trending first</option>
            <option value="az">A - Z</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {paramedicalCategories.map((cat) => (
          <div
            key={cat.id}
            className={cn(
              "rounded-2xl border border-white/5 p-5 flex flex-col gap-3 relative overflow-hidden bg-gradient-to-br transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10",
              catShade[cat.id] ?? "from-white/5 to-white/0",
              activeCategory === cat.id ? "ring-1 ring-primary/60 shadow-glow" : "shadow-inner/20",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-primary">
                {catIcon[cat.id] ?? <Layers size={18} />}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{cat.title}</div>
                <div className="text-xs text-neutral-300">{categoryCount(cat.id)} courses</div>
              </div>
            </div>
            <div className="text-sm text-neutral-200 leading-relaxed">{cat.description}</div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeCategory === cat.id ? "primary" : "ghost"}
                onClick={() => navigate(`/stream/paramedical/category/${cat.id}`)}
                className="text-xs px-3"
              >
                {activeCategory === cat.id ? "Selected" : "Explore"}
              </Button>
              <Button variant="ghost" className="text-xs px-3" onClick={() => navigate(`/stream/paramedical/category/${cat.id}`)}>
                View {categoryCount(cat.id)} paths
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((dept) => (
          <Card
            key={dept.id}
            eyebrow={dept.category?.replace(/-/g, " ").toUpperCase()}
            title={dept.name}
            subtitle={dept.overview}
            actions={
              <div className="flex items-center gap-2">
                {dept.trendingLevel === "high" && (
                  <span className="text-[11px] rounded-full bg-primary/20 text-primary px-2 py-1 border border-primary/30">
                    Trending
                  </span>
                )}
                {dept.pathType ? (
                  <Badge className={cn("px-2 py-1", pathTypeTone[dept.pathType])}>{pathTypeLabels[dept.pathType]}</Badge>
                ) : null}
                <Button as="a" href={`/department/${dept.slug ?? dept.id}`} variant="ghost" className="text-xs px-3">
                  View details
                </Button>
              </div>
            }
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {dept.keySubjects.slice(0, 4).map((subj) => (
                <span
                  key={subj}
                  className="text-xs rounded-full bg-white/5 px-2 py-1 text-neutral-200 border border-white/10"
                >
                  {subj}
                </span>
              ))}
            </div>
            <div className="text-xs text-neutral-400 mb-1">Duration: {dept.duration}</div>
            <div className="flex flex-wrap gap-2">
              {dept.futureScope ? (
                <Badge className="border-white/20 bg-white/5 text-neutral-100">
                  {dept.futureScope.split(".")[0]}
                </Badge>
              ) : null}
              {dept.trendingLevel === "high" ? (
                <Badge className="border-primary/30 bg-primary/15 text-primary">High demand</Badge>
              ) : null}
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="glass-panel rounded-xl border border-white/10 p-6 text-sm text-neutral-300">
            No paramedical paths match your filters. Try a different category or path type.
          </div>
        )}
      </div>
    </div>
  );
};

export default ParamedicalStreamPage;
