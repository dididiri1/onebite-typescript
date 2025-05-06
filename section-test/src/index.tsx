import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      {" "}
      {/* BrowserRouter로 감싸줌 */}
      <App />
    </BrowserRouter>
  </Provider>
);
