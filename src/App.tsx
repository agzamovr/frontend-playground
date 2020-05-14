import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { GridBoard } from "./GridBoard";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const StyledCard = styled.div`
  background: gray;
  width: 100%;
  min-height: 50px;
  border-radius: 4px;
`;

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <GridBoard>
        {Array.from({ length: 5 }, (v, i) => (
          <StyledCard key={i}>Draggable {i}</StyledCard>
        ))}
      </GridBoard>
    </Provider>
  );
};

export default App;
