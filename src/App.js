import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { getCurrentUser } from "./services/authService";
import Header from "./components/Header";
import Album from "./components/Album";
import EditPhone from "./components/EditPhone";
import Footer from "./components/Footer";
import PhoneDetails from "./components/PhoneDetails";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";

import "./App.css";

class App extends Component {
	state = {};

	componentDidMount() {
		this.setState({ user: getCurrentUser() });
	}

	handleUserState = loggedIn => {
		if (loggedIn) return this.setState({ user: getCurrentUser() });
		return this.setState({ user: null });
	};

	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<Header user={user} />
				<main role="main">
					<Switch>
						<Route path="/register" component={RegisterForm} />
						<Route
							path="/logout"
							render={props => (
								<Logout
									{...props}
									onUserStateChanged={() => this.handleUserState(false)}
								/>
							)}
						/>
						<Route
							path="/login"
							render={props => (
								<LoginForm
									{...props}
									onUserStateChanged={() => this.handleUserState(true)}
								/>
							)}
						/>
						<Route path="/edit-phone/:id" component={EditPhone} />
						<Route path="/phones/:id" component={PhoneDetails} />
						<Route
							path="/"
							render={props => <Album {...props} user={user} />}
						/>
						<Route path="/not-found" component={NotFound} />
						<Redirect to="/" />
					</Switch>
				</main>
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
