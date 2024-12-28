'use client';
import './globals.css'; // Import global CSS
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store'; // Adjust path as needed

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fa">
      <head>
        <title>menyou-admin</title>
      </head>
      <body>
        <Provider store={store}>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

export default Layout;
