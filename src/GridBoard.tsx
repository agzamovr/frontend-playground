import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { useDrag } from "./useDrag";
import { DropPlaceHolder } from "./DropPlaceholder";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Store } from "./redux/store";
import { dndActions, OrderRecord, findKeyByValue } from "./redux/dndReducer";

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(50px, auto);
  grid-gap: 5px;
  overflow: auto;
`;

interface DraggableAttributes {
  order: string;
}

const StyledDraggable = styled.div.attrs((props: DraggableAttributes) => ({
  "data-draggable": props.order,
  draggable: false,
}))<DraggableAttributes>`
  cursor: grab;
  user-select: none;
  overflow-anchor: none;
  box-sizing: border-box;
`;
interface BoardProps {
  children: React.ReactElement<HTMLElement>[];
}
interface DraggableProps {
  originalOrder: string;
}
const Draggable: FunctionComponent<DraggableProps> = (props) => {
  const { originalOrder, children } = props;
  const order = useSelector(
    ({ draggables: { elementsOrder } }: Store) =>
      findKeyByValue(elementsOrder, originalOrder),
    shallowEqual
  );

  const { ref } = useDrag(order, originalOrder);
  return (
    <StyledDraggable
      ref={ref}
      order={order}
      style={{ order: order ? parseInt(order) : undefined }}
    >
      {children}
    </StyledDraggable>
  );
};

export const GridBoard: FunctionComponent<BoardProps> = (props) => {
  const dispatch = useDispatch();
  const { children } = props;
  const elementsCount = children.length;
  useEffect(() => {
    const elementsOrder: OrderRecord = {};
    for (let i = 0; i < elementsCount; i++) elementsOrder[i] = i.toString();
    dispatch(
      dndActions.setElementsOrder({
        placeholderOrder: null,
        elementsOrder: elementsOrder,
      })
    );
  }, [dispatch, elementsCount]);
  return (
    <StyledBoard>
      {children.map((element, index) => (
        <Draggable key={index} originalOrder={index.toString()}>
          {element}
        </Draggable>
      ))}
      <DropPlaceHolder />
    </StyledBoard>
  );
};
