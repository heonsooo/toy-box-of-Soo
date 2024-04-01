import "./App.css";
import React from "react";
import { useState } from "react";

import Counter from "./components/Counter";

export default function AppCounter() {
  const [totalCount, setTotalCount] = useState(0);
  const onClickCounterComp = () => {
    console.log("abcd~~~");
    setTotalCount((prev) => prev + 1);
  };
  return (
    <div className="container">
      <div className="total-counter">
        <h4>Total Counter : {totalCount} </h4>
      </div>
      <Counter
        setTotalCount={setTotalCount}
        totalCount={totalCount}
        propAppCounterFunc={onClickCounterComp}
      />
      <Counter
        setTotalCount={setTotalCount}
        totalCount={totalCount}
        propAppCounterFunc={onClickCounterComp}
      />
    </div>
  );
}
