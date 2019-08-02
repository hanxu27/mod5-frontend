import React from "react";
import { Link } from "react-router-dom";
import { GiDirectionSign } from "react-icons/gi";
import { Card, Button, Image, ButtonToolbar, Row } from "react-bootstrap";
import { connect } from "react-redux";

const ParkCard = props => {
  const img = props.park.pictures;

  return (
    <Card className="m-1 shadow rounded">
      {img && (
        <Image
          className="card-img-bottom border shadow rounded-top"
          style={{ maxHeight: "30rem", maxWidth: "30rem" }}
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
        <Link to={"/parks/" + props.park.id}>
          <Button className="mb-2 mr-1 ml-1" variant="primary">
            Park Details
          </Button>
        </Link>
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
  openModal: (showModal, park, request) =>
    dispatch({ type: "OPEN_MODAL", showModal, park, request })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkCard);
