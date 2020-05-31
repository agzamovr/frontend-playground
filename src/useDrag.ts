import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { useDispatch } from "react-redux";
import {
  dndActions,
  GridCellRect,
  RectsRecord,
  Rect,
} from "./redux/dndReducer";

interface IntersectionArea {
  order: string;
  intersectionArea: number;
  areaRatio: number;
}
const releaseEvents = [
  "mouseup",
  "touchend",
  "touchcancel",
  // "scroll",
  "resize",
  "orientationchange",
];
const options = { capture: false, passive: false };
const compareIntersections = (a: IntersectionArea, b: IntersectionArea) =>
  a.areaRatio > b.areaRatio
    ? -1
    : a.areaRatio < b.areaRatio
    ? 1
    : a.order > b.order
    ? -1
    : 0;

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
    el.parentElement.querySelectorAll("div[data-draggable]")
  );
  return nodeList
    .map((elem) => copyRect(elem as HTMLElement))
    .reduce((acc: RectsRecord, current, index) => {
      acc[`${index}`] = current;
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

const getIntersections = (
  currentOrder: string,
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
  for (const key in rects) {
    if (currentOrder !== key && rects.hasOwnProperty(key) && rects[key]) {
      const second = rects[key];
      const intersectionArea =
        first && second && getIntersectionArea(first, second);
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

export const useDrag = (order: string, originalOrder: string) => {
  const dispatch = useDispatch();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const rects = useRef<RectsRecord | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const isIntersectedRef = useRef(false);
  const dragOriginRectRef = useRef<GridCellRect | null>(null);
  const pointerOrigin = useRef({ x: 0, y: 0 });

  const setRect = useCallback(() => {
    if (ref.current) {
      const rect = copyRect(ref.current);
      dispatch(dndActions.setRect({ order: originalOrder, rect }));
    }
  }, [dispatch, originalOrder]);

  const setRef = useCallback((element) => {
    ref.current = element;
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
    style.order = order;
    style.zIndex = "";
    setRect();
  }, [order, setRect]);

  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      rects.current = calcRects(ref.current);
      setStyles();
      pointerOrigin.current.x = clientX;
      pointerOrigin.current.y = clientY;
      setIsGrabbed(true);
      dispatch(dndActions.setPlaceholderOrder(order));
    },
    [dispatch, setStyles, order]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!ref.current) return;
      const style = ref.current.style;
      const x = clientX - pointerOrigin.current.x;
      const y = clientY - pointerOrigin.current.y;

      style.transform = `translate(${x}px,${y}px)`;

      if (!rects.current) return;
      const intersection = getIntersections(
        originalOrder,
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
            sourceOrder: order,
            destinationOrder: secondOrder,
          })
        );
        rects.current = calcRects(ref.current);
      }
    },
    [dispatch, order, originalOrder]
  );

  const releaseListener = useCallback(
    (event: Event) => {
      event.preventDefault();
      setIsGrabbed(false);
      pointerOrigin.current.x = 0;
      pointerOrigin.current.y = 0;
      dragOriginRectRef.current = null;
      resetStyles();
      dispatch(dndActions.setPlaceholderOrder(null));
      rects.current = null;
    },
    [resetStyles, dispatch]
  );

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

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!shouldListenMouseEvent(event)) return;
      startDrag(event.clientX, event.clientY);
    },
    [startDrag]
  );
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      const touch = event.touches[0];
      startDrag(touch.clientX, touch.clientY);
    },
    [startDrag]
  );

  const removeEventListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMoveListener, options);
    window.removeEventListener("touchmove", touchMoveListener, options);
    releaseEvents.forEach((event) =>
      window.removeEventListener(event, releaseListener)
    );
  }, [mouseMoveListener, touchMoveListener, releaseListener]);

  useEffect(() => {
    if (isGrabbed) {
      window.addEventListener("mousemove", mouseMoveListener, options);
      window.addEventListener("touchmove", touchMoveListener, options);
      releaseEvents.forEach((event) =>
        window.addEventListener(event, releaseListener)
      );
    } else {
      removeEventListeners();
    }
    return removeEventListeners;
  }, [
    isGrabbed,
    mouseMoveListener,
    touchMoveListener,
    releaseListener,
    removeEventListeners,
  ]);

  useEffect(() => {
    window.addEventListener("resize", setRect);
    return () => window.removeEventListener("resize", setRect);
  }, [setRect]);

  useEffect(() => {
    if (!ref.current) return;
    const draggable = ref.current;
    draggable.draggable = false;
    draggable.addEventListener("mousedown", handleMouseDown);
    draggable.addEventListener("touchstart", handleTouchStart);
    return () => {
      draggable.removeEventListener("mousedown", handleMouseDown);
      draggable.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleMouseDown, handleTouchStart]);

  useLayoutEffect(() => {
    setRect();
  }, [setRect, order]);

  return {
    ref: setRef,
  };
};
