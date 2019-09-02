import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "unstated";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./themes/GlobalStyle";
import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <>
        <GlobalStyle />
        <Provider>
          <Routes />
        </Provider>
      </>
    </ThemeProvider>
  );
}

export default App;
