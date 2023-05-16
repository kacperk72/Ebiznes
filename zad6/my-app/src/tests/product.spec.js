describe('Products API', () => {
    it('Fetches products successfully', () => {
      cy.request('GET', 'http://localhost:8080/products')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.length(5); // assuming you have 5 products
        });
    });
  
    it('Fetches a product by ID successfully', () => {
      cy.request('GET', 'http://localhost:8080/products/1')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('name');
          expect(response.body).to.have.property('price');
        });
    });
  
    it('POST - Create a new product', () => {
        const newProduct = {
          name: 'Test Product',
          price: 100
        };
    
        cy.request('POST', '/products', newProduct)
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(newProduct.name);
            expect(response.body.price).to.eq(newProduct.price);
          });
      });
    
      it('PUT - Update an existing product', () => {
        const updatedProduct = {
          name: 'Updated Product',
          price: 150
        };
    
        const productIdToUpdate = 1; // replace with real id
    
        cy.request('PUT', `/products/${productIdToUpdate}`, updatedProduct)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq(updatedProduct.name);
            expect(response.body.price).to.eq(updatedProduct.price);
          });
      });
    
      it('DELETE - Delete a product', () => {
        const productIdToDelete = 1; // replace with real id
    
        cy.request('DELETE', `/products/${productIdToDelete}`)
          .then((response) => {
            expect(response.status).to.eq(200);
          });
      });


    
});

describe('Products API', () => {
    it('Returns an error when a product does not exist', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8080/products/9999', // assuming this ID does not exist
        failOnStatusCode: false // this is important to not fail the test on a 404
      })
        .then((response) => {
          expect(response.status).to.eq(404);
        });
    });
  
    it('Returns an error when trying to create a product without necessary fields', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/products',
        body: { /* no body */ },
        failOnStatusCode: false // this is important to not fail the test on a 400
      })
        .then((response) => {
          expect(response.status).to.eq(400);
        });
    });
});
  