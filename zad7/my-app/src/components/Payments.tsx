import React, { useState } from 'react';
import submitPayment from '../api/products-add';

const Payments = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const paymentData = {
      name: productName,
      price: Number(productPrice),
    };

    submitPayment(paymentData);
  };

  return (
    <div>
      <h1>Payments</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={e => setProductName(e.target.value)} />
        </label>
        <label>
          Product Price:
          <input type="number" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Payments;
