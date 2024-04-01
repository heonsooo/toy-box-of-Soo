import React from "react";
import { useState } from "react";
import Products from "./components/Products";
export default function AppProducts() {
  const [showProducts, setShowProducts] = useState(false);
  const onClickToggle = () => {
    const toggleSttus = showProducts ? false : true;
    setShowProducts(toggleSttus);
  };
  return (
    <div>
      {showProducts && <Products />}
      <button type="button" onClick={onClickToggle}>
        toggle
      </button>
    </div>
  );
}
