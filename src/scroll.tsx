import { Rect } from "./redux/dndReducer";

const getViewportRect = (): Rect => {
  const vw = document.documentElement.clientWidth || 0;
  const vh = document.documentElement.clientHeight || 0;
  return {
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: vw,
    bottom: vh,
    width: vw,
    height: vh,
    area: vw * vh,
  };
};
export const getViewportIntersection = (
  currentRect: Rect | null,
  shiftX: number,
  shiftY: number
) => {
  if (!currentRect) return;
  const target = {
    ...currentRect,
    x: currentRect.x + shiftX,
    y: currentRect.y + shiftY,
    left: currentRect.left + shiftX,
    top: currentRect.top + shiftY,
    right: currentRect.right + shiftX,
    bottom: currentRect.bottom + shiftY,
  };

  const viewport = getViewportRect();
  //getIntersectionArea(viewport, target) / target.area;
  return {
    left: target.left,
    right: viewport.right - target.right,
    top: target.top,
    bottom: viewport.bottom - target.bottom,
  };
};
