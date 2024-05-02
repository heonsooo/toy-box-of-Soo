// import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";

function App() {
  const myName = "Soo";
  const friendName = "Joe";
  const fruits = ["apple", "banana", "orange"];

  return (
    // <>
    <Fragment>
      <h1> Hello, React ! </h1>
      <p> hi ! {myName}</p>
      <p>{`hi ! ${friendName}`}</p>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={`fruit${index}`}>{fruit}</li>
        ))}
      </ul>
      <img
        style={{ width: "200px", height: "100px" }}
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="img"
      />
    </Fragment>
    // </>
  );
}

export default App;
