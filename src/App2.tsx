import React, { useState, FunctionComponent, useCallback, useRef } from "react";
import styled from "styled-components";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import { useInView } from "react-intersection-observer";

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
`;

export const ItemTypes = {
  CARD: "card",
};

const THRESHOLD = [0.25, 0.5, 0.75, 1]; // Store multiple thresholds in a constant
const Card = () => {
  const ref = useRef();

  const [inViewRef, inView, entry] = useInView({
    /* Optional options */
    threshold: THRESHOLD,
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  // observer.observe(drag)
  // Use `useCallback` so we don't recreate the function on each render - Could result in infinite loop
  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
      drag(node);
    },
    [inViewRef, drag]
  );
  console.log(`is in entry:`, entry);
  return (
    <StyledCard
      ref={setRefs}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? "rotate(15)" : "none",
        transition: "opacity 200ms ease-in",
        cursor: "grab",
      }}
    >
      Draggable ({`is in view: ${entry?.intersectionRatio}`})
    </StyledCard>
  );
};

const CardSlot: FunctionComponent<{
  index: number;
  onDrop: (index: number) => void;
}> = (props) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (item, monitor) => {
      props.onDrop(props.index);
      // console.log(monitor.getClientOffset());
    },
    drop: () => props.onDrop(props.index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  const droppable = isOver && canDrop;
  return (
    <StyledCardSlot
      ref={drop}
      style={{
        backgroundColor: droppable ? "#f6f8fa" : "",
        borderTop: droppable ? "4px solid #2ea9db" : "4px solid blue",
        transition: "background-color 200ms ease-in, border-top 200ms ease-in",
      }}
    >
      {props.children}
    </StyledCardSlot>
  );
};

const cards = (
  n: number,
  currSlot: number,
  onDrop: (index: number) => void
) => {
  const result = [];
  const card = <Card />;
  for (let i = 0; i < n; i++) {
    const children = i === currSlot ? card : i;
    result.push(
      <CardSlot key={i} index={i} onDrop={onDrop}>
        {children}
      </CardSlot>
    );
  }
  return result;
};

const App = () => {
  const [currSlot, setSlot] = useState(0);
  const onDrop = (newIndex: number) => setSlot(newIndex);
  const backend = "ontouchstart" in window ? TouchBackend : Backend;
  return (
    <DndProvider backend={backend}>
      <Board>{cards(10, currSlot, onDrop)}</Board>
    </DndProvider>
  );
};

export default App;
