// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// import { AuthProvider } from "./Components/AuthContext";

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);




import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Components/AuthContext'; // ✅ import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ wrap your entire app here */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
