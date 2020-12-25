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

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      requestAnimationFrame(() => {
        if (!draggableRef.current) return;
        const style = draggableRef.current.style;
        const x = clientX - shift.current.x;
        const y = clientY - shift.current.y;

        style.transform = `translate3d(${x}px,${y}px, 0px)`;
        if (!dataBlockIdRef.current || !rects.current) return;
        const intersectionInfo = getIntersections(
          dataBlockIdRef.current,
          x,
          y,
          rects.current
        );
        if (intersectionInfo)
          context?.dragging(
            dataBlockIdRef.current,
            intersectionInfo.blockId,
            intersectionInfo
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
      // find draggable element block
      const draggableBlock = element.closest("[data-block-id]") as HTMLElement;
      // get data-block-id
      dataBlockIdRef.current = draggableBlock.getAttribute("data-block-id");
      if (!dataBlockIdRef.current) return;
      // clone dragging element which is actually will be moved
      const clonedEl = draggableBlock?.cloneNode(true) as HTMLElement;
      clonedEl.removeAttribute("data-block-id");
      dragOriginRectRef.current = copyRect(draggableBlock);
      // set pointer x position relative to the left of the element
      shift.current.x = clientX - dragOriginRectRef.current.left;
      // set pointer y position relative to the top of the element
      shift.current.y = clientY - dragOriginRectRef.current.top;
      setDraggableStyles(clonedEl, dragOriginRectRef.current);
      // append cloned element to the special overlay
      const rootOverlay = document.getElementById("global-overlay");
      rootOverlay?.appendChild(clonedEl);
      draggableRef.current = clonedEl;
      const draggables = context?.getDraggables();
      if (dataBlockIdRef.current && draggables)
        // calculate all droppable elements' rectangles
        rects.current = calcRects(dataBlockIdRef.current, draggables);
      addEventListeners();
      // trigger drag start event
      context?.dragStart(dataBlockIdRef.current);
    },
    [addEventListeners, context]
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
