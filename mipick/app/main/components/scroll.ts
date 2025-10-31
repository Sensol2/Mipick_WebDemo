export type SectionId = "intro" | "order" | "payment";

const IDS: SectionId[] = ["intro", "order", "payment"];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getRootRect() {
  const container = document.getElementById("main-scroll");
  if (container) return container.getBoundingClientRect();
  // 컨테이너가 없으면 뷰포트 기준
  return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight, right: 0, bottom: 0 } as DOMRect;
}

export function getCurrentSectionIndex(): number {
  const root = getRootRect();
  const rootCenterY = root.top + root.height / 2;

  let bestIdx = 0;
  let bestDist = Number.POSITIVE_INFINITY;

  IDS.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const elCenterY = r.top + r.height / 2;
    const dist = Math.abs(elCenterY - rootCenterY);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  });

  return bestIdx;
}

export function scrollToIndex(index: number) {
  const clamped = clamp(index, 0, IDS.length - 1);
  const targetId = IDS[clamped];
  const el = document.getElementById(targetId);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PageScrollUp() {
  const curr = getCurrentSectionIndex();
  scrollToIndex(curr - 1);
}

export function PageScrollDown() {
  const curr = getCurrentSectionIndex();
  scrollToIndex(curr + 1);
}