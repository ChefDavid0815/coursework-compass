"use client";

import { Popover } from "@base-ui/react/popover";
import { Select } from "@base-ui/react/select";
import { DayPicker } from "@daypicker/react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Gauge,
  Pencil,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Progress } from "@/components/foundation/primitives";
import {
  COURSEWORK_TEMPLATES,
  PLANNING_INTENSITIES,
  formatIntensity,
  formatTemplate,
  loadProject,
  saveProject,
  type Project,
} from "../_data/project-store";

function parseDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  const result = new Date(year, month - 1, day);
  return result.getFullYear() === year && result.getMonth() === month - 1 && result.getDate() === day
    ? result
    : undefined;
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function deadlineCopy(value: string): { primary: string; secondary: string; past: boolean } {
  const date = parseDate(value);
  if (!date) return { primary: "No deadline set", secondary: "Choose a date", past: false };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((date.getTime() - today.getTime()) / 86_400_000);
  const primary = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(date);
  if (days < 0) return { primary, secondary: `${Math.abs(days)} day${days === -1 ? "" : "s"} overdue`, past: true };
  if (days === 0) return { primary, secondary: "Due today", past: false };
  if (days === 1) return { primary, secondary: "Due tomorrow", past: false };
  return { primary, secondary: `${days} days remaining`, past: false };
}

function MetadataSelect({
  label,
  value,
  displayValue,
  icon,
  items,
  onChange,
}: {
  label: string;
  value: string;
  displayValue: string;
  icon: React.ReactNode;
  items: readonly { value: string; label: string; description?: string }[];
  onChange: (value: string) => void;
}) {
  const selectItems = items.some((item) => item.value === value)
    ? items
    : [{ value, label: displayValue, description: "Saved by an earlier version" }, ...items];

  return (
    <Select.Root value={value} onValueChange={(next) => next && onChange(next)} items={selectItems}>
      <Select.Trigger className="workspace-meta__control" aria-label={`Change ${label.toLowerCase()}`}>
        <span className="workspace-meta__icon" aria-hidden="true">{icon}</span>
        <span className="workspace-meta__copy"><small>{label}</small><strong>{displayValue}</strong></span>
        <Select.Icon className="workspace-meta__chevron"><ChevronDown aria-hidden="true" /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className="workspace-select__positioner" alignItemWithTrigger={false} sideOffset={8} align="start">
          <Select.Popup className="workspace-select__popup">
            <Select.List>
              {selectItems.map((item) => (
                <Select.Item className="workspace-select__item" key={item.value} value={item.value}>
                  <span><Select.ItemText>{item.label}</Select.ItemText>{item.description && <small>{item.description}</small>}</span>
                  <Select.ItemIndicator><Check aria-hidden="true" /></Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

const subscribeToHydration = () => () => undefined;

export function ProjectWorkspace({ projectId }: { projectId: string }) {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  if (!hydrated) return <main className="workspace-shell" aria-hidden="true" />;
  return <HydratedProjectWorkspace key={projectId} projectId={projectId} />;
}

function HydratedProjectWorkspace({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<Project>(() => loadProject(projectId));
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(project.title);
  const [titleError, setTitleError] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTitle) titleInputRef.current?.focus();
  }, [editingTitle]);

  const actionableTasks = useMemo(() => project.tasks.filter((task) => task.actionable), [project.tasks]);
  const completedCount = actionableTasks.filter((task) => task.completed).length;
  const progress = actionableTasks.length ? Math.round((completedCount / actionableTasks.length) * 100) : 0;
  const nextTask = actionableTasks.find((task) => !task.completed);
  const deadline = deadlineCopy(project.deadline);
  const complete = actionableTasks.length > 0 && completedCount === actionableTasks.length;

  function commit(patch: Partial<Project>, message: string) {
    const next = { ...project, ...patch };
    try {
      saveProject(next);
      setProject(next);
      toast.success(message, { id: "project-metadata-saved" });
      return true;
    } catch {
      toast.error("Couldn’t save that change", { id: "project-metadata-error" });
      return false;
    }
  }

  function beginTitleEdit() {
    setTitleDraft(project.title);
    setTitleError("");
    setEditingTitle(true);
  }

  function cancelTitleEdit() {
    setTitleDraft(project.title);
    setTitleError("");
    setEditingTitle(false);
  }

  function saveTitle() {
    const title = titleDraft.trim();
    if (!title) {
      setTitleError("A project needs a title.");
      return;
    }
    if (title === project.title) {
      cancelTitleEdit();
      return;
    }
    if (commit({ title }, "Project title saved")) {
      setTitleDraft(title);
      setEditingTitle(false);
      setTitleError("");
    }
  }

  return (
    <main className="workspace-shell" data-ready>
      <header className="workspace-chrome">
        <Link className="workspace-brand" href="/" aria-label="Coursework Compass home">
          <BrandMark className="brand__mark" />
          <span>Coursework Compass</span>
        </Link>
        <div className="workspace-chrome__actions">
          <Link className="workspace-back" href="/"><ArrowLeft aria-hidden="true" /> <span>All projects</span></Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="workspace-page">
        <section className="workspace-hero" aria-labelledby="project-title">
          <div className="workspace-hero__context">
            <span className="workspace-status"><i aria-hidden="true" />{complete ? "Complete" : deadline.past ? "Needs attention" : "In progress"}</span>
            <span aria-hidden="true">/</span>
            <span>{formatTemplate(project.courseworkType)}</span>
          </div>

          <div className="workspace-title-wrap" data-editing={editingTitle || undefined}>
            {editingTitle ? (
              <div className="workspace-title-edit">
                <label className="sr-only" htmlFor="project-title-input">Project title</label>
                <input
                  ref={titleInputRef}
                  id="project-title-input"
                  value={titleDraft}
                  onChange={(event) => { setTitleDraft(event.target.value); setTitleError(""); }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") { event.preventDefault(); saveTitle(); }
                    if (event.key === "Escape") { event.preventDefault(); cancelTitleEdit(); }
                  }}
                  aria-invalid={Boolean(titleError)}
                  aria-describedby={titleError ? "project-title-error" : undefined}
                />
                <div className="workspace-title-edit__actions">
                  <button type="button" onClick={saveTitle} aria-label="Save project title"><Check aria-hidden="true" /></button>
                  <button type="button" onClick={cancelTitleEdit} aria-label="Cancel title editing"><X aria-hidden="true" /></button>
                </div>
                {titleError && <p id="project-title-error" role="alert">{titleError}</p>}
              </div>
            ) : (
              <button className="workspace-title" type="button" onClick={beginTitleEdit} aria-label={`Edit project title: ${project.title}`}>
                <h1 id="project-title">{project.title}</h1><Pencil aria-hidden="true" />
              </button>
            )}
          </div>

          <p className="workspace-hero__lede">
            {complete ? "The plan is complete. Take a moment to review what you’ve made." : nextTask ? "The whole project is here. Only the next useful move needs your attention." : "The project details are ready. Add planning tasks in the next phase."}
          </p>

          <div className="workspace-meta" aria-label="Project details">
            <Popover.Root open={dateOpen} onOpenChange={setDateOpen}>
              <Popover.Trigger className="workspace-meta__control" aria-label="Change project deadline">
                <span className="workspace-meta__icon" aria-hidden="true"><CalendarDays /></span>
                <span className="workspace-meta__copy"><small>Deadline</small><strong>{deadline.primary}</strong><em data-past={deadline.past || undefined}>{deadline.secondary}</em></span>
                <ChevronDown className="workspace-meta__chevron" aria-hidden="true" />
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Positioner className="workspace-date__positioner" sideOffset={8} align="start" collisionPadding={16}>
                  <Popover.Popup className="workspace-date__popup">
                    <Popover.Title className="sr-only">Choose project deadline</Popover.Title>
                    <DayPicker
                      mode="single"
                      required
                      selected={parseDate(project.deadline)}
                      defaultMonth={parseDate(project.deadline) ?? new Date()}
                      onSelect={(date) => {
                        if (!date) return;
                        if (commit({ deadline: toDateKey(date) }, "Deadline updated")) setDateOpen(false);
                      }}
                      components={{ Chevron: ({ orientation, ...props }) => orientation === "left" ? <ChevronLeft {...props} /> : <ChevronRight {...props} /> }}
                    />
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>

            <MetadataSelect
              label="Coursework"
              value={project.courseworkType}
              displayValue={formatTemplate(project.courseworkType)}
              icon={<CircleCheck />}
              items={COURSEWORK_TEMPLATES}
              onChange={(courseworkType) => courseworkType !== project.courseworkType && commit({ courseworkType }, "Coursework type updated")}
            />
            <MetadataSelect
              label="Planning intensity"
              value={project.planningIntensity}
              displayValue={formatIntensity(project.planningIntensity)}
              icon={<Gauge />}
              items={PLANNING_INTENSITIES}
              onChange={(planningIntensity) => planningIntensity !== project.planningIntensity && commit({ planningIntensity }, "Planning intensity updated")}
            />
          </div>
        </section>

        <section className="workspace-focus" aria-label="Project progress and next step">
          <div className="workspace-progress">
            <div className="workspace-section-label"><span>Progress</span><strong>{progress}%</strong></div>
            <Progress value={progress} label={`${project.title} progress`} />
            <p>{completedCount} of {actionableTasks.length} planned steps complete</p>
          </div>

          <div className="workspace-next" data-complete={complete || undefined}>
            <p className="ui-eyebrow">{complete ? "Project complete" : "Next"}</p>
            {nextTask ? (
              <><h2>{nextTask.title}</h2><p>First incomplete step in your existing plan.</p></>
            ) : complete ? (
              <><h2>Everything in this plan is complete.</h2><p>The work is done. Review the result, then let the project rest.</p></>
            ) : (
              <><h2>No actionable steps yet.</h2><p>Your project details are safe. Task planning arrives in the next phase.</p></>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
