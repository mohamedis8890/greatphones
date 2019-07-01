import React, { Component } from "react";
import Thumbnail from "./Thumbnail";
import NavBar from "./NavBar";
import Pagination from "./Pagination";
import Jumbotron from "./Jumbotron";
import { getPhones, getVendors } from "../services/phonesService";
import ListItem from "./ListItem";

export default class Album extends Component {
	state = {
		phones: [],
		filteredPhones: [],
		vendors: [],
		display: "thumbnail",
		sortBy: "",
		filterBy: "",
		filterValue: "",
		itemsPerPage: 9,
		currentPage: 1
	};

	async componentDidMount() {
		const { data: phones } = await getPhones();
		const { data: vendors } = await getVendors();
		const { itemsPerPage } = this.state;
		this.setState({
			phones,
			filteredPhones: phones,
			vendors,
			currentPageItems: phones.slice(0, itemsPerPage - 1)
		});
	}

	handleFilter = (filterBy, filterValue) => {
		const allPhones = this.state.phones;
		let filteredPhones = [];

		switch (filterBy) {
			case "type":
				if (filterValue === "concept") {
					filteredPhones = allPhones.filter(phone => phone.isConcept === true);
					this.setState({
						filterBy: "type",
						filterValue
					});
				}
				if (filterValue === "product") {
					filteredPhones = allPhones.filter(phone => phone.isConcept === false);
					this.setState({
						filterBy: "type",
						filterValue
					});
				}
				if (!filterValue) {
					filteredPhones = allPhones;
					this.setState({
						filterBy: "",
						filterValue: ""
					});
				}
				break;

			case "vendor":
				if (!isNaN(filterValue)) {
					filteredPhones = allPhones.filter(
						phone => phone.vendor.id === filterValue
					);
					this.setState({
						filterBy: "vendor",
						filterValue
					});
				} else {
					filteredPhones = allPhones;
					this.setState({
						filterBy: "",
						filterValue: ""
					});
				}
				break;

			case "search":
				filteredPhones = allPhones.filter(phone =>
					phone.name.toLowerCase().includes(filterValue.toLowerCase())
				);
				this.setState({
					filterBy: "",
					filterValue: ""
				});
				break;
			default:
				break;
		}
		this.setState({ filteredPhones, currentPage: 1 });
	};

	handleSort = sortBy => {
		let filteredPhones = [...this.state.filteredPhones];
		switch (sortBy) {
			case "priceAsc":
				filteredPhones.sort(function(a, b) {
					return a.price - b.price;
				});
				this.setState({ sortBy: "priceAsc" });
				break;

			case "priceDsc":
				filteredPhones.sort(function(a, b) {
					return b.price - a.price;
				});
				this.setState({ sortBy: "priceDsc" });
				break;

			case "rating":
				filteredPhones.sort(function(a, b) {
					return b.stars - a.stars;
				});
				this.setState({ sortBy: "rating" });
				break;

			default:
				break;
		}

		this.setState({ filteredPhones, currentPage: 1 });
	};

	setDisplay = display => {
		this.setState({ display });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	paginate = page => {
		const { itemsPerPage, filteredPhones } = this.state;
		const start = itemsPerPage * (page - 1);
		const end = start + itemsPerPage;
		const currentPageItems = filteredPhones.slice(start, end);
		return currentPageItems;
	};

	render() {
		const {
			filteredPhones,
			currentPage,
			vendors,
			display,
			sortBy,
			filterBy,
			filterValue,
			itemsPerPage
		} = this.state;
		return (
			<React.Fragment>
				<Jumbotron />
				<div className="album py-5 bg-light">
					<div className="container">
						<NavBar
							vendors={vendors}
							currentDisplay={display}
							sortBy={sortBy}
							filterBy={filterBy}
							filterValue={filterValue}
							onFilter={this.handleFilter}
							onSort={this.handleSort}
							onSetDisplay={this.setDisplay}
						/>
						<div className="row">
							{display === "thumbnail" ? (
								this.paginate(currentPage).map(phone => (
									<Thumbnail key={phone.id} phone={phone} />
								))
							) : (
								<div className="list-group col-md-12">
									{this.paginate(currentPage).map(phone => (
										<ListItem key={phone.id} phone={phone} />
									))}
								</div>
							)}
						</div>
						<Pagination
							items={filteredPhones}
							itemsPerPage={itemsPerPage}
							currentPage={currentPage}
							onChangePage={this.handlePageChange}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
