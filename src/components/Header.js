import React from "react";

export default function Header() {
  return (
    <React.Fragment>
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">About</h4>
              <p class="text-muted">
                Mobile phone business is one of the most rapid growing
                industries. Not so long ago, the popular check phone was Nokia
                3310 with mere basic functions: call, text messaging and the
                only bearable game, snake. However, significant improvement has
                been made since then. We now have so many variety of phones that
                surpasses the basic function, smart phones for example allows
                you to connect to social media conveniently, GPS, video
                conferencing etc. What will be next? What we can expect from the
                next generation of handsets that will be available in the next
                10 year? Some of the few features that will be built in new cell
                phones are OLED screen and enhancement in flexibility.
              </p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <ul class="list-unstyled">
                <li>
                  <a href="/login" class="text-white">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/register" class="text-white">
                    Register
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container d-flex justify-content-between">
          <a href="/" class="navbar-brand d-flex align-items-center">
            <img src="phone.png" alt="logo" width="24" height="24" />
            <strong style={{ marginLeft: "10px" }}>Greet Phones</strong>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
