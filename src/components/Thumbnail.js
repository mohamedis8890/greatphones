import React from "react";

export default function Thumbnail({ phone }) {
  return (
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <img
          class="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          src={phone.imgUrl}
          alt={phone.name}
        />
        <div class="card-body">
          <p class="card-text">{phone.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">
                View
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
              </button>
            </div>
            <small class="text-muted">{phone.vendor.name}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
