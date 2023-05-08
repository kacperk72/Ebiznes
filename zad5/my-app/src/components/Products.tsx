import React, { useEffect, useState } from 'react';
import fetchProducts from '../api/products';
import { IProduct } from '../interface';

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
      console.log(productsData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Wyświetlanie listy produktów */}
      <h1>Products</h1>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

