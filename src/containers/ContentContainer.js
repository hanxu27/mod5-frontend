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
  return (
    <Switch>
      <Route exact path="/" render={() => <Map />} />
      <Route path="/parks/:id" render={props => <ParkDetails park={props.match.params.id} />} />
      <Route path="/parks" render={() => <ParksContainer />} />
      <Route
        path="/profile"
        render={() => (localStorage.token ? <Profile /> : <Redirect to="/login" />)}
      />
      <Route
        path="/login"
        render={() => (localStorage.token ? <Redirect to="/profile" /> : <Login />)}
      />
      <Route
        path="/trips"
        render={() =>
          localStorage.token ? (
            <div className="d-flex justify-content-center">
              <Col lg={7}>
                <TripsContainer />
              </Col>
            </div>
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route component={NoMatch} />
    </Switch>
  );
}

let mapStateToProps = state => state.user.loggedUser && { user: state.user.loggedUser.id };
export default connect(mapStateToProps)(ContentContainer);
