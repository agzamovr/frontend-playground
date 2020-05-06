import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { GridBoard } from "./GridBoard";

const StyledCard = styled.div`
  background: gray;
  width: 100%;
  min-height: 50px;
  border-radius: 4px;
  cursor: grab;
  user-select: none;
  overflow-anchor: none;
`;

const App: FunctionComponent = () => {
  return (
    <GridBoard>
      {Array.from({ length: 10 }, (v, i) => (
        <StyledCard key={i}>Draggable {i}</StyledCard>
      ))}
    </GridBoard>
  );
};

export default App;
