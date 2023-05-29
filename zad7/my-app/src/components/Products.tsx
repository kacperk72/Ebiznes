import React, { useContext, useEffect, useState } from 'react';
import fetchProducts from '../api/products-get';
import { IProduct } from '../interface';
import ShopContext from '../contexts/ShopContext';

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { addToBasket } = useContext(ShopContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product) => {
          const createdAt = new Date(product.CreatedAt);
          const updatedAt = new Date(product.UpdatedAt);
          const formattedDate = `${createdAt.toLocaleDateString()} - ${createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          const formattedDate2 = `${updatedAt.toLocaleDateString()} - ${updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

          return (
            <tr key={product.ID}>
              <td style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>{product.ID}</td>
              <td style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>{product.name}</td>
              <td style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>{product.price}</td>
              <td style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>{formattedDate}</td>
              <td style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>{formattedDate2}</td>
              <button onClick={() => addToBasket(product)}>Add to basket</button>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
};

