import React, { Component } from "react";
import { getPhone, savePhone, getVendors } from "../services/phonesService";
// import Joi from "joi-browser";
const Joi = require("joi-browser");

export default class EditPhone extends Component {
	state = {
		data: {
			name: "",
			vendorId: "",
			isConcept: false,
			description: "",
			price: "",
			imgUrl: "",
			stars: ""
		},
		vendors: [],
		imageUrlCheck: "",
		errors: {}
	};

	schema = {
		id: Joi.number(),
		name: Joi.string()
			.required()
			.label("Phone Name"),
		isConcept: Joi.boolean()
			.required()
			.label("Concept or Product"),
		description: Joi.string().label("Description"),
		vendorId: Joi.number()
			.required()
			.label("Vendor"),
		price: Joi.number()
			.required()
			.label("Price"),
		imgUrl: Joi.string()
			.required()
			.label("Image URL"),
		stars: Joi.number()
			.min(0)
			.max(5)
			.required()
			.label("Rating")
	};

	mapToViewModel = phone => {
		return {
			id: phone.id,
			name: phone.name,
			vendorId: phone.vendor.id,
			description: phone.description,
			isConcept: phone.isConcept,
			price: phone.price,
			imgUrl: phone.imgUrl,
			stars: phone.stars
		};
	};

	mapToModel = phone => {
		const vendors = [...this.state.vendors];
		return {
			id: phone.id,
			name: phone.name,
			// eslint-disable-next-line
			vendor: vendors.find(vendor => vendor.id == phone.vendorId),
			description: phone.description,
			isConcept: phone.isConcept,
			price: phone.price,
			imgUrl: phone.imgUrl,
			stars: phone.stars
		};
	};

	populatePhone = async () => {
		const { id } = this.props.match.params;
		try {
			const { data } = await getPhone(id);
			this.setState({
				data: this.mapToViewModel(data)
			});
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace("/not-found");
		}
	};

	populateVendors = async () => {
		try {
			const { data: vendors } = await getVendors();
			this.setState({ vendors });
		} catch (ex) {
			console.error(ex.response);
		}
	};

	async componentDidMount() {
		const { id } = this.props.match.params;
		await this.populateVendors();
		await this.populatePhone(id);
		this.handleCheckImage();
	}

	validate = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	validateAll = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validate(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.type === "checkbox" ? input.checked : input.value;
		console.log(data);
		this.mapToModel(data);
		this.setState({ data, errors });
	};

	handleCheckImage = () => {
		const { data } = this.state;
		this.setState({
			imageUrlCheck: data.imgUrl
		});
	};

	doSubmit = async () => {
		try {
			const phone = { ...this.state.data };
			await savePhone(this.mapToModel(phone));
			this.props.history.push("/");
		} catch (ex) {
			console.error(ex);
		}
	};

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validateAll();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleCancel = () => {
		this.props.history.push("/");
	};

	render() {
		const { data, vendors, errors } = this.state;

		return (
			<div className="container" style={{ marginTop: "2em" }}>
				<div className="row">
					<div className="col-md-12">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="name">Phone Name</label>
								<input
									type="text"
									className={
										errors["name"] ? "form-control is-invalid" : "form-control"
									}
									id="name"
									name="name"
									value={data["name"]}
									onChange={this.handleChange}
									errors={errors["name"]}
								/>
								<div className="invalid-feedback">{errors["name"]}</div>
							</div>
							<div className="form-group">
								<label htmlFor="price">Phone Price</label>
								<input
									type="number"
									className={
										errors["price"] ? "form-control is-invalid" : "form-control"
									}
									id="price"
									name="price"
									value={data["price"]}
									onChange={this.handleChange}
									errors={errors["price"]}
								/>
								<div className="invalid-feedback">{errors["price"]}</div>
							</div>

							<div className="form-group rating-form-group">
								<label style={{ float: "left" }}>Rating </label>
								<div className="rate">
									<input
										type="radio"
										id="star5"
										name="stars"
										value="5"
										checked={Math.floor(data.stars) === 5}
										onChange={this.handleChange}
									/>
									<label htmlFor="star5" title="text">
										5 stars
									</label>
									<input
										type="radio"
										id="star4"
										name="stars"
										value="4"
										checked={Math.floor(data.stars) === 4}
										onChange={this.handleChange}
									/>
									<label htmlFor="star4" title="text">
										4 stars
									</label>
									<input
										type="radio"
										id="star3"
										name="stars"
										value="3"
										checked={Math.floor(data.stars) === 3}
										onChange={this.handleChange}
									/>
									<label htmlFor="star3" title="text">
										3 stars
									</label>
									<input
										type="radio"
										id="star2"
										name="stars"
										value="2"
										checked={Math.floor(data.stars) === 2}
										onChange={this.handleChange}
									/>
									<label htmlFor="star2" title="text">
										2 stars
									</label>
									<input
										type="radio"
										id="star1"
										name="stars"
										value="1"
										checked={Math.floor(data.stars) === 1}
										onChange={this.handleChange}
									/>
									<label htmlFor="star1" title="text">
										1 star
									</label>
								</div>

								<div className="invalid-feedback">{errors["stars"]}</div>
							</div>

							<div className="custom-control custom-switch">
								<input
									type="checkbox"
									className="custom-control-input"
									id="isConcept"
									name="isConcept"
									checked={data["isConcept"]}
									onChange={this.handleChange}
									errors={errors["isConcept"]}
								/>
								<label className="custom-control-label" htmlFor="isConcept">
									Concept
								</label>
								<div className="invalid-feedback">{errors["isConcept"]}</div>
							</div>

							<div className="form-group">
								<label htmlFor="vendor">Vendor</label>
								<select
									id="vendorID"
									name="vendorId"
									value={data["vendorId"]}
									onChange={this.handleChange}
									className={
										errors["vendorId"]
											? "form-control is-invalid"
											: "form-control"
									}
								>
									<option value="">Choose...</option>
									{vendors.map(vendor => (
										<option key={vendor.id} value={vendor.id}>
											{vendor.name}
										</option>
									))}
								</select>
								<div className="invalid-feedback">
									"Vendor" should be selected
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea
									className={
										errors["description"]
											? "form-control is-invalid"
											: "form-control"
									}
									id="description"
									name="description"
									value={data["description"]}
									onChange={this.handleChange}
									errors={errors["description"]}
								/>
								<div className="invalid-feedback">{errors["description"]}</div>
							</div>
							<div className="form-group input-group mb-3">
								<input
									type="text"
									className={
										errors["imgUrl"]
											? "form-control is-invalid"
											: "form-control"
									}
									placeholder="Image URL"
									id="imgUrl"
									name="imgUrl"
									value={data["imgUrl"]}
									onChange={this.handleChange}
									errors={errors["imgUrl"]}
								/>
								<div className="input-group-append">
									<button
										className="btn btn-outline-secondary"
										type="button"
										id="button-check"
										onClick={this.handleCheckImage}
									>
										Check
									</button>
								</div>
								<div className="invalid-feedback">{errors["imgUrl"]}</div>
							</div>
							<div className="form-group">
								<img
									src={this.state.imageUrlCheck}
									className="img-fluid"
									alt="Preview Phone"
								/>
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
								<button
									type="button"
									className="btn btn-secondary ml-1"
									onClick={this.handleCancel}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
