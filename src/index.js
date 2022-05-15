import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const container = document.getElementById("root");
const root = createRoot(container);

const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      error: "red.500",
      text: {
        default: "gray.900",
        _dark: "gray.50",
      },
    },
  },
  fontSizes: {
    lg: "18px",
  },
  colors: {
    gray: {
      100: "#fafafa",
      200: "#f7f7f7",
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
