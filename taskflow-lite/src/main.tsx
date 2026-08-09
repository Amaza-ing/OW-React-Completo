import { render } from "preact";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");

if (root === null) {
  throw new Error("No se ha encontrado el elemento #root.");
}

render(<App />, root);
