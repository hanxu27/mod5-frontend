import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";

import ParksContainer from "../containers/ParksContainer";
import TripsContainer from "../containers/TripsContainer";

import NoMatch from "../components/NoMatch";
import Map from "../components/Map";
import Login from "../containers/LoginContainer";
import Profile from "../components/Profile";
import ParkDetails from "../components/ParkDetails";

function ContentContainer(props) {
  const showTrips = () =>
    props.showParkDetails ? (
      <ParkDetails />
    ) : (
      <div className="d-flex justify-content-center">
        <Col lg={7}>
          <TripsContainer />
        </Col>
      </div>
    );

  const showProfile = () => (props.showParkDetails ? <ParkDetails /> : <Profile />);
  const showPark = id => {
    console.log("In content containter", id);
    props.showDetails(id);
    return <ParkDetails />;
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          props.showParkDetails ? <Redirect to={"/parks/" + props.showParkDetails} /> : <Map />
        }
      />
      <Route path="/parks/:id" render={props => showPark(props.match.params.id)} />
      <Route
        path="/parks"
        render={() =>
          props.showParkDetails ? (
            <Redirect to={"/parks/" + props.showParkDetails} />
          ) : (
            <ParksContainer />
          )
        }
      />
      <Route
        path="/profile"
        render={() => (localStorage.token ? showProfile() : <Redirect to="/login" />)}
      />
      <Route
        path="/login"
        render={() => (localStorage.token ? <Redirect to="/profile" /> : <Login />)}
      />
      <Route
        path="/trips"
        render={() => (localStorage.token ? showTrips() : <Redirect to="/" />)}
      />
      <Route component={NoMatch} />
    </Switch>
  );
}

let mapStateToProps = state => {
  return state.user.loggedUser
    ? {
        showParkDetails: state.park.showParkDetails,
        user: state.user.loggedUser.id
      }
    : { showParkDetails: state.park.showParkDetails };
};
let mapDispatchToProps = dispatch => ({
  showDetails: parkId => dispatch({ type: "SHOW_PARK_DETAILS", parkId })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentContainer);
