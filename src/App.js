import React from "react";
import { ThemeProvider } from "styled-components";
import lightTheme from "./themes/lightTheme";
import GlobalStyle from "./themes/GlobalStyle";
import Routes from "./routes";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <>
        <GlobalStyle />
        <Routes />
      </>
    </ThemeProvider>
  );
}

export default App;
