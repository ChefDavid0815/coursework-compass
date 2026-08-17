import { ArrowRight, Check, Clock3 } from "lucide-react";
import { Progress, StatusDot, Surface } from "@/components/foundation/primitives";

const milestones = [
  ["Question", "Complete"],
  ["Research", "In progress"],
  ["First draft", "Next"],
  ["Polish", "Later"],
];

export function ProductPreview() {
  return (
    <div className="product-window" aria-label="Concept preview of an Extended Essay plan">
      <div className="window-bar" aria-hidden="true">
        <span /><span /><span /><strong>Extended Essay</strong><em>Coursework Compass</em>
      </div>
      <Surface className="project-preview">
        <div className="project-preview__header">
          <div>
            <p className="ui-eyebrow">EXTENDED ESSAY · ENGLISH A</p>
            <h2>A clear path to the final draft.</h2>
          </div>
          <div className="deadline-pill"><StatusDot />Due in 24 days</div>
        </div>
        <div className="project-progress-copy"><span>Plan progress</span><strong>32%</strong></div>
        <Progress value={32} label="Extended Essay plan progress" />
        <div className="next-task">
          <span className="next-task__check"><Check /></span>
          <div><small>NEXT · 45 MIN</small><strong>Shape the research question</strong><p>Turn the topic into one answerable line.</p></div>
          <span className="next-task__arrow"><ArrowRight /></span>
        </div>
        <div className="milestone-grid">
          {milestones.map(([name, status], index) => (
            <div className="milestone" data-state={index === 0 ? "done" : index === 1 ? "active" : undefined} key={name}>
              <span>{index + 1}</span><div><strong>{name}</strong><small>{status}</small></div>
            </div>
          ))}
        </div>
      </Surface>
      <div className="today-bar">
        <Clock3 aria-hidden="true" />
        <div><small>TODAY</small><span>Shape the research question</span></div>
        <strong>45 min</strong>
      </div>
    </div>
  );
}
