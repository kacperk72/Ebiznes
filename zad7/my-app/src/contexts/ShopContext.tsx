import React, { useEffect, useState, useMemo, useCallback } from "react";
import { IProduct, IShopContextState } from "../interface";
import fetchProducts  from "../api/products-get"

interface IShopContextStateWithBasket extends IShopContextState {
  basket: IProduct[];
  addToBasket: (product: IProduct) => void;
}

const defaultValue: IShopContextStateWithBasket = {
  products: [],
  basket: [],
  addToBasket: () => {},
}

interface ShopContextProviderProps {
  children: React.ReactNode;
}

export const ShopContext = React.createContext(defaultValue);

export const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [basket, setBasket] = useState<IProduct[]>([]);

  const addToBasket = useCallback((product: IProduct) => {
    setBasket((prevBasket) => [...prevBasket, product]);
  }, []);

  const providerValue: IShopContextStateWithBasket = useMemo(() => ({
    products,
    basket,
    addToBasket,
  }), [products, basket, addToBasket]);

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        console.log(products)
        setProducts(products)
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <ShopContext.Provider value={providerValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContext;
