import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { Provider } from "react-redux";
import { store, persistor } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import './index.css';
import "../src/assets/css/style.css";
import "../src/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import App from './App';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </PersistGate>
  </Provider>
  //</React.StrictMode>
);

reportWebVitals();
