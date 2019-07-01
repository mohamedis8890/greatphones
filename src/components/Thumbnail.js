import React from "react";
import { Link } from "react-router-dom";

export default function Thumbnail({ phone }) {
	const starsArray = [
		{ 1: false },
		{ 2: false },
		{ 3: false },
		{ 4: false },
		{ 5: false }
	];
	for (let i = 0; i < Math.floor(phone.stars); i++) {
		starsArray[i] = { [i]: true };
	}

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
					<div>
						{starsArray.map(star => {
							if (Object.values(star)[0])
								return (
									<span
										key={Object.keys(star)[0]}
										className="fa fa-star checked"
									/>
								);
							else
								return (
									<span className="fa fa-star" key={Object.keys(star)[0]} />
								);
						})}
					</div>
					<div className="d-flex justify-content-between align-items-center">
						<div className="btn-group">
							<Link
								to={"/phones/" + phone.id}
								className="btn btn-sm btn-outline-secondary"
							>
								View
							</Link>
							<Link
								to={"/edit-phone/" + phone.id}
								className="btn btn-sm btn-outline-secondary"
							>
								Edit
							</Link>
						</div>
						<small className="text-muted">{phone.vendor.name}</small>
					</div>
				</div>
			</div>
		</div>
	);
}
