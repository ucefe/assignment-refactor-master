import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import ProductList from "./components/product-list-components";
import  AddProduct from "./components/form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";

//TODO define inside interface file
type Rating = {
  rate: number;
  count: number;
};

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: Rating;
  isFavorite: boolean;
}

const ShopApp: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [numFavorites, setNumFavorites] = useState<number>(0);
  const [prodCount, setProdCount] = useState<number>(0);

  useEffect(() => {
    setMessage("Loading...");
    setIsShowingMessage(true);

    //TODO define it inside Service
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      setProducts(json);
      setProdCount(json.length);
      setMessage("");
      setIsShowingMessage(false);
    };

    fetchProducts().catch(console.error);
    document.title = "Droppe refactor app";
  }, []);

  const toggleFavorite = (id: number) => {
    const newProducts = products;
    const index = products.findIndex((p) => p.id === id);

    if (index == null) return;

    if (newProducts[index].isFavorite) {
      newProducts[index].isFavorite = false;
      setNumFavorites((prev) => prev - 1);
    } else {
      newProducts[index].isFavorite = true;
      setNumFavorites((prev) => prev + 1);
    }
    setProducts(newProducts);
  };

  //TODO define it inside Service
  const postProduct = async (
    title: string,
    description: string,
    price: number
  ) => {
    setIsOpen(false);
		setMessage('Adding product...');
		setIsShowingMessage(true);

    const response = await fetch("https://fakestoreapi.com/products", {
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
    const json = await response.json();

    setProducts((prev) => [...prev, { ...json }]);
    setProdCount((prev) => prev + 1);
    setMessage("");
    setIsShowingMessage(false);
  };

  const onSubmit = async (payload: {
    title: string;
    description: string;
    price: number;
  }) => {
    postProduct(payload.title, payload.description, payload.price);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={["container", styles.headerImageWrapper].join(" ")}>
          <img src={logo} className={styles.headerImage} alt="..." />
        </div>
      </div>

      <span
        className={["container", styles.main].join(" ")}
        style={{
          margin: "50px inherit",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <img
          src={img1}
          style={{ maxHeight: "15em", display: "block" }}
          alt="..."
        />
        <img
          src={img2}
          style={{ maxHeight: "15rem", display: "block" }}
          alt="..."
        />
      </span>

      <div
        className={["container", styles.main].join(" ")}
        style={{ paddingTop: 0 }}
      >
        <div className={styles.buttonWrapper}>
          <span role="button">
            <Button onClick={() => setIsOpen(true)}>
              Send product proposal
            </Button>
          </span>
          {isShowingMessage && (
            <div className={styles.messageContainer}>
              <i>{message}</i>
            </div>
          )}
        </div>

        <div className={styles.statsContainer}>
          <span>Total products: {prodCount}</span>
          {" - "}
          <span>Number of favorites: {numFavorites}</span>
        </div>

        {products && !!products.length ? (
          <ProductList products={products} toggleFavorite={toggleFavorite} />
        ) : (
          <div></div>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        className={styles.reactModalContent}
        overlayClassName={styles.reactModalOverlay}
      >
        <div className={styles.modalContentHelper}>
          <div className={styles.modalClose} onClick={() => setIsOpen(false)}>
            <FaTimes />
          </div>
          <AddProduct handleSubmit={onSubmit} />
        </div>
      </Modal>
    </>
  );
};

export default ShopApp;
