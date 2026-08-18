import type { Metadata } from "next";
import { ProjectWorkspace } from "./project-workspace";

export const metadata: Metadata = {
  title: "Project workspace — Coursework Compass",
  description: "Review project progress and keep the plan's essential details current.",
};

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return <ProjectWorkspace projectId={projectId} />;
}
