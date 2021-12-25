/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { getCartInLocalStorage } from '../heper';

const CartContext = createContext({
  assumptionInsights: [],
  setAssumptionInsights: () => {},
});

const CartContextProvider = ({ children }) => {
  const [cartInLocal, setCartInLocal] = useState(getCartInLocalStorage());

  return (
    <CartContext.Provider value={{ cartInLocal, setCartInLocal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCartContext = () => useContext(CartContext);
