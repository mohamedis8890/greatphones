import React, { Component } from "react";

export default class NavBar extends Component {
	onFilter(filterBy, filterValue) {
		this.props.onFilter(filterBy, filterValue);
		console.log(filterBy, filterValue);
	}
	onSort(sortBy) {
		this.props.onSort(sortBy);
	}

	onSetDisplay(display) {
		this.props.onSetDisplay(display);
	}
	render() {
		const {
			vendors,
			currentDisplay,
			sortBy,
			filterBy,
			filterValue
		} = this.props;
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light rounded custom-navbar">
				<div className="collapse navbar-collapse" id="navbarsExample09">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<div
								className="btn-group"
								role="group"
								aria-label="Basic example"
							>
								<button
									type="button"
									className={
										currentDisplay === "thumbnail"
											? "btn btn-light active"
											: "btn btn-light"
									}
									onClick={e => this.onSetDisplay("thumbnail")}
								>
									<img
										src="thumbnail.png"
										alt="Dispplay Thumbnail"
										style={{ width: "24px", height: "24px" }}
									/>
								</button>
								<button
									type="button"
									className={
										currentDisplay === "list"
											? "btn btn-light active"
											: "btn btn-light"
									}
									onClick={e => this.onSetDisplay("list")}
								>
									<img
										src="list.png"
										alt="Display List"
										style={{ width: "24px", height: "24px" }}
									/>
								</button>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="/"
								id="dropdown09"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Item Type
							</a>
							<div className="dropdown-menu" aria-labelledby="dropdown09">
								<button
									className={
										filterBy === "" ? "dropdown-item active" : "dropdown-item"
									}
									onClick={() => this.onFilter("type", null)}
								>
									All Items
								</button>
								<button
									className={
										filterBy === "type" && filterValue === "concept"
											? "dropdown-item active"
											: "dropdown-item"
									}
									onClick={() => this.onFilter("type", "concept")}
								>
									Concept
								</button>
								<button
									className={
										filterBy === "type" && filterValue === "product"
											? "dropdown-item active"
											: "dropdown-item"
									}
									onClick={() => this.onFilter("type", "product")}
								>
									Product
								</button>
							</div>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="/"
								id="dropdown09"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Vendor
							</a>
							<div className="dropdown-menu" aria-labelledby="dropdown09">
								<button
									className={
										filterBy === "vendor" && isNaN(filterValue)
											? "dropdown-item active"
											: "dropdown-item"
									}
									onClick={() => this.onFilter("vendor", NaN)}
								>
									All Vendors
								</button>
								{vendors.map(vendor => (
									<button
										key={vendor.id}
										className={
											filterBy === "vendor" && filterValue === vendor.id
												? "dropdown-item active"
												: "dropdown-item"
										}
										onClick={() => this.onFilter("vendor", vendor.id)}
									>
										{vendor.name}
									</button>
								))}
							</div>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="/"
								id="dropdown09"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Sort By
							</a>
							<div className="dropdown-menu" aria-labelledby="dropdown09">
								<button
									className={
										sortBy === "priceAsc"
											? "dropdown-item active"
											: "dropdown-item"
									}
									onClick={() => this.onSort("priceAsc")}
								>
									Price Ascending
								</button>
								<button
									className={
										sortBy === "priceDsc"
											? "dropdown-item active"
											: "dropdown-item"
									}
									onClick={() => this.onSort("priceDsc")}
								>
									Price Descending
								</button>
								<button
									className={
										sortBy === "rating"
											? "dropdown-item active"
											: "dropdown-item"
									}
									onClick={() => this.onSort("rating")}
								>
									Rating
								</button>
							</div>
						</li>
					</ul>
					<form className="form-inline my-2 my-md-0">
						<input
							className="form-control"
							type="text"
							placeholder="Search"
							aria-label="Search"
							onChange={e => this.onFilter("search", e.currentTarget.value)}
						/>
					</form>
				</div>
			</nav>
		);
	}
}
