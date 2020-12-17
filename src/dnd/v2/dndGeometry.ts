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

export interface IntersectionInfo {
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
 * | drag rect ||inersect|| drop rect |
 * ------------===========>------------
 */
const leftIntersect = (dragRect: Rect, dropRect: Rect) =>
  dragRect.left <= dropRect.left && dragRect.right >= dropRect.left;

/**
 * ------------<===========------------
 * | drop rect ||inersect|| drag rect |
 * ------------<===========------------
 */
const rightIntersect = (dragRect: Rect, dropRect: Rect) =>
  dragRect.left <= dropRect.right && dragRect.right >= dropRect.right;

/**
 * --------------
 * | drag rect  |
 * =====vvv======
 * || inersect ||
 * ==============
 * |  drop rect |
 * --------------
 */
const topIntersect = (dragRect: Rect, dropRect: Rect) =>
  dragRect.bottom >= dropRect.top && dragRect.top <= dropRect.top;

/**
 * --------------
 * | drop rect  |
 * ==============
 * || inersect ||
 * =====^^^=======
 * |  drop rect |
 * ---------------
 */
const bottomIntersect = (dragRect: Rect, dropRect: Rect) =>
  dragRect.bottom >= dropRect.bottom && dragRect.top <= dropRect.bottom;

const isIntersected = (dragRect: Rect, dropRect: Rect) =>
  dragRect.left < dropRect.right &&
  dragRect.right > dropRect.left &&
  dragRect.top < dropRect.bottom &&
  dragRect.bottom > dropRect.top;

const getIntersectionArea = (dragRect: Rect, dropRect: Rect) => {
  const intersects = isIntersected(dragRect, dropRect);
  if (!intersects) return 0;
  const left = Math.max(dragRect.left, dropRect.left);
  const right = Math.min(dragRect.right, dropRect.right);
  const top = Math.max(dragRect.top, dropRect.top);
  const bottom = Math.min(dragRect.bottom, dropRect.bottom);
  const width = right - left;
  const height = bottom - top;
  return width * height;
};

const getIntersectionInfo = (
  blockId: string,
  dragRect: Rect,
  dropRect: Rect
): IntersectionInfo | undefined => {
  const intersectionArea = getIntersectionArea(dragRect, dropRect);
  if (intersectionArea) {
    const minArea = Math.min(dragRect.area, dropRect.area);
    const areaRatio = intersectionArea / minArea;
    return {
      blockId,
      intersectionArea,
      intersectionRatio: areaRatio,
      fromLeft: leftIntersect(dragRect, dropRect),
      fromRight: rightIntersect(dragRect, dropRect),
      fromTop: topIntersect(dragRect, dropRect),
      fromBottom: bottomIntersect(dragRect, dropRect),
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
  const dragRect = {
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
    .map((key) => getIntersectionInfo(key, dragRect, rects[key]))
    .filter((i): i is IntersectionInfo => !!i)
    .sort(compareIntersections);
  if (intersections) {
    return intersections[0];
  }
};
