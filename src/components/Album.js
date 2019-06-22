import React from "react";
import Thumbnail from "./Thumbnail";

export default function Album() {
  const fakePhone = {
    id: 0,
    name: "fake",
    vendor: {
      id: 0,
      name: "fakeVendor"
    },
    isConcept: true,
    description: "Just a Fake phone",
    price: 99.99,
    imgUrl:
      "https://assets.hongkiat.com/uploads/futuristic-phones/kyocera_lexible.jpg",
    stars: 3.5
  };
  return (
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <Thumbnail phone={fakePhone} />
        </div>
      </div>
    </div>
  );
}
