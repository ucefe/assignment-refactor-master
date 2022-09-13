import { IProduct } from './../interfaces/product.interface';

//TODO add to .env
const FAKE_API_URL ='https://fakestoreapi.com/products'

export async function addProduct(
  title: string,
  description: string,
  price: number
):Promise<IProduct>{
  const response = await fetch(FAKE_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      price,
      description,
    }),
  });
  return response.json();
}

export async function getAllProducts():Promise<IProduct[]>{
    const response = await fetch(FAKE_API_URL);
    return response.json()
}