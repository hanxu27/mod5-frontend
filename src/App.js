import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import { getParks, getTrips, getProfile } from './services/backend';

import ParksContainer from './containers/ParksContainer';

import NavBar from './components/NavigationBar';
import NoMatch from './components/NoMatch';
import Map from './components/Map';
import Login from './containers/Login';

class App extends Component {

  componentDidMount() {
    getParks().then(this.props.fetchedParks)
    getProfile() && getProfile().then(this.props.fetchedProfile)
    getTrips() && getTrips().then(this.props.fetchedTrips)
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    this.forceUpdate()
  }

  render() {
    return (
      <React.Fragment>
        <NavBar handleLogout={this.handleLogout} />
        <Router>
          <Switch>
            <Route exact path="/" render={
              () => (<Map />)
            } />
            <Route path="/parks" render={
              () => (<ParksContainer />)
            } />
            <Route path="/login" render={
              () => (<Login />)
            } />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

let mapDispatchToProps = dispatch => {
  return {
    fetchedParks: data => dispatch({ type: "FETCHED_PARKS", data }),
    fetchedTrips: data => dispatch({ type: "FETCHED_TRIPS", data }),
    fetchedProfile: user => dispatch({ type: "FETCHED_PROFILE", user })
  }
}
export default connect(null, mapDispatchToProps)(App)
