export const PROJECT_STORAGE_KEY = "coursework-compass.projects.v1";

const STORAGE_KEYS = [
  PROJECT_STORAGE_KEY,
  "coursework-compass-projects",
  "courseworkCompassProjects",
  "projects",
] as const;

export const COURSEWORK_TEMPLATES = [
  { value: "essay", label: "Essay" },
  { value: "research-paper", label: "Research paper" },
  { value: "presentation", label: "Presentation" },
  { value: "lab-report", label: "Lab report" },
  { value: "dissertation", label: "Dissertation" },
] as const;

export const PLANNING_INTENSITIES = [
  { value: "light", label: "Light", description: "A few broad milestones" },
  { value: "balanced", label: "Balanced", description: "A steady, practical plan" },
  { value: "focused", label: "Focused", description: "More detailed checkpoints" },
] as const;

export type ProjectTask = {
  id: string;
  title: string;
  completed: boolean;
  actionable: boolean;
};

export type Project = {
  id: string;
  title: string;
  courseworkType: string;
  deadline: string;
  planningIntensity: string;
  tasks: ProjectTask[];
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asDateString(value: unknown): string | undefined {
  const text = asString(value);
  if (!text) return undefined;
  const datePart = text.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(datePart) ? datePart : text;
}

function readTasks(value: unknown): ProjectTask[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry, index) => {
    if (!isRecord(entry)) return [];
    const title = asString(entry.title) ?? asString(entry.name) ?? asString(entry.text);
    if (!title) return [];
    const status = asString(entry.status)?.toLowerCase();
    return [{
      id: asString(entry.id) ?? `task-${index + 1}`,
      title,
      completed: entry.completed === true || entry.done === true || status === "completed" || status === "done",
      actionable: entry.actionable !== false && status !== "archived" && status !== "cancelled",
    }];
  });
}

function normalizeProject(raw: UnknownRecord, fallbackId: string): Project {
  return {
    id: asString(raw.id) ?? fallbackId,
    title: asString(raw.title) ?? asString(raw.name) ?? "Untitled project",
    courseworkType: asString(raw.courseworkType) ?? asString(raw.templateId) ?? asString(raw.type) ?? "essay",
    deadline: asDateString(raw.deadline) ?? asDateString(raw.dueDate) ?? "",
    planningIntensity: asString(raw.planningIntensity) ?? asString(raw.intensity) ?? "balanced",
    tasks: readTasks(raw.tasks),
  };
}

function parseStoredValue(value: string | null): { projects: UnknownRecord[]; container?: UnknownRecord } | null {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) return { projects: parsed.filter(isRecord) };
    if (isRecord(parsed) && Array.isArray(parsed.projects)) {
      return { projects: parsed.projects.filter(isRecord), container: parsed };
    }
  } catch {
    return null;
  }
  return null;
}

export function createDemoProject(id: string): Project {
  const completed = id === "completed";
  return {
    id,
    title: completed ? "Modernism research essay" : "Urban spaces research essay",
    courseworkType: "research-paper",
    deadline: "2026-09-18",
    planningIntensity: "balanced",
    tasks: [
      { id: "scope", title: "Clarify the research question", completed: true, actionable: true },
      { id: "sources", title: "Annotate three core sources", completed: completed, actionable: true },
      { id: "outline", title: "Shape the argument outline", completed: completed, actionable: true },
      { id: "draft", title: "Write the first section", completed: completed, actionable: true },
    ],
  };
}

export function loadProject(id: string): Project {
  for (const key of STORAGE_KEYS) {
    const stored = parseStoredValue(window.localStorage.getItem(key));
    const raw = stored?.projects.find((project) => String(project.id) === id);
    if (raw) return normalizeProject(raw, id);
  }
  return createDemoProject(id);
}

export function saveProject(project: Project): void {
  for (const key of STORAGE_KEYS) {
    const stored = parseStoredValue(window.localStorage.getItem(key));
    if (!stored) continue;
    const index = stored.projects.findIndex((candidate) => String(candidate.id) === project.id);
    if (index < 0) continue;
    const previous = stored.projects[index];
    stored.projects[index] = {
      ...previous,
      id: project.id,
      title: project.title,
      courseworkType: project.courseworkType,
      deadline: project.deadline,
      planningIntensity: project.planningIntensity,
    };
    const next = stored.container ? { ...stored.container, projects: stored.projects } : stored.projects;
    window.localStorage.setItem(key, JSON.stringify(next));
    return;
  }

  window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify([project]));
}

export function formatTemplate(value: string): string {
  return COURSEWORK_TEMPLATES.find((item) => item.value === value)?.label ?? "Legacy coursework";
}

export function formatIntensity(value: string): string {
  return PLANNING_INTENSITIES.find((item) => item.value === value)?.label ?? "Balanced";
}
