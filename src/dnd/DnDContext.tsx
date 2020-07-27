import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { dndActions } from "./redux/dndReducer";
import { DropPlaceHolder } from "dnd/DropPlaceholder";

export const DnDContext: FunctionComponent = ({ children }) => {
  const dispatch = useDispatch();
  const elementsCount = React.Children.count(children);
  useEffect(() => {
    dispatch(dndActions.initElementsOrder(elementsCount));
  }, [dispatch, elementsCount]);
  return (
    <>
      {children}
      <DropPlaceHolder />
    </>
  );
};
