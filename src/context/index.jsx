import React from 'react';
import CartContextProvider from './cartContext';

export const RootContext = ({ children }) => (
  <CartContextProvider>
    {children}
  </CartContextProvider>
);