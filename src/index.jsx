import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

document.body.innerHTML = '<div id="app"></div>';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Home />,
  },
  {
    path: '*',
    element: <div>Page Not found</div>,
  },
]);

const root = createRoot(document.getElementById('app'));
root.render(<RouterProvider router={router} />);
