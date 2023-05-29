import { IProduct } from "../interface";

const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`http://localhost:8080/products`)
    .then(response => response.json())
  return response
}

export default fetchProducts;


