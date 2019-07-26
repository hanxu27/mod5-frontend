import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap'

import ParksContainer from '../containers/ParksContainer';
import TripsContainer from '../containers/TripsContainer';
import PicturesContainer from '../containers/PicturesContainer';

import NoMatch from '../components/NoMatch';
import Map from '../components/Map';
import Login from '../containers/LoginContainer';
import Profile from '../components/Profile';
import ParkDetails from '../components/ParkDetails';

function ContentContainer(props) {
  const showTrips = () => (
    props.showParkDetails ?
      <ParkDetails />
      :
      <div className="d-flex justify-content-center" >
        <Col lg={7}>
          <TripsContainer />
        </Col>
      </div>
  )

  const showProfile = () => (
    props.showParkDetails ? <ParkDetails /> : <Profile />
  )

  return (
    <Switch>
      <Route exact path="/" render={() => (props.showParkDetails ? <ParkDetails /> : <Map />)} />
      <Route path="/parks" render={() => (props.showParkDetails ? <ParkDetails /> : <ParksContainer />)} />
      <Route path="/profile" render={() => (localStorage.token ? showProfile() : <Redirect to='/login' />)} />
      <Route path="/login" render={() => (localStorage.token ? <Redirect to='/profile' /> : <Login />)} />
      <Route path="/trips" render={() => (localStorage.token ? showTrips() : <Redirect to='/' />)} />
      <Route path="/pictures" render={() => (localStorage.token ? <PicturesContainer /> : <Redirect to='/' />)} />
      <Route component={NoMatch} />
    </Switch>
  )
}

let mapStateToProps = state => {
  return (state.user.loggedUser ? { showParkDetails: state.park.showParkDetails, user: state.user.loggedUser.id } : { showParkDetails: state.park.showParkDetails })
}
export default connect(mapStateToProps)(ContentContainer)