import React, { FunctionComponent, useRef, useCallback } from "react";
import styled from "styled-components";
import { useDrag } from "./useDrag";
import { DropPlaceHolder } from "./DropPlaceholder";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 5px;
  max-height: 50vh;
  overflow: scroll;
`;

const StyledDraggable = styled.div`
  cursor: grab;
  user-select: none;
  overflow-anchor: none;
`;
interface BoardProps {
  children: React.ReactElement<HTMLElement>[];
}
interface DraggableProps {
  order: number;
  placeholder: () => HTMLElement | null;
}
const Draggable: FunctionComponent<DraggableProps> = (props) => {
  const { order, placeholder, children } = props;
  const { ref } = useDrag(order, placeholder);
  return (
    <StyledDraggable ref={ref} style={{ order }}>
      {children}
    </StyledDraggable>
  );
};

export const GridBoard: FunctionComponent<BoardProps> = (props) => {
  const { children } = props;
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const setPlaceholderRef = useCallback((value: HTMLDivElement) => {
    placeholderRef.current = value;
  }, []);
  const getPlaceholderRef = useCallback(() => placeholderRef.current, []);
  return (
    <Provider store={store}>
      <StyledBoard>
        {children.map((element, index) => (
          <Draggable key={index} order={index} placeholder={getPlaceholderRef}>
            {element}
          </Draggable>
        ))}
        <DropPlaceHolder ref={setPlaceholderRef} style={{ display: "none" }} />
      </StyledBoard>
    </Provider>
  );
};
