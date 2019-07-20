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

function ContentContainer(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Map} />
        <Route path="/parks" component={ParksContainer} />
        <Route path="/profile" render={() => (props.user ? <Profile /> : <Redirect to='/login' />)} />
        <Route path="/login" render={() => (props.user ? <Redirect to='/profile' /> : <Login />)} />
        {props.user && <Route path="/trips" component={TripsContainer} />}
        {props.user && <Route path="/pictures" component={PicturesContainer} />}
        <Route component={NoMatch} />
      </Switch>
    </Router>
  )
}

let mapStateToProps = state => {
  return (state.user.loggedUser && { user: state.user.loggedUser.id })
}
export default connect(mapStateToProps)(ContentContainer)