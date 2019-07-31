import React from "react";
import { GiDirectionSign } from "react-icons/gi";
import { Card, Button, Image, ButtonToolbar, Row } from "react-bootstrap";
import { connect } from "react-redux";

const ParkCard = props => {
  const img = props.park.pictures;

  return (
    <Card className="m-1 shadow" style={{ borderRadius: "15px" }}>
      {img && (
        <Image
          className="p-3 card-img-bottom shadow"
          style={{ maxHeight: "45rem", maxWidth: "45rem", borderRadius: "30px" }}
          src={img.url}
          alt={img.caption}
        />
      )}
      <Card.Title>
        <Row className="m-2 justify-content-md-center text-dark">
          <GiDirectionSign /> {props.park.name}{" "}
        </Row>
      </Card.Title>
      <ButtonToolbar className="justify-content-md-center">
        <Button
          className="mb-2 mr-1 ml-1"
          variant="primary"
          onClick={e => props.showParkDetails(props.park.id)}
        >
          Park Details
        </Button>
        {props.user.id && (
          <React.Fragment>
            <Button
              className="mb-2 mr-1 ml-1"
              variant="danger"
              name="trip"
              onClick={e => props.openModal(e.target.name, props.park, "Create")}
            >
              Log Visit
            </Button>
            <Button
              className="mb-2 mr-1 ml-1"
              variant="success"
              name="picture"
              onClick={e => props.openModal(e.target.name, props.park, "Add")}
            >
              Add Photo
            </Button>
          </React.Fragment>
        )}
      </ButtonToolbar>
    </Card>
  );
};

let mapStateToProps = state => ({ user: state.user.loggedUser });
let mapDispatchToProps = dispatch => ({
  showParkDetails: parkId => dispatch({ type: "SHOW_PARK_DETAILS", parkId }),
  openModal: (showModal, park, request) =>
    dispatch({ type: "OPEN_MODAL", showModal, park, request })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkCard);
