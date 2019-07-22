import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ParksContainer from '../containers/ParksContainer';
import TripsContainer from '../containers/TripsContainer';
import PicturesContainer from '../containers/PicturesContainer';

import NoMatch from '../components/NoMatch';
import Map from '../components/Map';
import Login from '../containers/Login';
import Profile from '../components/Profile';
import ParkDetails from '../components/ParkDetails';

function ContentContainer(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => (props.showParkDetails ? <ParkDetails /> : <Map />)} />
        <Route path="/parks" render={() => (props.showParkDetails ? <ParkDetails /> : <ParksContainer />)} />
        <Route path="/profile" render={() => (localStorage.token ? <Profile /> : <Redirect to='/login' />)} />
        <Route path="/login" render={() => (localStorage.token ? <Redirect to='/profile' /> : <Login />)} />
        <Route path="/trips" render={() => (localStorage.token ? <TripsContainer /> : <Redirect to='/' />)} />
        <Route path="/pictures" render={() => (localStorage.token ? <PicturesContainer /> : <Redirect to='/' />)} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  )
}

let mapStateToProps = state => {
  return (state.user.loggedUser ? { showParkDetails: state.park.showParkDetails, user: state.user.loggedUser.id } : { showParkDetails: state.park.showParkDetails })
}
export default connect(mapStateToProps)(ContentContainer)