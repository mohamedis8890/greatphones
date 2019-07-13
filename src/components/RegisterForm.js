import React, { Component } from "react";
import Joi from "joi-browser";

import registerUser from "../services/userService";

export default class RegisterForm extends Component {
	state = {
		data: {
			name: "",
			email: "",
			password: "",
			passwordConfirm: ""
		},
		errors: {}
	};

	schema = {
		name: Joi.string()
			.required()
			.label("Name"),
		email: Joi.string()
			.email()
			.required()
			.label("Email"),
		password: Joi.string()
			.min(6)
			.max(30)
			.required()
			.label("Password"),
		passwordConfirm: Joi.string().required()
	};

	validate = ({ name, value }) => {
		if (name === "passwordConfirm") {
			const error = {};
			const { password } = this.state.data;
			if (value === "")
				return (error.passwordConfirm =
					"Password Confirmation connot be empty");
			return value !== password
				? (error.passwordConfirm = "Passwords must match")
				: null;
		} else {
			const obj = { [name]: value };
			const schema = { [name]: this.schema[name] };
			const { error } = Joi.validate(obj, schema);
			return error ? error.details[0].message : null;
		}
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
		this.setState({ data, errors });
	};

	mapToModel = user => {
		return {
			name: user.name,
			email: user.email,
			password: user.password,
			isAdmin: false
		};
	};

	doSubmit = async () => {
		try {
			const { data: user } = { ...this.state };
			await registerUser(this.mapToModel(user));

			this.props.history.push("/");
		} catch (ex) {
			console.error(ex);
		}
	};

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validateAll();
		this.setState({ errors: errors || {} });
		console.log(errors);
		if (errors) return;

		this.doSubmit();
	};

	render() {
		const { data, errors } = this.state;

		return (
			<div className="container" style={{ marginTop: "2em" }}>
				<div className="row">
					<div className="col-md-12">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="inputname">Name</label>
								<input
									type="input"
									id="inputname"
									className={
										errors["name"] ? "form-control is-invalid" : "form-control"
									}
									name="name"
									value={data["name"]}
									onChange={this.handleChange}
									errors={errors["name"]}
									required
									autoFocus
								/>
								<div className="invalid-feedback">{errors["name"]}</div>
							</div>

							<div className="form-group">
								<label htmlFor="email">Email address</label>
								<input
									type="email"
									id="email"
									className={
										errors["email"] ? "form-control is-invalid" : "form-control"
									}
									name="email"
									value={data["email"]}
									onChange={this.handleChange}
									errors={errors["email"]}
									required
									autoFocus
								/>
								<div className="invalid-feedback">{errors["email"]}</div>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									id="password"
									className={
										errors["password"]
											? "form-control is-invalid"
											: "form-control"
									}
									name="password"
									onChange={this.handleChange}
									value={data["password"]}
									errors={errors["password"]}
									required
								/>
								<div className="invalid-feedback">{errors["password"]}</div>
							</div>

							<div className="form-group">
								<label htmlFor="passwordConfirm">Confirm Password</label>
								<input
									type="password"
									id="passwordConfirm"
									className={
										errors["passwordConfirm"]
											? "form-control is-invalid"
											: "form-control"
									}
									name="passwordConfirm"
									onChange={this.handleChange}
									value={data["passwordConfirm"]}
									errors={errors["passwordConfirm"]}
									required
								/>
								<div className="invalid-feedback">
									{errors["passwordConfirm"]}
								</div>
							</div>
							<div className="form-group">
								<button
									className="btn btn-lg btn-primary btn-block"
									type="submit"
								>
									Register
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
