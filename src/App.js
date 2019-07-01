import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Album from "./components/Album";
import EditPhone from "./components/EditPhone";
import Footer from "./components/Footer";
import PhoneDetails from "./components/PhoneDetails";
import NotFound from "./components/NotFound";

import "./App.css";

function App() {
	return (
		<React.Fragment>
			<Header />
			<main role="main">
				<Switch>
					<Route path="/edit-phone/:id" component={EditPhone} />
					<Route path="/phones/:id" component={PhoneDetails} />
					<Route path="/" component={Album} />
					<Route path="/not-found" component={NotFound} />
					<Redirect to="/" />
				</Switch>
			</main>
			<Footer />
		</React.Fragment>
	);
}

export default App;
