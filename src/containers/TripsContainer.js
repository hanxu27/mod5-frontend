import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import TripCard from '../components/TripCard';

function TripsContainer(props) {
  return (
    <Container>
      {props.trips.map(trip => {
        return (
          <Row className="pt-3 pb-3 justify-content-md-center">
            <Col md={9}>
              <TripCard trip={trip} />
            </Col>
          </Row>
        )
      })}
    </Container>
  )
}

let mapStateToProps = state => ({ trips: state.trip.trips })
export default connect(mapStateToProps)(TripsContainer)