import React from "react";
import { Link } from "react-router-dom";

export default function ListItem({ phone }) {
	return (
		<Link
			to={"/phones/" + phone.id}
			className="list-group-item list-group-item-action m-auto"
		>
			<div className="d-flex w-100 justify-content-md-start">
				<img
					src={phone.imgUrl}
					alt={phone.name}
					style={{ maxWidth: "3rem", maxHeight: "3rem" }}
				/>
				<h4 className="pl-2 pr-3">{phone.name}</h4>
				<div className="mr-auto pr-2">{phone.vendor.name}</div>
				<div className="card-price">{phone.price}</div>
				<div>
					<div className="btn-group ml-2">
						<Link
							to={"/edit-phone/" + phone.id}
							className="btn btn-sm btn-outline-secondary"
						>
							Edit
						</Link>
					</div>
				</div>
				<div>{phone.rating}</div>
			</div>
		</Link>
	);
}
