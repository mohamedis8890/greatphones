import React from "react";
import $ from "jquery";

import { Link } from "react-router-dom";

export default function Header({ user }) {
	let welcomeMessage = "";

	if (user) {
		welcomeMessage = "Welcome, " + user.email.replace("@greatphones.com", "");
	}

	return (
		<React.Fragment>
			<div className="collapse bg-dark" id="navbarHeader">
				<div className="container">
					<div className="row">
						<div className="col-sm-8 col-md-7 py-4">
							<h4 className="text-white">About</h4>
							<p className="text-muted">
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
						<div className="col-sm-4 offset-md-1 py-4">
							<ul className="list-unstyled">
								<li style={{ color: "#fff" }}>{welcomeMessage}</li>
								{!user && (
									<li>
										<Link
											to="/login"
											className="text-white"
											onClick={() => $("#navbar-toggle").click()}
										>
											Login
										</Link>
									</li>
								)}
								{!user && (
									<li>
										<Link
											to="/register"
											className="text-white"
											onClick={() => $("#navbar-toggle").click()}
										>
											Register
										</Link>
									</li>
								)}
								{user && (
									<li>
										<Link
											to="/logout"
											className="text-white"
											onClick={() => $("#navbar-toggle").click()}
										>
											Logout
										</Link>
									</li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="navbar navbar-dark bg-dark shadow-sm">
				<div className="container d-flex justify-content-between">
					<a href="/" className="navbar-brand d-flex align-items-center">
						<img src="phone.png" alt="logo" width="24" height="24" />
						<strong style={{ marginLeft: "10px" }}>Great Phones</strong>
					</a>
					<button
						className="navbar-toggler"
						type="button"
						id="navbar-toggle"
						data-toggle="collapse"
						data-target="#navbarHeader"
						aria-controls="navbarHeader"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}
