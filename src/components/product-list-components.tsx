import * as React from "react";
import _ from "lodash";
import Product from "./Product";
import { IProduct } from "../product.interface";

type ProductListProps = {
  products: IProduct[];
  toggleFavorite: (id: number) => void;
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  toggleFavorite,
}) => {
  const productList = products.map((product) => (
    <Product
      key={product.id}
      product={product}
      toggleFavorite={toggleFavorite}
    />
  ));

  return <div>{_.reverse(productList)}</div>;
};

export default ProductList;
