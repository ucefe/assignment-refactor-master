import React from 'react';
import styles from "./product-list-components.module.css";
import { FaStar } from 'react-icons/fa';
import { IProduct } from '../interfaces/product.interface';

type ProductProps = {
	product: IProduct;
	toggleFavorite: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({ product, toggleFavorite }) => {
    const {product: productClass, productBody, actionBarItem, actionBarItemLabel} = styles
    // Problem: Now product title can be too long, I just put overflowX as fix now
    return (
      <div className={productClass} style={{display: 'inline-block', overflowX: 'scroll', float: 'none', clear: 'both'}}>
        <h1 className={styles['product-title']} style={{overflowX: 'hidden'}}>{product.title}</h1>
  
        <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>
  
        <p><b>Price: ${+product.price}</b></p>
  
        <p className={productBody}>
          <span><b>Description:</b></span>
          <br/>
          {product.description}
       </p>
  
        <span className={styles['action_bar']} style={{display: 'table', width: "100%"}}>
          <span
            className={`${actionBarItem} ${
              product.isFavorite ? "active" : ""
            }`}
            role="button"
            onClick={() => {
                toggleFavorite(product.id);
            }}
          >
            <FaStar /> <span className={actionBarItemLabel}>{!!(!!(product.isFavorite)) ? 'Remove from favorites' : 'Add to favorites'}</span>
          </span>
        </span>
      </div>
    );
  };
  export default Product;
  