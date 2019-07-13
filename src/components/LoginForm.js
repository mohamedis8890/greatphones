import React, { Component } from "react";
import { login } from "../services/authService";
import "./LoginForm.css";

const Joi = require("joi-browser");

export default class LoginForm extends Component {
	state = {
		data: {
			email: "",
			password: ""
		},
		errors: {}
	};

	schema = {
		email: Joi.string()
			.email()
			.required()
			.label("Email"),
		password: Joi.string()
			.required()
			.label("Password")
	};

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
		this.setState({ data, errors });
	};

	doSubmit = async () => {
		try {
			const user = { ...this.state.data };
			await login(user.email, user.password);

			this.props.onUserStateChanged();
			this.props.history.push("/");
		} catch (ex) {
			if (ex.response && ex.response.status === 401) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data.message;
				this.setState({ errors });
			}
		}
	};

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validateAll();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	render() {
		const { data, errors } = this.state;
		return (
			<div className="login-body ">
				<form className="form-signin" onSubmit={this.handleSubmit}>
					<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
					<label htmlFor="inputEmail" className="sr-only">
						Email address
					</label>
					<input
						type="email"
						id="inputEmail"
						className="form-control"
						placeholder="Email address"
						name="email"
						value={data["email"]}
						onChange={this.handleChange}
						errors={errors["email"]}
						required
						autoFocus
					/>
					<label htmlFor="inputPassword" className="sr-only">
						Password
					</label>
					<input
						type="password"
						id="inputPassword"
						className="form-control"
						placeholder="Password"
						name="password"
						onChange={this.handleChange}
						value={data["password"]}
						errors={errors["password"]}
						required
					/>
					{errors["email"] && (
						<div className="alert alert-danger">{errors["email"]}</div>
					)}
					<div className="checkbox mb-3" />
					<button className="btn btn-lg btn-primary btn-block" type="submit">
						Sign in
					</button>
					<p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
				</form>
			</div>
		);
	}
}
