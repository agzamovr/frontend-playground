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

interface IntersectionInfo {
  blockId: string;
  intersectionArea: number;
  intersectionRatio: number;
  fromLeft: boolean;
  fromRight: boolean;
  fromTop: boolean;
  fromBottom: boolean;
}

const compareIntersections = (a: IntersectionInfo, z: IntersectionInfo) =>
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

export const calcRects = (selectedId: string, ids: string[]): Rects => {
  const childNodeList = document.querySelectorAll(
    `[data-block-id="${selectedId}"] [data-block-id]`
  );
  const childIds = Array.from(childNodeList).map((el) =>
    el.getAttribute("data-block-id")
  );
  return ids
    .filter((id) => !childIds.includes(id))
    .reduce((acc: Rects, id) => {
      const el = document.querySelector(
        `[data-block-id='${id}'] [data-droppable="true"]`
      );
      if (!el) return acc;
      acc[id] = copyRect(el);
      return acc;
    }, {});
};

/**
 * ------------===========>------------
 * | drag rect | inersect | drop rect |
 * ------------===========>------------
 */
const leftIntersect = (first: Rect, second: Rect) =>
  first.left <= second.left && first.right >= second.left;

/**
 * ------------<===========------------
 * | drop rect | inersect | drag rect |
 * ------------<===========------------
 */
const rightIntersect = (first: Rect, second: Rect) =>
  first.left <= second.right && first.right >= second.right;

/**
 * --------------
 * | drag rect  |
 * =====vvv======
 * || inersect ||
 * ==============
 * |  drop rect |
 * --------------
 */
const topIntersect = (first: Rect, second: Rect) =>
  first.bottom >= second.top && first.top <= second.top;

/**
 * --------------
 * | drop rect  |
 * ==============
 * || inersect ||
 * =====^^^=======
 * |  drop rect |
 * ---------------
 */
const bottomIntersect = (first: Rect, second: Rect) =>
  first.bottom >= second.bottom && first.top <= second.bottom;

const isIntersected = (first: Rect, second: Rect) =>
  first.left < second.right &&
  first.right > second.left &&
  first.top < second.bottom &&
  first.bottom > second.top;

const getIntersectionArea = (first: Rect, second: Rect) => {
  const intersects = isIntersected(first, second);
  if (!intersects) return 0;
  const left = Math.max(first.left, second.left);
  const right = Math.min(first.right, second.right);
  const top = Math.max(first.top, second.top);
  const bottom = Math.min(first.bottom, second.bottom);
  const width = right - left;
  const height = bottom - top;
  return width * height;
};

const getIntersectionInfo = (
  blockId: string,
  first: Rect,
  second: Rect
): IntersectionInfo | undefined => {
  const intersectionArea = getIntersectionArea(first, second);
  if (intersectionArea) {
    const minArea = Math.min(first.area, second.area);
    const areaRatio = intersectionArea / minArea;
    return {
      blockId,
      intersectionArea,
      intersectionRatio: areaRatio,
      fromLeft: leftIntersect(first, second),
      fromRight: rightIntersect(first, second),
      fromTop: topIntersect(first, second),
      fromBottom: bottomIntersect(first, second),
    };
  }
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
  const intersections: IntersectionInfo[] = Object.keys(rects)
    .filter((key) => key !== blockId)
    .map((key) => getIntersectionInfo(key, first, rects[key]))
    .filter((i): i is IntersectionInfo => !!i)
    .sort(compareIntersections);
  if (intersections) {
    return intersections[0];
  }
};
