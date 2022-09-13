import * as React from "react";
import { useState } from "react";
import { Button } from "../UI";
import styles from "./styles.module.css";

type AddProductProps = {
  
  //TODO import product Interface
  handleSubmit: (payload: {
    title: string;
    description: string;
    price: number;
  }) => void;
};

const INITIAL_VALUES = {
  title: "",
  description: "",
  price: null,
};

const AddProduct: React.FC<AddProductProps> = ({ handleSubmit }) => {
  const [values, setValues] = useState<any>(INITIAL_VALUES);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (!values.title) {
      alert("Your product needs a title");
      return;
    }

    if (!values.description) {
      alert("Your product needs some content");
      return;
    }

    if (!values.price || isNaN(Number(values.price))) {
      alert("Your product needs a valid price");
      return;
    }

    handleSubmit(values);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className={styles.form} onSubmit={(event) => onSubmit(event)}>
      <label className={styles.label}>Product title: *</label>
      <input
        id="title"
        name="title"
        placeholder="Title..."
        defaultValue=""
        className={styles.input}
        onChange={(e) => handleChange(e)}
        required
      />
      <label className={styles.label}>Product details: *</label>
      <input
        id="price"
        name="price"
        placeholder="Price..."
        defaultValue=""
        className={styles.input}
        onChange={(e) => handleChange(e)}
        required
      />

      <textarea
        id="description"
        name="description"
        placeholder="Start typing product description here..."
        defaultValue=""
        className={styles.textarea}
        onChange={(e) => handleChange(e)}
        required
      />

      <Button>Add a product</Button>
    </form>
  );
};
export default AddProduct;
