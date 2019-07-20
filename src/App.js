import React, { Component } from 'react';

import { connect } from 'react-redux'

import { getParks, getTrips, getProfile } from './services/backend';
import ContentContainer from './containers/ContentContainer';
import NavBar from './components/NavigationBar';


class App extends Component {

  componentDidMount() {
    getParks().then(this.props.fetchedParks)
    getProfile() && getProfile().then(this.props.fetchedProfile)
    getTrips() && getTrips().then(this.props.fetchedTrips)
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    this.props.clearTrips()
    this.props.clearUser()

  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <NavBar handleLogout={this.handleLogout} />
        <ContentContainer />
      </React.Fragment>
    )
  }
}

let mapStateToProps = state => {
  return (state.user.loggedUser && { user: state.user.loggedUser.id })
}

let mapDispatchToProps = dispatch => {
  return {
    fetchedParks: data => dispatch({ type: "FETCHED_PARKS", data }),
    fetchedTrips: data => dispatch({ type: "FETCHED_TRIPS", data }),
    fetchedProfile: user => dispatch({ type: "FETCHED_PROFILE", user }),
    clearUser: () => dispatch({ type: "CLEAR_USER" }),
    clearTrips: () => dispatch({ type: "CLEAR_TRIPS" })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
