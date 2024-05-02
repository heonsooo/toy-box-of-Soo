import React from "react";

export default function Avatar({ imgUrl, isNew }) {
  return (
    <div className="avatar">
      <img
        className="avatar-img"
        style={{ width: "400px", height: "400px" }}
        src={imgUrl}
        alt="profile-pic"
      />
      {isNew ? <span className="new">New</span> : ""}
    </div>
  );
}
