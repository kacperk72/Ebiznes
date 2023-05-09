const submitPayment = (paymentData: any) => {
    console.log(paymentData);
    fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
      .then(response => response.json())
      .then(data => console.log(data));
    };
    
export default submitPayment;