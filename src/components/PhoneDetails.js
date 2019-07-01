import React, { Component } from "react";
import { getPhone } from "../services/phonesService";

export default class PhoneDetails extends Component {
	state = {
		phone: {}
	};
	async componentDidMount() {
		const { match } = this.props;
		const id = match.params.id;

		const { data: phone } = await getPhone(id);
		this.setState({ phone });
	}

	render() {
		const { phone } = this.state;
		return (
			<div className="container" style={{ marginTop: "2em" }}>
				<div className="row">
					<div className="col-md-12">
						{phone.vendor && (
							<div className="card w-100">
								{phone.isConcept && <div className="card-header">Concept</div>}
								<img src={phone.imgUrl} className="card-img-top" alt="phone" />
								<div className="card-body">
									<div className="d-flex align-items-center justify-content-between">
										<div>
											<h5 className="card-title">{phone.name}</h5>
											<h6 className="card-subtitle mb-2 text-muted">
												{phone.vendor.name}
											</h6>
										</div>
										<div className="card-price">
											{phone.isConcept && <span>Anticipated Price</span>}
											{" $"}
											{phone.price}
										</div>
									</div>
									<p className="card-text">{phone.description}</p>
								</div>
								{phone.isConcept ? (
									<div className="card-footer">
										<button className="btn btn-success mr-1">
											<strong>Add to WishList</strong>
										</button>
									</div>
								) : (
									<div className="card-footer">
										<button className="btn btn-success mr-1">
											<strong>Buy Now</strong>
										</button>
										<button className="btn btn-primary">Add to Cart</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
