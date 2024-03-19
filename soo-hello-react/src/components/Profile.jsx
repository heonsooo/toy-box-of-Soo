import React from "react";

export default function Profile({ imgUrl, name, job }) {
  return (
    <div className="profile">
      <img
        className="profile-img"
        style={{ width: "400px", height: "400px" }}
        src={imgUrl}
        alt="profile-pic"
      />
      <h1>{name}</h1>
      <p>{job}</p>
    </div>
  );
}
