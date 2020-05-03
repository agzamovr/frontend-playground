import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useDrag } from "./useDrag";

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
  const { ref } = useDrag();

  return <StyledCard ref={ref}>Draggable</StyledCard>;
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
