import React from 'react'
import { connect } from 'react-redux'
import { Card, Button, ButtonToolbar } from 'react-bootstrap'
import { deleteTrip, getProfile } from '../services/backend'

function TripCard(props) {
  const handleDelete = async () => {
    await deleteTrip(props.trip.id)
    getProfile().then(props.fetchedProfile)
  }

  const handleEdit = e => {
    const { title, description, season, year, id } = props.trip
    let content = { title, description, season, year, id }
    props.openModal(e.target.name, props.trip.park, "Edit", content)
  }

  return (
    <React.Fragment>
      {props.trip.park &&
        <Card className="m-1">
          <Card.Header as="h4" onClick={e => props.showParkDetails(props.trip.park.id)} className="text-light" id="trip-card-title" style={{ background: 'rgb(200, 110, 120)' }} >
            {props.trip.park.fullname}
          </Card.Header>

          <Card.Body>
            <h6 className="text-body">{`${props.trip.title}`}</h6>
            <h6 className="text-body">{`${props.trip.season} ${props.trip.year}`}</h6>
            <p className="text-dark"><small>{props.trip.description}</small></p>
            <h6 className="text-body"><small>By: {`${props.trip.user.username}`}</small></h6>
            <Card.Img variant='bottom' style={{ width: '25%', maxHeight: '20rem', borderRadius: '10px' }} src={props.trip.user.profile_url} />
          </Card.Body>
          {props.displayMyTrips &&
            <ButtonToolbar className="justify-content-md-center">
              <Button className="mb-2 mr-1 ml-1" variant="primary" name="trip" onClick={handleEdit}>Edit</Button>
              <Button className="mb-2 mr-1 ml-1" variant="danger" onClick={handleDelete}>Delete</Button>
            </ButtonToolbar>
          }
        </Card>
      }
    </React.Fragment>
  )
}
let mapDispatchToProps = dispatch => ({
  showParkDetails: parkId => dispatch({ type: "SHOW_PARK_DETAILS", parkId }),
  fetchedProfile: user => dispatch({ type: "FETCHED_PROFILE", user }),
  openModal: (showModal, park, request, content) => dispatch({ type: "OPEN_MODAL", showModal, park, request, content })
})
export default connect(null, mapDispatchToProps)(TripCard)