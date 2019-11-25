import React from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";
import { login, getCurrentUser } from "../services/authService";
import "./LoginForm.css";

function LoginForm({
	values,
	errors,
	touched,
	isSubmitting,
	onUserStateChanged
}) {
	if (getCurrentUser()) return <Redirect to="/" />;

	return (
		<div className="login-body ">
			<Form className="form-signin">
				<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
				<div>
					{errors.email && touched.email && (
						<div className="alert alert-danger">{errors.email}</div>
					)}
					<label htmlFor="email" className="sr-only">
						Email address
					</label>
					<Field
						type="email"
						name="email"
						placeholder="email"
						className="form-control"
					/>
				</div>
				<div>
					<label htmlFor="password" className="sr-only">
						Password
					</label>
					<Field type="password" name="password" className="form-control" />
				</div>
				<div className="checkbox mb-3" />
				<button
					className="btn btn-lg btn-primary btn-block"
					type="submit"
					disabled={isSubmitting}
				>
					Sign in
				</button>
				<p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
			</Form>
		</div>
	);
}

const FormikLoginForm = withFormik({
	mapPropsToValues({ email }) {
		return { email: email || "" };
	},
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email("Invalid Email")
			.required("Email required"),
		password: Yup.string().required()
	}),
	async handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
		try {
			setSubmitting(true);
			await login(values.email, values.password);
			props.onUserStateChanged();
			setSubmitting(false);
		} catch (ex) {
			console.log(ex.response);
			if (ex.response && ex.response.status === 401) {
				setErrors(ex.response.data.message);
			}
		}
	}
})(LoginForm);

export default FormikLoginForm;
