import React from "react";

export default function Profile(props) {
  return (
    <div className="profile">
      <img
        className="profile-img"
        style={{ width: "400px", height: "400px" }}
        src={props.imgUrl}
        alt="profile-pic"
      />
      <h1>{props.name}</h1>
      <p>{props.job}</p>
    </div>
  );
}
