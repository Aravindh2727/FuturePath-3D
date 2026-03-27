import { useMemo, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { diplomaCategories } from "../data/diplomaCategories";
import { diplomaDepartments } from "../data/diplomaDepartments";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Seo } from "../components/Seo";
import { cn } from "../utils/cn";
import type { Department } from "../types/content";
import { Badge } from "../components/ui/Badge";
import { Wrench, Cpu, HeartPulse, Leaf, Palette, Briefcase, UtensilsCrossed, Hammer, Ship, Scale, Zap, Clock3 } from "lucide-react";

type Sort = "trending" | "az";

const pathTypeLabels: Partial<Record<NonNullable<Department["pathType"]>, string>> = {
  diploma: "Diploma",
  polytechnic: "Polytechnic",
  "vocational-diploma": "Vocational",
  "technical-diploma": "Technical",
  "service-diploma": "Service",
  "healthcare-diploma": "Healthcare",
  "creative-diploma": "Creative",
  "trade-skill": "Trade Skill",
};

const entryLabels: Record<NonNullable<Department["entryLevel"]>, string> = {
  "after-10th": "After 10th",
  "after-12th": "After 12th",
  "after-10th-or-12th": "After 10th/12th",
  "after-graduation": "After Graduation",
  "after-diploma": "After Diploma",
  "after-degree": "After Degree",
  "after-postgraduation": "After PG",
  "multiple-entry-levels": "Multiple Entry",
  "postgraduate-specialization": "Postgraduate",
  "short-term-upskilling": "Short-term",
  "working-professional": "Working Pro",
  "flexible-entry": "Flexible Entry",
};

const catIcon: Record<string, ReactNode> = {
  "eng-diploma": <Wrench size={18} />,
  "it-diploma": <Cpu size={18} />,
  "medical-diploma": <HeartPulse size={18} />,
  "agri-diploma": <Leaf size={18} />,
  "creative-diploma": <Palette size={18} />,
  "commerce-diploma": <Briefcase size={18} />,
  "hospitality-diploma": <UtensilsCrossed size={18} />,
  "trade-skill-diploma": <Hammer size={18} />,
  "transport-marine-diploma": <Ship size={18} />,
  "law-social-diploma": <Scale size={18} />,
};

const catShade: Record<string, string> = {
  "eng-diploma": "from-sky-500/20 to-blue-400/10",
  "it-diploma": "from-indigo-500/20 to-violet-400/10",
  "medical-diploma": "from-rose-500/20 to-pink-400/10",
  "agri-diploma": "from-green-500/20 to-lime-300/10",
  "creative-diploma": "from-amber-500/20 to-orange-300/10",
  "commerce-diploma": "from-cyan-500/20 to-teal-400/10",
  "hospitality-diploma": "from-orange-400/20 to-yellow-200/10",
  "trade-skill-diploma": "from-slate-500/20 to-slate-300/10",
  "transport-marine-diploma": "from-blue-500/20 to-cyan-400/10",
  "law-social-diploma": "from-purple-500/20 to-violet-400/10",
};

const pathTone: Partial<Record<NonNullable<Department["pathType"]>, string>> = {
  diploma: "border-emerald-300/50 bg-emerald-500/15 text-emerald-50",
  polytechnic: "border-sky-300/50 bg-sky-500/15 text-sky-50",
  "vocational-diploma": "border-indigo-300/50 bg-indigo-500/15 text-indigo-50",
  "technical-diploma": "border-blue-300/50 bg-blue-500/15 text-blue-50",
  "service-diploma": "border-amber-300/50 bg-amber-500/15 text-amber-50",
  "healthcare-diploma": "border-rose-300/50 bg-rose-500/15 text-rose-50",
  "creative-diploma": "border-pink-300/50 bg-pink-500/15 text-pink-50",
  "trade-skill": "border-lime-300/50 bg-lime-500/15 text-lime-50",
};

const entryTone: Record<NonNullable<Department["entryLevel"]>, string> = {
  "after-10th": "border-amber-300/50 bg-amber-500/15 text-amber-50",
  "after-12th": "border-emerald-300/50 bg-emerald-500/15 text-emerald-50",
  "after-10th-or-12th": "border-cyan-300/50 bg-cyan-500/15 text-cyan-50",
  "after-graduation": "border-slate-300/50 bg-slate-200/10 text-slate-50",
  "after-diploma": "border-teal-300/50 bg-teal-500/15 text-teal-50",
  "after-degree": "border-green-300/50 bg-green-500/15 text-green-50",
  "after-postgraduation": "border-indigo-300/50 bg-indigo-500/15 text-indigo-50",
  "multiple-entry-levels": "border-slate-300/50 bg-slate-500/15 text-slate-50",
  "postgraduate-specialization": "border-indigo-300/50 bg-indigo-500/15 text-indigo-50",
  "short-term-upskilling": "border-slate-300/50 bg-slate-200/10 text-slate-50",
  "working-professional": "border-fuchsia-300/50 bg-fuchsia-500/15 text-fuchsia-50",
  "flexible-entry": "border-purple-300/50 bg-purple-500/15 text-purple-50",
};

const modeTone: Partial<Record<NonNullable<Department["deliveryMode"]>, string>> = {
  practical: "border-lime-300/40 bg-lime-500/15 text-lime-50",
  "workshop-based": "border-orange-300/40 bg-orange-500/15 text-orange-50",
  "skill-based": "border-pink-300/40 bg-pink-500/15 text-pink-50",
};

const sortDepartments = (sort: Sort) => (a: Department, b: Department) => {
  if (sort === "az") return a.name.localeCompare(b.name);
  const score = (d: Department) => (d.trendingLevel === "high" ? 2 : d.trendingLevel === "medium" ? 1 : 0);
  return score(b) - score(a) || (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
};

const uniqueOf = <T,>(arr: (T | undefined | null)[]) => {
  const out: T[] = [];
  arr.forEach((item) => {
    if (item && !out.includes(item)) out.push(item);
  });
  return out;
};

const DiplomaStreamPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("trending");
  const [pathFilter, setPathFilter] = useState<Department["pathType"] | "all">("all");
  const [entryFilter, setEntryFilter] = useState<Department["entryLevel"] | "all">("all");
  const [modeFilter, setModeFilter] = useState<Department["deliveryMode"] | "all">("all");

  const uniqueDepartments: Department[] = useMemo(() => {
    const map: Map<string, Department> = new Map();
    diplomaDepartments.forEach((d) => {
      if (!map.has(d.id)) map.set(d.id, d);
    });
    return Array.from(map.values());
  }, []);

  const activeCategory = categorySlug ?? "";

  const filtered: Department[] = useMemo(() => {
    const q = search.toLowerCase();
    return uniqueDepartments
      .filter((d) =>
        activeCategory ? d.category === activeCategory || d.relatedCategories?.includes(activeCategory) : true,
      )
      .filter((d) => (pathFilter === "all" ? true : d.pathType === pathFilter))
      .filter((d) => (entryFilter === "all" ? true : d.entryLevel === entryFilter))
      .filter((d) => (modeFilter === "all" ? true : d.deliveryMode === modeFilter))
      .filter((d) => (q ? d.name.toLowerCase().includes(q) || d.overview.toLowerCase().includes(q) : true))
      .sort(sortDepartments(sort));
  }, [activeCategory, entryFilter, modeFilter, pathFilter, search, sort, uniqueDepartments]);

  const categoryCount = (id: string) =>
    uniqueDepartments.filter((d) => d.category === id || d.relatedCategories?.includes(id)).length;

  const pathTypes = uniqueOf<NonNullable<Department["pathType"]>>(uniqueDepartments.map((d) => d.pathType));
  const entryLevels = uniqueOf<NonNullable<Department["entryLevel"]>>(uniqueDepartments.map((d) => d.entryLevel));
  const deliveryModes = uniqueOf<NonNullable<Department["deliveryMode"]>>(uniqueDepartments.map((d) => d.deliveryMode));

  return (
    <div className="page-container py-12 space-y-8">
      <Seo
        title="Diploma & Polytechnic Courses | Job-Ready Technical and Professional Tracks"
        description="Find short-term and polytechnic programs in engineering, IT, healthcare, design, hospitality, and skilled trades with clear outcomes and pathways."
        canonicalPath="/stream/diploma-polytechnic"
      />
      <SectionHeader
        eyebrow="Diploma / Polytechnic Stream"
        title="Practical, job-ready diplomas after 10th or 12th"
        subtitle="Filter by category, path type, entry level, or delivery mode. Open concise course details."
      />

      <div className="glass-panel rounded-2xl border border-white/5 p-4 space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs uppercase tracking-wide text-neutral-400">Categories</span>
          <Button
            variant={!activeCategory ? "primary" : "ghost"}
            onClick={() => navigate("/stream/diploma-polytechnic")}
            className="text-xs px-3 rounded-full"
          >
            All
          </Button>
          {diplomaCategories.map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              variant={activeCategory === cat.id ? "primary" : "ghost"}
              className={cn("text-xs px-3 rounded-full", activeCategory === cat.id ? "ring-1 ring-primary/60" : "")}
              onClick={() =>
                activeCategory === cat.id
                  ? navigate("/stream/diploma-polytechnic")
                  : navigate(`/stream/diploma-polytechnic/category/${cat.id}`)
              }
            >
              {cat.title.split(" ")[0]}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-xs uppercase tracking-wide text-neutral-400">Search & Sort</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search diploma course"
            className="h-10 w-64 rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 rounded-full border border-white/10 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="trending">Trending first</option>
            <option value="az">A - Z</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs uppercase tracking-wide text-neutral-400">Path type</span>
          <button
            onClick={() => setPathFilter("all")}
            className={cn(
              "px-3 py-2 rounded-full text-xs border border-white/10 bg-white/5 text-neutral-100 transition hover:border-primary/40",
              pathFilter === "all" ? "border-primary/40 bg-primary/10 text-primary" : "",
            )}
          >
            All
          </button>
          {pathTypes.map((pt) => (
            <button
              key={pt}
              onClick={() => setPathFilter(pt)}
              className={cn(
                "px-3 py-2 rounded-full text-xs border border-white/10 bg-white/5 text-neutral-100 transition hover:border-primary/40",
                pathFilter === pt ? "border-primary/40 bg-primary/10 text-primary" : "",
              )}
            >
              {pathTypeLabels[pt] ?? pt}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs uppercase tracking-wide text-neutral-400">Entry level</span>
          <button
            onClick={() => setEntryFilter("all")}
            className={cn(
              "px-3 py-2 rounded-full text-xs border border-white/10 bg-white/5 text-neutral-100 transition hover:border-primary/40",
              entryFilter === "all" ? "border-primary/40 bg-primary/10 text-primary" : "",
            )}
          >
            All
          </button>
          {entryLevels.map((el) => (
            <button
              key={el}
              onClick={() => setEntryFilter(el)}
              className={cn(
                "px-3 py-2 rounded-full text-xs border border-white/10 bg-white/5 text-neutral-100 transition hover:border-primary/40",
                entryFilter === el ? "border-primary/40 bg-primary/10 text-primary" : "",
              )}
            >
              {entryLabels[el] ?? el}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs uppercase tracking-wide text-neutral-400">Delivery mode</span>
          <button
            onClick={() => setModeFilter("all")}
            className={cn(
              "px-3 py-2 rounded-full text-xs border border-white/10 bg-white/5 text-neutral-100 transition hover:border-primary/40",
              modeFilter === "all" ? "border-primary/40 bg-primary/10 text-primary" : "",
            )}
          >
            All
          </button>
          {deliveryModes.map((dm) => (
            <button
              key={dm}
              onClick={() => setModeFilter(dm)}
              className={cn(
                "px-3 py-2 rounded-full text-xs border border-white/10 bg-white/5 text-neutral-100 transition hover:border-primary/40",
                modeFilter === dm ? "border-primary/40 bg-primary/10 text-primary" : "",
              )}
            >
              {dm}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {diplomaCategories.map((cat) => (
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
                {catIcon[cat.id] ?? <Wrench size={18} />}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{cat.title}</div>
                <div className="text-xs text-neutral-300">{categoryCount(cat.id)} courses</div>
              </div>
            </div>
            <div className="text-sm text-neutral-200 leading-relaxed">{cat.description}</div>
            <div className="flex items-center gap-2">
              <Badge className="text-[11px] border-white/30 bg-white/10 text-white px-2 py-1">
                {categoryCount(cat.id)} paths
              </Badge>
              <Button
                variant={activeCategory === cat.id ? "primary" : "ghost"}
                onClick={() => navigate(`/stream/diploma-polytechnic/category/${cat.id}`)}
                className="text-xs px-3 rounded-full"
              >
                {activeCategory === cat.id ? "Selected" : "Explore"}
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
                {dept.pathType ? (
                  <Badge className={cn("px-2 py-1", pathTone[dept.pathType])}>{pathTypeLabels[dept.pathType] ?? dept.pathType}</Badge>
                ) : null}
                {dept.entryLevel ? (
                  <Badge className={cn("px-2 py-1", entryTone[dept.entryLevel])}>{entryLabels[dept.entryLevel] ?? dept.entryLevel}</Badge>
                ) : null}
                {dept.deliveryMode && dept.deliveryMode !== "full-time" ? (
                  <Badge className={cn("px-2 py-1", modeTone[dept.deliveryMode] ?? "border-white/20 bg-white/5 text-neutral-100")}>
                    {dept.deliveryMode}
                  </Badge>
                ) : null}
                {dept.trendingLevel === "high" && (
                  <span className="inline-flex items-center gap-1 text-[11px] rounded-full bg-primary/20 text-primary px-2 py-1 border border-primary/30">
                    <Zap size={12} /> Trending
                  </span>
                )}
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
            <div className="text-xs text-neutral-400 mb-1 flex items-center gap-1">
              <Clock3 size={12} />
              <span>Duration: {dept.duration}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {dept.futureScope ? (
                <Badge className="border-white/20 bg-white/5 text-neutral-100">
                  {dept.futureScope.split(".")[0] || "Future-ready"}
                </Badge>
              ) : null}
              {dept.trendingLevel === "high" ? (
                <Badge className="border-primary/30 bg-primary/15 text-primary">High demand</Badge>
              ) : null}
              {dept.deliveryMode && dept.deliveryMode !== "full-time" ? (
                <Badge className={cn("border-white/20 bg-white/5 text-neutral-100", modeTone[dept.deliveryMode])}>
                  {dept.deliveryMode}
                </Badge>
              ) : null}
              {dept.entryLevel ? (
                <Badge className="border-white/20 bg-white/5 text-neutral-100">
                  {entryLabels[dept.entryLevel]}
                </Badge>
              ) : null}
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="glass-panel rounded-xl border border-white/10 p-6 text-sm text-neutral-300">
            No diploma/polytechnic paths match your filters. Try another category or path type.
          </div>
        )}
      </div>
    </div>
  );
};

export default DiplomaStreamPage;
