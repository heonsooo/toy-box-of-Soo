import React from "react";
import { useEffect, useState } from "react";

export default function Products() {
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  const onClickAddCount = () => {
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    fetch("data/products.json")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProduct(res);
      });

    return () => {
      // setProduct([]);
      console.log("unmounted~~~~");
    };
  }, []);

  return (
    <div>
      Products
      <ul>
        {product.map((e) => {
          return (
            <li key={e.id}>
              <article>
                <h4>{e.name}</h4>
                <p>{e.price}원</p>
              </article>
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={onClickAddCount}>
        {count}
      </button>
    </div>
  );
}
