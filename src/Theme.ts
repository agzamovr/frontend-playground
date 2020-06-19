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
  },
});