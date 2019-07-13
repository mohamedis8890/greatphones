import React from "react";
import { Link } from "react-router-dom";

export default function Jumbotron({ user }) {
	return (
		<section className="jumbotron text-center">
			<div className="container">
				<h1 className="jumbotron-heading">
					You've stepped into a Sci-Fi Reality
				</h1>
				<p className="lead text-muted">
					If you're looking to stay ahead of the game when it comes to the
					latest smartphone technology, then these fiercely futuristic phones
					will definitely have you equipped with the most sophisticated and
					sleek gadgets around.
				</p>
				{!user && (
					<p>
						<Link to="/register" className="btn btn-primary my-2">
							Join Us
						</Link>
					</p>
				)}
			</div>
		</section>
	);
}
