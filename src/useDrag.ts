import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { dndActions, Rect, RectsRecord } from "./redux/dndReducer";
import { Store } from "./redux/store";

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

const getIntersectionAreaRatio = (first: Rect, second: Rect) => {
  const instersects =
    first.left < second.right &&
    first.right > second.left &&
    first.top < second.bottom &&
    first.bottom > second.top;
  if (!instersects) return 0;
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
  x: number,
  y: number,
  rects: RectsRecord
) => {
  let first = rects[currentOrder];
  first = {
    ...first,
    x,
    y,
    left: x,
    top: y,
    right: x + first.width,
    bottom: y + first.height,
  };
  for (const key in rects) {
    if (currentOrder !== key && rects.hasOwnProperty(key) && rects[key]) {
      const second = rects[key];
      const intersectionArea =
        first && second && getIntersectionAreaRatio(first, second);
      if (intersectionArea)
        console.log(
          currentOrder,
          key,
          intersectionArea,
          second.width * second.height
        );
    }
  }
};

export const useDrag = (
  order: string,
  getPlaceholder: () => HTMLElement | null
) => {
  const dispatch = useDispatch();
  const [isGrabbed, setIsGrabbed] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const setRef = useCallback(
    (element) => {
      ref.current = element;
      const rect = copyRect(element.getBoundingClientRect());
      dispatch(dndActions.setRect({ order, rect }));
    },
    [dispatch, order]
  );
  const getRef = useCallback(() => {
    return ref.current;
  }, []);
  const rects = useSelector(({ dndReducer }: Store) => dndReducer.rects);
  const setStyles = useCallback(() => {
    const el = getRef();
    const placeholderEl = getPlaceholder();
    if (!el || !placeholderEl) return;
    requestAnimationFrame(() => {
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

      const placeholderStyle = placeholderEl.style;
      placeholderStyle.width = rect.width + "px";
      placeholderStyle.height = rect.height + "px";
      placeholderStyle.display = "block";
      placeholderStyle.order = order;
    });
  }, [getRef, getPlaceholder, order]);

  const resetStyles = useCallback(() => {
    const el = getRef();
    const placeholderEl = getPlaceholder();
    if (!el || !placeholderEl) return;
    requestAnimationFrame(() => {
      const style = el.style;
      style.boxSizing = "";
      style.position = "";
      style.width = "";
      style.height = "";
      style.top = "";
      style.left = "";
      style.transform = "";
      style.pointerEvents = "";
      style.order = `${order}`;
      style.zIndex = "";

      const placeholderStyle = placeholderEl.style;
      placeholderStyle.width = "";
      placeholderStyle.height = "";
      placeholderStyle.display = "none";
      placeholderStyle.order = "";
    });
  }, [getRef, getPlaceholder, order]);

  const requestFrameRef = useRef<number>();
  const requestCalsRef = useRef<number>();
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      setStyles();
      setDiffX(clientX);
      setDiffY(clientY);
      setIsGrabbed(true);
    },
    [setStyles]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number, diffX: number, diffY: number) => {
      if (!ref.current) return;
      const style = ref.current.style;
      const x = clientX - diffX;
      const y = clientY - diffY;
      if (requestFrameRef.current)
        cancelAnimationFrame(requestFrameRef.current);
      if (requestCalsRef.current) cancelAnimationFrame(requestCalsRef.current);
      requestFrameRef.current = requestAnimationFrame(
        () => (style.transform = `translate(${x}px,${y}px)`)
      );

      requestCalsRef.current = requestAnimationFrame(() =>
        getIntersections(order, x, y, rects)
      );
    },
    [order, rects]
  );

  const releaseListener = useCallback(
    (event: Event) => {
      event.preventDefault();
      setIsGrabbed(false);
      setDiffX(0);
      setDiffY(0);
      resetStyles();
    },
    [resetStyles]
  );

  const mouseMoveListener = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return;
      event.preventDefault();
      handleMove(event.clientX, event.clientY, diffX, diffY);
    },
    [diffX, diffY, handleMove]
  );

  const touchMoveListener = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      handleMove(touch.clientX, touch.clientY, diffX, diffY);
    },
    [diffX, diffY, handleMove]
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
    if (ref.current) {
      const draggable = ref.current;
      draggable.draggable = false;
      draggable.addEventListener("mousedown", (event: MouseEvent) => {
        if (!shouldListenMouseEvent(event)) return;
        startDrag(event.clientX, event.clientY);
      });
      draggable.addEventListener("touchstart", (event: TouchEvent) => {
        const touch = event.touches[0];
        startDrag(touch.clientX, touch.clientY);
      });
    }
  }, [startDrag]);

  return {
    ref: setRef,
  };
};
