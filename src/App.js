import React, { Component } from "react";

import { connect } from "react-redux";

import { getParks, getProfile } from "./services/backend";
import ContentContainer from "./containers/ContentContainer";
import NavBar from "./components/NavigationBar";
import ModalContainer from "./containers/ModalContainer";

class App extends Component {
  componentDidMount() {
    this.handleFilter("National Park");
    if (localStorage.token) {
      getProfile().then(this.props.fetchedProfile);
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.clearTrips();
    this.props.clearUser();
  };

  handleFilter = filter => {
    if (filter.includes("National")) {
      getParks(filter).then(this.props.fetchedParks);
    } else {
      let search = "";
      if (filter === "Preserve") search = filter;
      else if (filter === "Others") search = filter;
      else search = "";
      getParks(search).then(this.props.fetchedParks);
    }
    this.props.filterParks(filter);
  };

  render() {
    return (
      <React.Fragment>
        {localStorage.token && <ModalContainer />}
        <NavBar handleLogout={this.handleLogout} handleFilter={this.handleFilter} />
        <ContentContainer />
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return state.user.loggedUser && { user: state.user.loggedUser.id };
};

let mapDispatchToProps = dispatch => {
  return {
    fetchedParks: data => dispatch({ type: "FETCHED_PARKS", data }),
    fetchedProfile: user => dispatch({ type: "FETCHED_PROFILE", user }),
    fetchedTrips: data => dispatch({ type: "FETCHED_TRIPS", data }),
    clearUser: () => dispatch({ type: "CLEAR_USER" }),
    clearTrips: () => dispatch({ type: "CLEAR_TRIPS" }),
    filterParks: filter => dispatch({ type: "FILTER_PARKS", filter })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
