import { DnDContext } from "dnd/v2/DnDContext";
import {
  calcRects,
  copyRect,
  getIntersections,
  Rect,
  Rects,
} from "dnd/v2/dndGeometry";
import { useCallback, useContext, useEffect, useRef } from "react";

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

const setDraggableStyles = (el: HTMLElement, rect: Rect) => {
  const style = el.style;
  style.position = "absolute";
  style.top = "0px";
  style.left = "0px";
  style.width = `${rect.width}px`;
  style.height = `${rect.height}px`;
  style.opacity = "0.8";
  style.zIndex = "5000";
  style.transform = `translate3d(${rect.x}px,${rect.y}px, 0px)`;
};

export const useDnDController = () => {
  const rects = useRef<Rects | null>(null);
  const draggableRef = useRef<HTMLElement | null>(null);
  const dataBlockIdRef = useRef<string | null>(null);
  const dragOriginRectRef = useRef<Rect | null>(null);
  const shift = useRef({ x: 0, y: 0 });
  const pointerPosition = useRef({ x: 0, y: 0 });
  const context = useContext(DnDContext);

  const setDraggable = useCallback(
    (element: HTMLElement, clientX: number, clientY: number) => {
      const el = element.closest("[data-block-id]") as HTMLElement;
      dataBlockIdRef.current = el.getAttribute("data-block-id");
      if (!dataBlockIdRef.current) return;
      const rootOverlay = document.getElementById("global-overlay");
      const clonedEl = el?.cloneNode(true) as HTMLElement;
      clonedEl.removeAttribute("data-block-id");
      dragOriginRectRef.current = copyRect(el);
      shift.current.x = clientX - dragOriginRectRef.current.left;
      shift.current.y = clientY - dragOriginRectRef.current.top;
      setDraggableStyles(clonedEl, dragOriginRectRef.current);
      rootOverlay?.appendChild(clonedEl);
      draggableRef.current = clonedEl;
      context?.dragStart(dataBlockIdRef.current);
    },
    [context]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      requestAnimationFrame(() => {
        if (!draggableRef.current) return;
        const style = draggableRef.current.style;
        const x = clientX - shift.current.x;
        const y = clientY - shift.current.y;

        style.transform = `translate3d(${x}px,${y}px, 0px)`;
        if (!dataBlockIdRef.current || !rects.current) return;
        const intersection = getIntersections(
          dataBlockIdRef.current,
          x,
          y,
          rects.current
        );
        const intersectionRatio = intersection?.intersectionRatio;
        if (intersectionRatio && intersection?.blockId)
          context?.dragging(
            dataBlockIdRef.current,
            intersection.blockId,
            intersectionRatio
          );
      });
    },
    [context]
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
    shift.current.x = 0;
    shift.current.y = 0;
    pointerPosition.current.x = 0;
    pointerPosition.current.y = 0;
    dragOriginRectRef.current = null;
    draggableRef.current?.remove();
    draggableRef.current = null;
    const dataBlockId = dataBlockIdRef.current;
    dataBlockIdRef.current = null;
    rects.current = null;
    if (dataBlockId) context?.drop(dataBlockId);
  }, [removeEventListeners, context]);

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
      setDraggable(element, clientX, clientY);
      const elements = context?.getElements();
      if (dataBlockIdRef.current && elements)
        rects.current = calcRects(dataBlockIdRef.current, elements);
      addEventListeners();
    },
    [addEventListeners, setDraggable, context]
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
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart);
    return () => {
      removeEventListeners();
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleMouseDown, handleTouchStart, removeEventListeners]);
};
