import { GridCellRect, RectsRecord, Rect } from "dnd/v1/redux/dndReducer";

interface IntersectionArea {
  order: number;
  intersectionArea: number;
  areaRatio: number;
}

const compareIntersections = (a: IntersectionArea, z: IntersectionArea) =>
  z.areaRatio - a.areaRatio;

export const copyRect = (el: HTMLElement): GridCellRect => {
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
    order: parseInt(el.style.order),
    area: rect.width * rect.height,
    gridColumnStart: el.style.gridColumnStart,
    gridColumn: el.style.gridColumn,
    gridColumnEnd: el.style.gridColumnEnd,
    gridRow: el.style.gridRow,
    gridRowStart: el.style.gridRowStart,
    gridRowEnd: el.style.gridRowEnd,
  };
};

export const calcRects = (el: HTMLElement | null) => {
  if (!el || !el.parentElement) return null;
  const nodeList = Array.from(
    el.parentElement.querySelectorAll("[data-dnd-draggable]")
  );
  return nodeList
    .map((elem) => copyRect(elem as HTMLElement))
    .sort((a, z) => a.order - z.order);
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
  currentOrder: number,
  currentRect: GridCellRect | null,
  shiftX: number,
  shiftY: number,
  rects: RectsRecord
) => {
  if (!currentRect) return;
  const first = {
    ...currentRect,
    x: currentRect.x + shiftX,
    y: currentRect.y + shiftY,
    left: currentRect.left + shiftX,
    top: currentRect.top + shiftY,
    right: currentRect.right + shiftX,
    bottom: currentRect.bottom + shiftY,
  };
  const intersections: IntersectionArea[] = [];
  for (let key = 0; key < rects.length; key++) {
    if (currentOrder !== key) {
      const second = rects[key];
      const intersectionArea = getIntersectionArea(first, second);
      if (intersectionArea) {
        const minArea = Math.min(first.area, second.area);
        const areaRatio = intersectionArea / minArea;
        intersections.push({
          order: key,
          intersectionArea,
          areaRatio,
        });
      }
    }
  }
  if (intersections) {
    intersections.sort(compareIntersections);
    return intersections[0];
  }
};
