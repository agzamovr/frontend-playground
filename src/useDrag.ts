import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dndActions,
  GridCellRect,
  RectsRecord,
  Rect,
} from "./redux/dndReducer";
import { Store } from "./redux/store";

interface IntersectionArea {
  order: number;
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
  for (const key in rects) {
    if (
      currentOrder.toString() !== key &&
      rects.hasOwnProperty(key) &&
      rects[key]
    ) {
      const second = rects[key];
      const intersectionArea =
        first && second && getIntersectionArea(first, second);
      if (intersectionArea) {
        const minArea = Math.min(first.area, second.area);
        const areaRatio = intersectionArea / minArea;
        intersections.push({
          order: parseInt(key),
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

export const useDrag = (index: number) => {
  const dispatch = useDispatch();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const { elementsOrder, rects } = useSelector(
    ({ draggables }: Store) => draggables
  );
  const order = elementsOrder[index];
  const ref = useRef<HTMLElement | null>(null);
  const isIntersectedRef = useRef(false);
  const dragOriginRectRef = useRef<GridCellRect | null>(null);
  const pointerOrigin = useRef({ x: 0, y: 0 });

  const setRect = useCallback(() => {
    if (ref.current) {
      const rect = copyRect(ref.current);
      dispatch(dndActions.setRect({ order, rect }));
    }
  }, [dispatch, order]);

  const setRef = useCallback((element) => {
    ref.current = element;
  }, []);

  const setStyles = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
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
    style.order = `${index}`;
    style.zIndex = "";
    setRect();
  }, [index, setRect]);

  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      setStyles();
      pointerOrigin.current.x = clientX;
      pointerOrigin.current.y = clientY;
      setIsGrabbed(true);
      dragOriginRectRef.current = rects[order];
      dispatch(dndActions.setPlaceholderOrder(index));
    },
    [dispatch, setStyles, order, rects, index]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!ref.current) return;
      const style = ref.current.style;
      const x = clientX - pointerOrigin.current.x;
      const y = clientY - pointerOrigin.current.y;

      style.transform = `translate(${x}px,${y}px)`;

      const intersection = getIntersections(
        order,
        dragOriginRectRef.current,
        x,
        y,
        rects
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
        const secondIndex = elementsOrder.findIndex((e) => e === secondOrder);
        const newElementsOrder = [...elementsOrder];
        newElementsOrder[index] = elementsOrder[secondIndex];
        newElementsOrder[secondIndex] = elementsOrder[index];
        dispatch(
          dndActions.setElementsOrder({
            placeholderOrder: secondIndex,
            elementsOrder: newElementsOrder,
          })
        );
      }
    },
    [dispatch, elementsOrder, index, order, rects]
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

  useLayoutEffect(() => {
    window.addEventListener("resize", setRect);
    return () => window.removeEventListener("resize", setRect);
  }, [setRect]);

  useLayoutEffect(() => {
    if (ref.current) {
      const draggable = ref.current;
      draggable.draggable = false;
      draggable.addEventListener("mousedown", handleMouseDown);
      draggable.addEventListener("touchstart", handleTouchStart);
    }
    return () => {
      if (ref.current) {
        const draggable = ref.current;
        draggable.removeEventListener("mousedown", handleMouseDown);
        draggable.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, [handleMouseDown, handleTouchStart]);

  useLayoutEffect(() => {
    setRect();
  }, [setRect, elementsOrder, index]);

  return {
    ref: setRef,
  };
};
