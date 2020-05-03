import React, {
  FunctionComponent,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import styled from "styled-components";

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 5px;
  max-height: 50vh;
  overflow: scroll;
  /* flex-wrap: wrap; */
`;
const StyledCardSlot = styled.div`
  width: 300px;
  min-height: 100px;
  /* margin: 10px; */
  padding: 5px;
`;
const StyledCard = styled.div`
  background: gray;
  width: 100%;
  min-height: 50px;
  border-radius: 4px;
  cursor: grab;
  user-select: none;
  overflow-anchor: none;
`;

const Card = () => {
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [sensor, setSensor] = useState("mouse");
  const ref = useRef<HTMLDivElement>(null);
  const requestRef = React.useRef<number>();
  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);
  const startDrag = (clientX: number, clientY: number) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const style = ref.current.style;
      style.position = "fixed";
      style.width = rect.width + "px";
      style.height = rect.height + "px";
      style.top = rect.y + "px";
      style.left = rect.x + "px";
      style.pointerEvents = "none";
    }
    setDiffX(clientX);
    setDiffY(clientY);
    setIsGrabbed(true);
  };
  const handleGrabMouse = (event: React.MouseEvent) => {
    startDrag(event.clientX, event.clientY);
    setSensor("mouse");
  };

  const handleGrabTouch = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    startDrag(touch.clientX, touch.clientY);
    setSensor("touch");
  };

  const handleRelease = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setIsGrabbed(false);
    setDiffX(0);
    setDiffY(0);
    if (ref.current) {
      const style = ref.current.style;
      requestAnimationFrame(() => {
        style.position = "";
        style.width = "";
        style.height = "";
        style.top = "";
        style.left = "";
        style.transform = "";
        style.pointerEvents = "";
      });
    }
  };

  const handleMove = (
    clientX: number,
    clientY: number,
    diffX: number,
    diffY: number
  ) => {
    if (ref.current) {
      const style = ref.current.style;
      const x = clientX - diffX;
      const y = clientY - diffY;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(
        () => (style.transform = `translate(${x}px,${y}px)`)
      );
    }
  };

  const mouseMoveListener = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      handleMove(event.clientX, event.clientY, diffX, diffY);
    },
    [diffX, diffY]
  );

  const touchMoveListener = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      handleMove(touch.clientX, touch.clientY, diffX, diffY);
    },
    [diffX, diffY]
  );

  useEffect(() => {
    const options = { capture: false, passive: false };
    if (isGrabbed) {
      sensor === "mouse"
        ? window.addEventListener("mousemove", mouseMoveListener, options)
        : window.addEventListener("touchmove", touchMoveListener, options);
    } else {
      sensor === "mouse"
        ? window.removeEventListener("mousemove", mouseMoveListener, options)
        : window.removeEventListener("touchmove", touchMoveListener, options);
    }
    return () =>
      sensor === "mouse"
        ? window.removeEventListener("mousemove", mouseMoveListener, options)
        : window.removeEventListener("touchmove", touchMoveListener, options);
  }, [isGrabbed, sensor, mouseMoveListener, touchMoveListener]);

  return (
    <StyledCard
      ref={ref}
      draggable={false}
      onMouseDown={handleGrabMouse}
      onMouseUp={handleRelease}
      onTouchStart={handleGrabTouch}
      onTouchEnd={handleRelease}
      onTouchCancel={handleRelease}
    >
      Draggable
    </StyledCard>
  );
};

const CardSlot: FunctionComponent<{
  index: number;
}> = (props) => {
  return <StyledCardSlot>{props.children}</StyledCardSlot>;
};

const cards = (n: number) => {
  const result = [];
  const card = <Card />;
  for (let i = 0; i < n; i++) {
    const children = i === 0 ? card : i;
    result.push(
      <CardSlot key={i} index={i}>
        {children}
      </CardSlot>
    );
  }
  return result;
};

const App: FunctionComponent = () => {
  return <Board>{cards(10)}</Board>;
};

export default App;
