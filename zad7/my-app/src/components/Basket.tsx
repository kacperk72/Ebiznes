import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    width: '100%',
    maxWidth: '600px',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  product: {
    fontWeight: 'bold',
  },
  price: {
    color: '#999',
  },
};

const Basket = () => {
  const { basket } = useContext(ShopContext); // Use context

  return (
    <div style={styles.container}>
      <h1>Basket</h1>
      <ul style={styles.list}>
        {basket.map((product) => (
          <li key={product.ID} style={styles.listItem}>
            <span style={styles.product}>{product.name}</span>
            <span style={styles.price}>{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default Basket;
