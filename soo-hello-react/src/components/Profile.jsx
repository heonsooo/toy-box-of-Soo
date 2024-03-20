import React from "react";
import Avatar from "./Avatar";

export default function Profile({ imgUrl, name, job, isNew }) {
  return (
    <div className="profile">
      <Avatar isNew={isNew} imgUrl={imgUrl} />
      <h1>{name}</h1>
      <p>{job}</p>
    </div>
  );
}
