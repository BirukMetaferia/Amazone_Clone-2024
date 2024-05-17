import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import './index.css';
import App from './App';
import { DataProvider } from './Components/DataProvider/DataProvider';
import { initialState, reducer } from './Utility/reducer';

const root = createRoot(document.getElementById('root')); // Use createRoot from "react-dom/client"

root.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
