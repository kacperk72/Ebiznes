import React, {useContext} from "react";
import {IProduct} from "../interface";
import ShopContext from "../contexts/ShopContext";
import useBasket from "../hooks/useBasket";

export interface BasketProps extends React.ReactHTML {}

export const Basket = (props: BasketProps) => {
  const { products } = useContext(ShopContext)
  const { basket, addProduct, removeProduct } = useBasket();

  return (
    <div>
      <div className="products">
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
      </div>
    </div>

  )
}