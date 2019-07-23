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
      <Row className="justify-content-md-center">
        <h4 className="card-title"> <GiDirectionSign /> {props.park.name} </h4>
      </Row>
      <ButtonToolbar className="justify-content-md-center">
        <Button className="mb-2 mr-2" variant="primary" onClick={(e) => props.showParkDetails(props.park.id)}>
          Park Details
          </Button>
        <Button
          className="mb-2"
          variant="success"
          onClick={e => console.log(e.target)}>
          Log Visit
          </Button>
      </ButtonToolbar>
    </Card>
  )
}

let mapDispatchToProps = dispatch => {
  return {
    showParkDetails: parkId => dispatch({ type: "SHOW_PARK_DETAILS", parkId }),
  }
}
export default connect(null, mapDispatchToProps)(ParkCard)