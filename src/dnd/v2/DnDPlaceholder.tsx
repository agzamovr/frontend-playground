import { Box } from "@material-ui/core";
type DropPlaceholderProps = {
  show: boolean;
  isTop?: boolean;
  isChild?: boolean;
};

export const DropPlaceholder = ({
  show,
  isTop,
  isChild,
}: DropPlaceholderProps) => {
  const styles = isTop ? { top: 0 } : { bottom: "-4px" };
  return show ? (
    <Box
      flexGrow={1}
      style={{
        pointerEvents: "none",
        background: "rgba(46, 170, 220, 0.5)",
        height: "4px",
        position: "absolute",
        left: isChild ? "4px" : 0,
        right: isChild ? "10px" : 0,
        ...styles,
      }}
    ></Box>
  ) : null;
};
