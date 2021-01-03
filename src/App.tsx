import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./Theme";
import { TemplateBuilder } from "template/TemplateBuilder";
import { DnDContextProvider } from "dnd/v2/DnDContext";
import { DnDOverlay } from "dnd/v2/DnDOverlay";

const App: FunctionComponent = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <DnDContextProvider>
        <TemplateBuilder />
      </DnDContextProvider>
    </Provider>
    <DnDOverlay />
  </ThemeProvider>
);

export default App;
