import { useMemo } from "react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { streams } from "../data/streams";
import { departments } from "../data/departments";
import { Seo } from "../components/Seo";

const StreamsPage = () => {
  const streamWithCounts = useMemo(
    () =>
      streams.map((stream) => ({
        ...stream,
        departmentCount: departments.filter((d) => d.streamId === stream.id).length,
      })),
    [],
  );

  return (
    <div className="page-container py-12 space-y-6">
      <Seo title="Streams | FuturePath 3D" description="Browse all higher-education streams and open departments to compare details." />
      <SectionHeader
        eyebrow="Streams"
        title="All higher-education streams after 12th"
        subtitle="Browse every stream and jump into departments for details on eligibility, subjects, and scope."
      />

      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {streamWithCounts.map((stream) => (
          <Card
            key={stream.id}
            eyebrow={stream.title}
            title={stream.summary}
            actions={
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full">
                <Button
                  as="a"
                  href={
                    stream.id === "engineering"
                      ? "/stream/engineering"
                      : stream.id === "arts-science"
                        ? "/stream/arts-science"
                        : stream.id === "commerce"
                          ? "/stream/commerce"
                          : `/departments?stream=${stream.id}`
                  }
                  variant="ghost"
                  className="text-xs px-3 w-full sm:w-auto"
                >
                  {stream.departmentCount} departments
                </Button>
                {stream.id === "engineering" && (
                  <Button as="a" href="/stream/engineering" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open engineering explorer
                  </Button>
                )}
                {stream.id === "arts-science" && (
                  <Button as="a" href="/stream/arts-science" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open arts & science explorer
                  </Button>
                )}
                {stream.id === "commerce" && (
                  <Button as="a" href="/stream/commerce" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open commerce explorer
                  </Button>
                )}
                {stream.id === "medical" && (
                  <Button as="a" href="/stream/medical" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open medical explorer
                  </Button>
                )}
                {stream.id === "paramedical" && (
                  <Button as="a" href="/stream/paramedical" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open paramedical explorer
                  </Button>
                )}
                {stream.id === "agriculture" && (
                  <Button as="a" href="/stream/agriculture" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open agriculture explorer
                  </Button>
                )}
                {stream.id === "law" && (
                  <Button as="a" href="/stream/law" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open law explorer
                  </Button>
                )}
                {stream.id === "design-media" && (
                  <Button as="a" href="/stream/design-media" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open design & media explorer
                  </Button>
                )}
                {stream.id === "management" && (
                  <Button as="a" href="/stream/management" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open management explorer
                  </Button>
                )}
                {stream.id === "diploma" && (
                  <Button as="a" href="/stream/diploma-polytechnic" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open diploma explorer
                  </Button>
                )}
                {stream.id === "vocational" && (
                  <Button as="a" href="/stream/vocational-skill-based" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open vocational explorer
                  </Button>
                )}
                {stream.id === "government" && (
                  <Button as="a" href="/stream/government-career-paths" variant="primary" className="text-xs px-3 w-full sm:w-auto">
                    Open government careers
                  </Button>
                )}
              </div>
            }
          >
            <div className="flex flex-wrap gap-2">
              {stream.focus.map((tag) => (
                <span
                  key={tag}
                  className="text-xs rounded-full bg-white/5 px-2 py-1 text-neutral-200 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StreamsPage;
