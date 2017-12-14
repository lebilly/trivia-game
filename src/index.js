import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { TriviaHome } from "./Components/TriviaHome";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};
render(TriviaHome);

registerServiceWorker();

if (module.hot) {
  module.hot.accept("./Components/TriviaHome", () => {
    render(TriviaHome);
  });
}
