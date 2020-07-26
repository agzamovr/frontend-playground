import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { DropPlaceHolder } from "./DropPlaceholder";
import { useDispatch } from "react-redux";
import { dndActions } from "./redux/dndReducer";
import { Draggable } from "dnd/Draggable";

interface BoardProps {
  children: React.ReactElement<HTMLElement>[];
}

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(50px, auto);
  grid-gap: 5px;
  overflow: auto;
`;

export const GridBoard: FunctionComponent<BoardProps> = (props) => {
  const dispatch = useDispatch();
  const { children } = props;
  const elementsCount = children.length;
  useEffect(() => {
    dispatch(dndActions.initElementsOrder(elementsCount));
  }, [dispatch, elementsCount]);
  return (
    <StyledBoard>
      {children.map((element, index) => (
        <Draggable key={index} originalOrder={index}>
          {element}
        </Draggable>
      ))}
      <DropPlaceHolder />
    </StyledBoard>
  );
};
