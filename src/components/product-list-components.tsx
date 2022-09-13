import * as React from "react";
import lodash from 'lodash'
import { FaStar } from "react-icons/fa";
import styles from "./product-list-components.module.css";
import Product from "./Product";

interface IPostsProps {
  products: any;
  //just to make shopApp refactor working will be removed on this file refactoring
  onFav: (title: any) => void;
}


export default class Posts extends React.Component<IPostsProps, {}> {
  constructor(props: any) { super(props) }
  render(){
    let productsarr = []
      for (const [i, p] of this.props.products.entries()) {
        productsarr.push(
          <Product key={i} index={i} product={p} onFav={this.props.onFav} />
        );
    }
    return <div>{lodash.reverse(productsarr)}</div>
  }
}
