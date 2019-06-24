import React from "react";

export default function Thumbnail({ phone }) {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          src={phone.imgUrl}
          alt={phone.name}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text">{phone.name}</p>
            <p className="card-text card-price">{phone.price}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Edit
              </button>
            </div>
            <small className="text-muted">{phone.vendor.name}</small>
            {/* To be configured based on rating 
            <span className="fa fa-star checked" />
            <span className="fa fa-star checked" />
            <span className="fa fa-star checked" />
            <span className="fa fa-star" />
            <span className="fa fa-star" /> */}
            <small className="text-muted">Rating: {phone.stars}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
