"use client";

import { Check } from "lucide-react";
import type { ProjectTask } from "../_data/project-store";

type TaskItemProps = {
  task: ProjectTask;
  position: number;
  onCompletionChange: (taskId: string, completed: boolean, skipMotion: boolean) => void;
};

export function TaskItem({ task, position, onCompletionChange }: TaskItemProps) {
  return (
    <li className="task-item" data-completed={task.completed || undefined}>
      <button
        className="task-item__toggle"
        type="button"
        aria-label={`${task.completed ? "Mark incomplete" : "Mark complete"}: ${task.title}`}
        aria-pressed={task.completed}
        onClick={(event) => {
          onCompletionChange(task.id, !task.completed, event.detail === 0);
        }}
      >
        <span className="task-item__glyph" aria-hidden="true"><Check /></span>
      </button>

      <div className="task-item__content">
        <span className="task-item__title"><span>{task.title}</span></span>
        <span className="task-item__meta">
          <span>{task.completed ? "Completed" : `Step ${String(position).padStart(2, "0")}`}</span>
          {task.estimatedTime && <><i aria-hidden="true" /><span>{task.estimatedTime}</span></>}
        </span>
      </div>
    </li>
  );
}
