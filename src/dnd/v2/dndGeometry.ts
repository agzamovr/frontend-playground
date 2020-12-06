export interface Rect {
  height: number;
  width: number;
  x: number;
  y: number;
  bottom: number;
  left: number;
  right: number;
  top: number;
  area: number;
}

export type Rects = { [x: string]: Rect };

interface IntersectionArea {
  blockId: string;
  intersectionArea: number;
  intersectionRatio: number;
}

const compareIntersections = (a: IntersectionArea, z: IntersectionArea) =>
  z.intersectionRatio - a.intersectionRatio;

export const copyRect = (el: Element): Rect => {
  const rect = el.getBoundingClientRect();
  return {
    height: rect.height,
    width: rect.width,
    x: rect.x,
    y: rect.y,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    area: rect.width * rect.height,
  };
};

export const calcRects = (ids: string[]): Rects => {
  return ids.reduce((acc: Rects, id) => {
    const el = document.querySelector(`[data-block-id='${id}']`);
    if (!el) return acc;
    acc[id] = copyRect(el);
    return acc;
  }, {});
};

const getIntersectionArea = (first: Rect, second: Rect) => {
  const intersects =
    first.left < second.right &&
    first.right > second.left &&
    first.top < second.bottom &&
    first.bottom > second.top;
  if (!intersects) return 0;
  const left = Math.max(first.left, second.left);
  const right = Math.min(first.right, second.right);
  const top = Math.max(first.top, second.top);
  const bottom = Math.min(first.bottom, second.bottom);
  const width = right - left;
  const height = bottom - top;
  return width * height;
};

export const getIntersections = (
  blockId: string,
  x: number,
  y: number,
  rects: Rects
) => {
  const currentRect = rects[blockId];
  const first = {
    ...currentRect,
    x: x,
    y: y,
    left: x,
    top: y,
    right: x + currentRect.width,
    bottom: y + currentRect.height,
  };
  const intersections: IntersectionArea[] = [];
  for (const key in rects) {
    if (blockId !== key) {
      const second = rects[key];
      const intersectionArea = getIntersectionArea(first, second);
      if (intersectionArea) {
        const minArea = Math.min(first.area, second.area);
        const areaRatio = intersectionArea / minArea;
        intersections.push({
          blockId: key,
          intersectionArea,
          intersectionRatio: areaRatio,
        });
      }
    }
  }
  if (intersections) {
    intersections.sort(compareIntersections);
    return intersections[0];
  }
};
