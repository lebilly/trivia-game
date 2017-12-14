import React from "react";
import ReactDOM from "react-dom";
import { TriviaHome } from "./Components/TriviaHome";

import "./index.css";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<TriviaHome />, document.getElementById("root"));
registerServiceWorker();
