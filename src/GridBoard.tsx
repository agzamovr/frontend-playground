import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useDrag } from "./useDrag";

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 5px;
  max-height: 50vh;
  overflow: auto;
  /* flex-wrap: wrap; */
`;
interface BoardProps {
  children: React.ReactElement<HTMLElement>[];
}
interface DraggableProps {
  order: number;
}
const Draggable: FunctionComponent<DraggableProps> = (props) => {
  const { ref } = useDrag();
  const { order, children } = props;
  return (
    <div ref={ref} style={{ order }}>
      {children}
    </div>
  );
};

export const GridBoard: FunctionComponent<BoardProps> = (props) => {
  const { children } = props;
  return (
    <StyledBoard>
      {children.map((element, index) => (
        <Draggable key={index} order={index}>
          {element}
        </Draggable>
      ))}
    </StyledBoard>
  );
};
