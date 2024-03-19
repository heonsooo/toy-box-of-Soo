import React from "react";

export default function Profile({ imgUrl, name, job, isNew }) {
  return (
    <div className="profile">
      <img
        className="profile-img"
        style={{ width: "400px", height: "400px" }}
        src={imgUrl}
        alt="profile-pic"
      />
      {isNew ? <span className="new">New</span> : ""}
      <h1>{name}</h1>
      <p>
        {/* if({isNew}===true){'h'}
          {<span className="new-employee">New<span/>} */}
        {job}
      </p>
    </div>
  );
}
