import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import TripCard from '../components/TripCard';

function TripsContainer(props) {
  let displayTrips = props.displayMyTrips && props.myTrips ? props.myTrips : props.trips
  console.log(props)
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={9}>
          {displayTrips.map(trip => (
            <TripCard trip={trip} key={trip.id} displayMyTrips={props.displayMyTrips} />
          )
          )}
        </Col>
      </Row>
    </Container >
  )
}

let mapStateToProps = state => ({ trips: state.trip.trips, myTrips: state.user.loggedUser.sorted_trips })
export default connect(mapStateToProps)(TripsContainer)