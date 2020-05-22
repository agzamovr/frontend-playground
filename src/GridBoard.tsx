import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { useDrag } from "./useDrag";
import { DropPlaceHolder } from "./DropPlaceholder";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "./redux/store";
import { dndActions } from "./redux/dndReducer";

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 5px;
  max-height: 50vh;
  overflow: auto;
`;

const StyledDraggable = styled.div`
  cursor: grab;
  user-select: none;
  overflow-anchor: none;
  box-sizing: "border-box";
`;
interface BoardProps {
  children: React.ReactElement<HTMLElement>[];
}
interface DraggableProps {
  order: number;
}
const Draggable: FunctionComponent<DraggableProps> = (props) => {
  const { order, children } = props;
  const { ref } = useDrag(order);
  return (
    <StyledDraggable ref={ref} style={{ order }}>
      {children}
    </StyledDraggable>
  );
};

export const GridBoard: FunctionComponent<BoardProps> = (props) => {
  const dispatch = useDispatch();
  const { children } = props;
  const elementsCount = children.length;
  useEffect(() => {
    const elementsOrder = Array.from({ length: elementsCount }, (v, i) => i);
    dispatch(
      dndActions.setElementsOrder({
        placeholderOrder: null,
        elementsOrder: elementsOrder,
      })
    );
  }, [dispatch, elementsCount]);
  const elementsOrder = useSelector(
    ({ draggables: { elementsOrder } }: Store) => elementsOrder
  );
  return (
    <StyledBoard>
      {elementsOrder.map((originalOrder, index) => (
        <Draggable key={originalOrder} order={index}>
          {children[originalOrder]}
        </Draggable>
      ))}
      <DropPlaceHolder />
    </StyledBoard>
  );
};
