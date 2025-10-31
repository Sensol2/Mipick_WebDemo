export type SectionId = "intro" | "order" | "payment";

const IDS: SectionId[] = ["intro", "order", "payment"];

export function getCurrentSectionIndex(): number {
  // 스크롤 컨테이너 기준으로 현재 섹션 인덱스 계산
  const container = document.getElementById("main-scroll");
  if (!container) return 0;
  const containerTop = container.getBoundingClientRect().top;

  const positions = IDS.map((id) => {
    const el = document.getElementById(id);
    if (!el) return Number.POSITIVE_INFINITY;
    const rect = el.getBoundingClientRect();
    return Math.abs(rect.top - containerTop);
  });
  let idx = 0;
  let min = positions[0];
  for (let i = 1; i < positions.length; i++) {
    if (positions[i] < min) {
      min = positions[i];
      idx = i;
    }
  }
  return idx;
}

export function scrollToIndex(index: number) {
  const clamped = Math.max(0, Math.min(index, IDS.length - 1));
  const id = IDS[clamped];
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PageScrollUp() {
  const idx = getCurrentSectionIndex();
  scrollToIndex(idx - 1);
}

export function PageScrollDown() {
  const idx = getCurrentSectionIndex();
  scrollToIndex(idx + 1);
}
