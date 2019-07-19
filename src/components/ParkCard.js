import React from 'react'
import { GiDirectionSign } from 'react-icons/gi'
import { Card, Button, Image, ButtonToolbar, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

class ParkCard extends React.PureComponent {
  render() {
    const img = this.props.park.pictures

    return (
      <Card className="m-1" style={{ borderRadius: "15px" }}>
        <Image
          className="p-2 card-img-bottom"
          onClick={(e) => this.props.showPark(this.props.park)}
          style={{ maxHeight: '45rem', maxWidth: '45rem', borderRadius: "15px" }}
          src={img.url} alt={img.caption} />
        <Row className="justify-content-md-center">
          <h4 className="card-title"> <GiDirectionSign /> {this.props.park.name} </h4>
        </Row>
        <ButtonToolbar className="justify-content-md-center">
          <Button
            className="mb-3"
            variant="success"
            onClick={e => console.log(e.target)}>
            Log Visit
          </Button>
        </ButtonToolbar>
      </Card>
    )
  }
}

// let mapStateToProps = state => ({ park: state.park.showParkDetails })
export default (ParkCard)