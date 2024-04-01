import React from "react";
import { useState } from "react";

export default function Counter({
  setTotalCount,
  totalCount,
  propAppCounterFunc,
}) {
  // const onClickAddBtn = () => {
  //   console.log("start Number", number);
  //   setNumber(number + 1);
  //   setNumber(number + 1);
  //   setNumber(number + 1);
  //   setNumber(number + 1);
  //   console.log("end Number", number);
  //   // alert("버튼이 클릭되었습니다.");
  // };
  // const onClickAddBtn2 = () => {
  //   console.log("start Number", number);
  //   setNumber((prev) => prev + 1);
  //   setNumber((prev) => prev + 1);
  //   setNumber((prev) => prev + 1);
  //   setNumber((prev) => {
  //     console.log("prev :", prev);
  //     return prev + 1;
  //   });
  //   setNumber((prev) => prev + 1);
  //   setNumber((prev) => prev + 1);
  //   console.log("end Number", number);
  //   // alert("버튼이 클릭되었습니다.");
  // };
  // const onClickAddBtn3 = () => {
  //   setNumber((prev) => prev + 1); // 1
  //   setNumber((prev) => prev + 1); // 2
  //   setNumber(number + 1); // 0+ 1 = 1
  //   setNumber((prev) => prev + 1); // 2
  //   setNumber((prev) => prev + 1); // 3
  // };
  const [localCount, setLocalCount] = useState(0);
  const onClickAddBtn = () => {
    setLocalCount(localCount + 1);
    propAppCounterFunc(); // ★ prop으로 받은 함수 실행 => 상위 컴포넌트에서 값 처리 ★
    // setTotalCount(totalCount + 1); // ★ prop으로 받은 함수 실행 ★ => 현재 컴포넌트에서 상위 컴포넌트 상태 값 변경 로직 처리
  };
  return (
    <div className="counter">
      <p className="number">
        {localCount} <span className="total-number"> / {totalCount}</span>
      </p>
      <button className="button" type="button" onClick={onClickAddBtn}>
        Add +{" "}
      </button>
    </div>
  );
}
