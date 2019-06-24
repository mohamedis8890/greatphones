import React from "react";

export default function ListItem({ phone }) {
  return (
    <button className="list-group-item list-group-item-action m-auto">
      <div className="d-flex w-100 justify-content-md-start">
        <img
          src={phone.imgUrl}
          alt={phone.name}
          style={{ maxWidth: "3rem", maxHeight: "3rem" }}
        />
        <h4 className="pl-2 pr-3">{phone.name}</h4>
        <div className="mr-auto pr-2">{phone.vendor.name}</div>
        <div className="card-price">{phone.price}</div>
        <div>{phone.rating}</div>
      </div>
    </button>
  );
}
