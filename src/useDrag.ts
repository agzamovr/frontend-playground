import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { dndActions, Rect, RectsRecord } from "./redux/dndReducer";
import { Store } from "./redux/store";

interface IntersectionArea {
  order: number;
  intersectionArea: number;
  areaRatio: number;
}

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

const copyRect = (rect: DOMRect): Rect =>
  rect && {
    height: rect.height,
    width: rect.width,
    x: rect.x,
    y: rect.y,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    top: rect.top,
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
  currentRect: Rect | null,
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
        const areaRatio = intersectionArea / (second.width * second.height);
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
const setPlaceholder = (
  el: HTMLElement | null,
  placeholderEl: HTMLElement | null,
  placeholderOrder: number | null
) => {
  if (!el || !placeholderEl) return;
  const rect = el.getBoundingClientRect();
  const placeholderStyle = placeholderEl.style;
  if (placeholderOrder !== null) {
    placeholderStyle.width = rect.width + "px";
    placeholderStyle.height = rect.height + "px";
    placeholderStyle.display = "block";
    placeholderStyle.order = placeholderOrder.toString();
  } else {
    placeholderStyle.width = "";
    placeholderStyle.height = "";
    placeholderStyle.display = "none";
    placeholderStyle.order = "";
  }
};
export const useDrag = (
  index: number,
  getPlaceholder: () => HTMLElement | null
) => {
  const dispatch = useDispatch();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const { placeholderOrder, elementsOrder, rects } = useSelector(
    ({ draggables }: Store) => draggables
  );
  const order = elementsOrder[index];
  const ref = useRef<HTMLElement | null>(null);
  const isIntersectedRef = useRef(false);
  const dragOriginRectRef = useRef<Rect | null>(null);
  const pointerOrigin = useRef({ x: 0, y: 0 });

  const setRect = useCallback(() => {
    if (ref.current) {
      const rect = copyRect(ref.current.getBoundingClientRect());
      dispatch(dndActions.setRect({ order, rect }));
    }
  }, [dispatch, order]);

  const setRef = useCallback(
    (element) => {
      ref.current = element;
      setRect();
    },
    [setRect]
  );

  const setStyles = useCallback(() => {
    const el = ref.current;
    const placeholderEl = getPlaceholder();
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
    setPlaceholder(el, placeholderEl, order);
  }, [getPlaceholder, order]);

  const resetStyles = useCallback(() => {
    const el = ref.current;
    const placeholderEl = getPlaceholder();
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
    setPlaceholder(el, placeholderEl, null);
    setRect();
  }, [index, setRect, getPlaceholder]);

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

  useEffect(() => {
    const options = { capture: false, passive: false };
    const removeEventListeners = () => {
      window.removeEventListener("mousemove", mouseMoveListener, options);
      window.removeEventListener("mouseup", releaseListener);
      window.removeEventListener("touchmove", touchMoveListener, options);
      window.removeEventListener("touchend", releaseListener);
      window.removeEventListener("touchcancel", releaseListener);
      window.removeEventListener("scroll", releaseListener);
      window.removeEventListener("resize", releaseListener);
      window.removeEventListener("orientationchange", releaseListener);
    };
    if (isGrabbed) {
      window.addEventListener("mousemove", mouseMoveListener, options);
      window.addEventListener("mouseup", releaseListener);
      window.addEventListener("touchmove", touchMoveListener, options);
      window.addEventListener("touchend", releaseListener);
      window.addEventListener("touchcancel", releaseListener);
      window.addEventListener("scroll", releaseListener);
      window.addEventListener("resize", releaseListener);
      window.addEventListener("orientationchange", releaseListener);
    } else {
      removeEventListeners();
    }
    return removeEventListeners;
  }, [isGrabbed, mouseMoveListener, touchMoveListener, releaseListener]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!shouldListenMouseEvent(event)) return;
      startDrag(event.clientX, event.clientY);
    };
    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      startDrag(touch.clientX, touch.clientY);
    };
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
  }, [startDrag]);

  useLayoutEffect(() => {
    setRect();
  }, [setRect, elementsOrder, index]);

  useLayoutEffect(() => {
    const el = ref.current;
    const placeholderEl = getPlaceholder();
    setPlaceholder(el, placeholderEl, placeholderOrder);
  }, [getPlaceholder, placeholderOrder]);
  return {
    ref: setRef,
  };
};
