import React from 'react'
import { GiDirectionSign } from 'react-icons/gi'
import { Card, Button, Image, ButtonToolbar, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

const ParkCard = (props) => {
  const img = props.park.pictures

  return (
    <Card className="m-1" style={{ borderRadius: "15px" }}>
      {img &&
        <Image
          className="p-2 card-img-bottom"
          style={{ maxHeight: '45rem', maxWidth: '45rem', borderRadius: "15px" }}
          src={img.url} alt={img.caption} />
      }
      <Card.Title>
        <Row className="m-2 justify-content-md-center"><GiDirectionSign /> {props.park.name} </Row>
      </Card.Title>
      <ButtonToolbar className="justify-content-md-center">
        <Button className="mb-2 mr-1 ml-1" variant="primary" onClick={(e) => props.showParkDetails(props.park.id)}>
          Park Details
        </Button>
        <Button
          className="mb-2 mr-1 ml-1"
          variant="danger"
          name="trip"
          onClick={e => props.openModal(e.target.name, props.park.id)}>
          Log Visit
          </Button>
        <Button
          className="mb-2 mr-1 ml-1"
          variant="success"
          name="picture"
          onClick={e => props.openModal(e.target.name, props.park.id)}>
          Add Photo
          </Button>
      </ButtonToolbar>
    </Card>
  )
}

let mapDispatchToProps = dispatch => {
  return {
    showParkDetails: parkId => dispatch({ type: "SHOW_PARK_DETAILS", parkId }),
    openModal: (showModal, parkId) => dispatch({ type: "OPEN_MODAL", showModal, parkId })
  }
}
export default connect(null, mapDispatchToProps)(ParkCard)