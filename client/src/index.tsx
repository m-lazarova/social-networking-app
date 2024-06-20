import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import React from 'react';


const entryPoint = document.getElementById('root')!;
const root = createRoot(entryPoint);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);