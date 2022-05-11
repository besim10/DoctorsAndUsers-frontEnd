import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import initApp from "./main/initializers/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

initApp().then((appStore: any) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={appStore}>
        <ToastContainer
          autoClose={1500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          position={"top-center"}
          pauseOnHover
        />
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
