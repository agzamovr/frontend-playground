import { FunctionComponent, ReactElement, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export interface DataBlockIdProps {
  blockId?: string;
}

type DataBlockProps = DataBlockIdProps & {
  children: (
    ref: (element?: Element | null) => void
  ) => ReactElement<HTMLElement>;
};
export const useDataBlockId = (elementId?: string) => {
  const id = useMemo(() => (elementId ? elementId : uuidv4()), [elementId]);
  const setRef = useCallback(
    (element?: Element | null) => {
      element?.setAttribute("data-block-id", id);
    },
    [id]
  );
  return { id, setRef };
};

export const DataBlockID: FunctionComponent<DataBlockProps> = (props) => {
  const { setRef } = useDataBlockId(props.blockId);
  return props.children(setRef);
};
