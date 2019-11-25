import React from "react";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";

import registerUser from "../services/userService";

function RegisterForm({ values, errors, touched, isSubmitting }) {
	return (
		<div className="container" style={{ marginTop: "2em" }}>
			<div className="row">
				<div className="col-md-12">
					<Form>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<Field
								type="input"
								className={
									errors["name"] ? "form-control is-invalid" : "form-control"
								}
								name="name"
							/>
							{touched.name && errors.name && (
								<div className="invalid-feedback">{errors["name"]}</div>
							)}
						</div>

						<div className="form-group">
							<label htmlFor="email">Email address</label>
							<Field
								type="email"
								className={
									errors["email"] ? "form-control is-invalid" : "form-control"
								}
								name="email"
							/>
							{touched.email && errors.email && (
								<div className="invalid-feedback">{errors["email"]}</div>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<Field
								type="password"
								className={
									errors["password"]
										? "form-control is-invalid"
										: "form-control"
								}
								name="password"
							/>
							{touched.password && errors.password && (
								<div className="invalid-feedback">{errors["password"]}</div>
							)}
						</div>

						<div className="form-group">
							<label htmlFor="passwordConfirm">Confirm Password</label>
							<input
								type="password"
								className={
									errors["passwordConfirm"]
										? "form-control is-invalid"
										: "form-control"
								}
								name="passwordConfirm"
							/>
							{touched.passwordConfirm && errors.passwordConfirm && (
								<div className="invalid-feedback">
									{errors["passwordConfirm"]}
								</div>
							)}
						</div>
						<div className="form-group">
							<button
								className="btn btn-lg btn-primary btn-block"
								type="submit"
								disabled={isSubmitting}
							>
								Register
							</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}

const FormikRegisterForm = withFormik({
	mapPropsToValues(props) {
		return { email: "", name: "", password: "", passwordConfirm: "" };
	},
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email("Invalid Email")
			.required("Email required"),
		name: Yup.string().required("Your name is required"),
		password: Yup.string()
			.min(6, "Password need to be 6 characters long at least")
			.max(30, "Password need to be 30 characters at most")
			.required("Password is Required"),
		passwordConfirm: Yup.string().when("password", {
			is: val => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf(
				[Yup.ref("password")],
				"Both passwords need to be the same"
			)
		})
	}),
	async handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
		try {
			setSubmitting(true);
			const user = {
				name: values.name,
				email: values.email,
				password: values.password,
				isAdmin: false
			};
			await registerUser(user);
			setSubmitting(false);
		} catch (ex) {
			console.log(ex);
		}
	}
})(RegisterForm);

export default FormikRegisterForm;
