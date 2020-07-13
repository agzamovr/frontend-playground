import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./Theme";
import { TemplateBuilder } from "template/TemplateBuilder";

const App: FunctionComponent = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <TemplateBuilder />
    </Provider>
  </ThemeProvider>
);

export default App;
