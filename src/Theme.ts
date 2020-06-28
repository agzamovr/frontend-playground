import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0075FF",
    },
  },
  overrides: {
    MuiChip: {
      root: {
        borderRadius: "4px",
      },
    },
    MuiInputBase: {
      input: {
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
        '&[type="number"]': {
          "-moz-appearance": "textfield",
        },
      },
    },
  },
});
