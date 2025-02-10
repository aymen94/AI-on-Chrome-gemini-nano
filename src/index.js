import React from 'react';
import { createRoot } from 'react-dom/client';
import Init from './Init';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Init />
  </React.StrictMode>
);