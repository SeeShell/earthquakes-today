import React, { Component } from "react";
import Header from "./Header";
import Container from "./Container";
import Table from "./Table";
import TableRows from "./TableRows";
import API from "../utils/API";
import orderBy from "lodash/orderBy";


const upArrow = (
  <svg
    className="bi bi-arrow-up"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z"
      clipRule="evenodd"
    />
  </svg>
);

const downArrow = (
  <svg
    className="bi bi-arrow-down"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z"
      clipRule="evenodd"
    />
  </svg>
);

class QuakeContainer extends Component {
  state = {
    search: "",
    quakes: [],
    filteredQuakes: [],
    sortOrder: "asc",
  };

  componentDidMount() {
    let date = new Date();
    let ISOdate = date.toISOString().split("T")[0];
    this.searchQuakes(ISOdate);
  }

  searchQuakes = (query) => {
    return API.search(query)
      .then((res) => this.setState({ quakes: res.data.features }))
      .catch((err) => console.log(err));
  };

  filterQuakes() {
    let filteredQuakes = this.state.quakes.filter((quake) => {
      return quake.properties.place
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
      // return quake.properties.place.match(this.state.search, "gi")
    });
    this.setState({ filteredQuakes });
  }
  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
    this.filterQuakes();
  };
  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  handleSort = () => {
    this.setState({
      filteredQuakes: orderBy(this.state.quakes, [
        (quake) => quake.properties.mag],
        [this.state.sortOrder === "asc" ? "desc" : "asc"]
      ),
    });

    this.state.sortOrder === "asc"
      ? this.setState({ sortOrder: "desc" })
      : this.setState({ sortOrder: "asc" });
  };

  render() {
    return (
      <>
      <Header/>
      <Container
        search={this.state.search}
        handleSearchChange={this.handleSearchChange}
      >
        <Table
          handleSort={this.handleSort}
          arrow={this.state.sortOrder === "asc" ? downArrow : upArrow}
        >
          <TableRows
            quakes={
              this.state.filteredQuakes && this.state.filteredQuakes.length > 0
                ? this.state.filteredQuakes
                : this.state.quakes
            }
          />
        </Table>
      </Container>
     </>
     
    );
  }
}

export default QuakeContainer;
