import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import "../src/assets/css/style.css";
import "../src/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importar assets 
/*import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/quill/quill.snow.css";
import "./assets/vendor/quill/quill.bubble.css";
import "./assets/vendor/remixicon/remixicon.css";
import "./assets/vendor/simple-datatables/style.css";

import "./assets/css/style.css";

import "./assets/vendor/bootstrap/js/bootstrap.bundle.min.js";

//import "./assets/js/main.js";*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
