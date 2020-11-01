import { useRef, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { dndActions, GridCellRect, RectsRecord } from "./redux/dndReducer";
import { getViewportIntersection } from "./scroll";
import { copyRect, getIntersections, calcRects } from "dnd/dndGeometry";

const releaseEvents = [
  "mouseup",
  "touchend",
  "touchcancel",
  "resize",
  "orientationchange",
] as const;
const options = { capture: false, passive: false } as const;

const shouldListenMouseEvent = (event: MouseEvent) =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !event.ctrlKey &&
  !event.metaKey &&
  !event.shiftKey &&
  !event.altKey;

const setDraggableStyles = (el: HTMLElement | null, rect: GridCellRect) => {
  if (!el) return;
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
};

const resetDraggableStyles = (el: HTMLElement | null, order: number) => {
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
  style.order = `${order}`;
  style.zIndex = "";
};

export const useDragController = () => {
  const dispatch = useDispatch();
  const order = useRef<number>(0);
  const rects = useRef<RectsRecord | null>(null);
  const draggableRef = useRef<HTMLElement | null>(null);
  const isIntersectedRef = useRef(false);
  const dragOriginRectRef = useRef<GridCellRect | null>(null);
  const pointerOrigin = useRef({ x: 0, y: 0 });
  const pointerPosition = useRef({ x: 0, y: 0 });

  const findAndSetDraggable = useCallback((element: HTMLElement) => {
    draggableRef.current = element.closest(
      "[data-dnd-draggable]"
    ) as HTMLElement;
    order.current = parseInt(draggableRef.current.style.order);
    return draggableRef.current;
  }, []);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!draggableRef.current) return;
      const style = draggableRef.current.style;
      pointerPosition.current.x = clientX;
      pointerPosition.current.y = clientY;
      const x = pointerPosition.current.x - pointerOrigin.current.x;
      const y = pointerPosition.current.y - pointerOrigin.current.y;

      style.transform = `translate3d(${x}px,${y}px, 0px)`;

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
        rects.current = calcRects(draggableRef.current);
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
    resetDraggableStyles(draggableRef.current, order.current);
    rects.current = null;
    dispatch(dndActions.dragEnd());
  }, [dispatch, removeEventListeners]);

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
      const el = findAndSetDraggable(element);
      rects.current = calcRects(draggableRef.current);
      dragOriginRectRef.current = copyRect(el);
      setDraggableStyles(el, dragOriginRectRef.current);
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
    [dispatch, addEventListeners, findAndSetDraggable]
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
