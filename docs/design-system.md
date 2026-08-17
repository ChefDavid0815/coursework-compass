# Coursework Compass design foundation

## Philosophy

Calm is the product promise. The interface makes complexity legible through type, space, sequence, and restrained feedback—not decoration. Every surface must explain hierarchy or interaction.

## Typography

Use the platform system stack so Coursework Compass feels native and remains fast. Display type uses tight tracking and leading; body copy stays open and readable; small UI labels gain modest positive tracking. Hierarchy comes from size, weight, and space before color.

## Spacing and layout

The base spacing rhythm is 4px with a deliberately small token set. Page content is capped at 1200px, with responsive gutters from 20px on narrow phones to 48px on desktop. Sections use editorial vertical pacing rather than repeated card grids.

## Color and surfaces

The palette is neutral with a quiet sage accent reserved for progress, status, and focus. Light and dark themes have separately tuned backgrounds, elevated surfaces, separators, and shadows. Translucency is limited to floating navigation and contextual chrome.

## Radius and elevation

Controls are fully rounded or use 12–16px radii. Product surfaces use 20–28px radii to communicate their larger physical scale. Shadows are broad, low-opacity, and paired with a hairline highlight; borders carry most everyday separation.

## Motion

Motion exists for feedback, explanation, and bridging entrances. UI transitions use `--ease-out` and stay below 250ms; the rare landing-page entrance may run longer. Animate transform and opacity, gate hover motion to fine pointers, and replace movement with short opacity changes under reduced motion.

## Interaction

Pressables respond on pointer-down with a subtle `scale(.97)`. Focus is always visible using the semantic focus ring. Controls keep at least a 44px touch target. Disabled states lower contrast without erasing labels.

## Responsive behavior

Layouts recompose rather than merely stack: navigation becomes a contained mobile panel, the hero preview loses perspective, dense milestone content simplifies, and editorial grids become single-column reading flows. Test at 320, 390, 768, 1024, and 1440px.
