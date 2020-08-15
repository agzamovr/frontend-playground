import { useRef, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  dndActions,
  GridCellRect,
  RectsRecord,
  Rect,
} from "./redux/dndReducer";
import { getViewportIntersection } from "./scroll";

interface IntersectionArea {
  order: number;
  intersectionArea: number;
  areaRatio: number;
}
const releaseEvents = [
  "mouseup",
  "touchend",
  "touchcancel",
  "resize",
  "orientationchange",
] as const;
const options = { capture: false, passive: false } as const;
const compareIntersections = (a: IntersectionArea, z: IntersectionArea) =>
  z.areaRatio - a.areaRatio;

const shouldListenMouseEvent = (event: MouseEvent) =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !event.ctrlKey &&
  !event.metaKey &&
  !event.shiftKey &&
  !event.altKey;

const copyRect = (el: HTMLElement): GridCellRect => {
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

const calcRects = (el: HTMLElement | null) => {
  if (!el || !el.parentElement) return null;
  const nodeList = Array.from(
    el.parentElement.querySelectorAll("div[data-dnd-draggable]")
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

const getIntersections = (
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

export const useDragController = () => {
  const dispatch = useDispatch();
  const order = useRef<number>(0);
  const rects = useRef<RectsRecord | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const isIntersectedRef = useRef(false);
  const dragOriginRectRef = useRef<GridCellRect | null>(null);
  const pointerOrigin = useRef({ x: 0, y: 0 });
  const pointerPosition = useRef({ x: 0, y: 0 });

  const setRef = useCallback((element: HTMLElement) => {
    ref.current = element.closest("[data-dnd-draggable]") as HTMLElement;
    order.current = parseInt(ref.current.style.order);
  }, []);

  const setStyles = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = copyRect(el);
    dragOriginRectRef.current = rect;
    const style = el.style;
    style.boxSizing = "border-box";
    style.position = "fixed";
    style.width = rect.width + "px";
    style.height = rect.height + "px";
    style.top = rect.y + "px";
    style.left = rect.x + "px";
    style.pointerEvents = "none";
    style.order = "";
    style.zIndex = "5000";
  }, []);

  const resetStyles = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const style = el.style;
    style.boxSizing = "";
    style.position = "";
    style.width = "";
    style.height = "";
    style.top = "";
    style.left = "";
    style.transform = "";
    style.pointerEvents = "";
    style.order = `${order.current}`;
    style.zIndex = "";
  }, []);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!ref.current) return;
      const style = ref.current.style;
      pointerPosition.current.x = clientX;
      pointerPosition.current.y = clientY;
      const x = pointerPosition.current.x - pointerOrigin.current.x;
      const y = pointerPosition.current.y - pointerOrigin.current.y;

      style.transform = `translate(${x}px,${y}px)`;

      if (!rects.current) return;
      const intersection = getIntersections(
        order.current,
        dragOriginRectRef.current,
        x,
        y,
        rects.current
      );
      if (!intersection || intersection.areaRatio < 0.5)
        isIntersectedRef.current = false;
      if (
        !isIntersectedRef.current &&
        intersection &&
        intersection.areaRatio >= 0.5
      ) {
        isIntersectedRef.current = true;
        const { order: secondOrder } = intersection;
        dispatch(
          dndActions.switchElementsOrder({
            sourceOrder: order.current,
            destinationOrder: secondOrder,
          })
        );
        order.current = secondOrder;
        rects.current = calcRects(ref.current);
      }
      requestAnimationFrame(() => {
        const vi = getViewportIntersection(dragOriginRectRef.current, x, y);
        if (vi && (vi.bottom < 0 || vi.top < 0)) {
          const y = vi.bottom < 0 ? -vi.bottom : vi.top;
          window.scrollBy({ left: 0, top: y, behavior: "smooth" });
        }
      });
    },
    [dispatch]
  );

  const scrollListener = useCallback(() => {
    handleMove(pointerPosition.current.x, pointerPosition.current.y);
  }, [handleMove]);

  const mouseMoveListener = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return;
      event.preventDefault();
      handleMove(event.clientX, event.clientY);
    },
    [handleMove]
  );

  const touchMoveListener = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [handleMove]
  );

  const removeEventListeners = useCallback(() => {
    window.removeEventListener("scroll", scrollListener, options);
    window.removeEventListener("mousemove", mouseMoveListener, options);
    window.removeEventListener("touchmove", touchMoveListener, options);
  }, [scrollListener, mouseMoveListener, touchMoveListener]);

  const releaseListener = useCallback(() => {
    removeEventListeners();
    releaseEvents.forEach((event) =>
      window.removeEventListener(event, releaseListener)
    );
    pointerOrigin.current.x = 0;
    pointerOrigin.current.y = 0;
    pointerPosition.current.x = 0;
    pointerPosition.current.y = 0;
    dragOriginRectRef.current = null;
    resetStyles();
    rects.current = null;
    dispatch(dndActions.dragEnd());
  }, [resetStyles, dispatch, removeEventListeners]);

  const addEventListeners = useCallback(() => {
    window.addEventListener("scroll", scrollListener, options);
    window.addEventListener("mousemove", mouseMoveListener, options);
    window.addEventListener("touchmove", touchMoveListener, options);
    releaseEvents.forEach((event) =>
      window.addEventListener(event, releaseListener)
    );
  }, [scrollListener, mouseMoveListener, touchMoveListener, releaseListener]);

  const startDrag = useCallback(
    (element: HTMLElement, clientX: number, clientY: number) => {
      setRef(element);
      rects.current = calcRects(ref.current);
      setStyles();
      pointerOrigin.current.x = clientX;
      pointerOrigin.current.y = clientY;
      addEventListeners();
      dispatch(
        dndActions.dragStart({
          order: order.current,
          placeholderRect: dragOriginRectRef.current,
        })
      );
    },
    [dispatch, addEventListeners, setRef, setStyles]
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!shouldListenMouseEvent(event)) return;
      const element = event.target as HTMLElement;
      const isDragHandle = element.hasAttribute("data-dnd-drag-handle");
      if (!isDragHandle) return;
      event.preventDefault();
      event.stopPropagation();
      startDrag(element, event.clientX, event.clientY);
    },
    [startDrag]
  );
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      const isDragHandle = element.hasAttribute("data-dnd-drag-handle");
      if (!isDragHandle) return;
      const touch = event.touches[0];
      startDrag(element, touch.clientX, touch.clientY);
    },
    [startDrag]
  );

  useEffect(() => {
    return removeEventListeners;
  }, [removeEventListeners]);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleMouseDown, handleTouchStart]);
};
