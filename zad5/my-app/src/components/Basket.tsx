import React from 'react';
import { IProduct } from '../interface';
import products from '../api/products';

export const Basket = () => {
  return (
    <div>
       <h1>Basket</h1>
      {/* <div className="products">
        <ul>
          {products.map((product: IProduct) => (<li>
            {product.name}
            <button onClick={() => addProduct(product)}>add product</button>
          </li>))}
        </ul>
      </div>

      <div className="basket">
        <ul>
          {basket.map((product: IProduct) => (<li>
            {product.name}
            <button onClick={() => removeProduct(product.id)}>remove product</button>
          </li>))}
        </ul>
      </div> */}
    </div>
  );
};
