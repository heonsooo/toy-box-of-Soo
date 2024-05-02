import React from "react";
import { useEffect, useState } from "react";

export default function Products() {
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  const [saleSttus, setSaleSttus] = useState(false);
  const onClickAddCount = () => {
    setCount((prev) => prev + 1);
  };
  const onChangeSaleSttus = () => {
    const tmpSttus = saleSttus ? false : true;
    setSaleSttus(tmpSttus);
  };
  useEffect(() => {
    fetch(`data/${saleSttus ? "sale-" : ""}products.json`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProduct(res);
      });

    return () => {
      // setProduct([]);
      console.log("unmounted~~~~");
    };
  }, [saleSttus]);

  return (
    <div>
      <input
        id="checkbox"
        type="checkbox"
        checked={saleSttus}
        onChange={onChangeSaleSttus}
      />
      <label htmlFor="checkbox">세일 여부</label>
      <h3>{saleSttus ? "Discount" : ""} Products</h3>
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
      {/* <button type="button" onClick={onClickAddCount}>
        {count}
      </button> */}
    </div>
  );
}
