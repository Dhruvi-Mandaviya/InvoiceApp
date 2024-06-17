import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { InvoiceProvider } from '../src/context/invoiceContext';
import InvoiceDetail from './pages/InvoiceDetail';

document.body.innerHTML = '<div id="app"></div>';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Home />,
  },
  {
    path: '/:id',
    element: <InvoiceDetail />,
  },
  {
    path: '*',
    element: <div>Page Not found</div>,
  },
]);

const root = createRoot(document.getElementById('app'));
root.render(
  <InvoiceProvider>
    <RouterProvider router={router} />
  </InvoiceProvider>,
);
