import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  GiPineTree,
  GiCongress,
  GiHolyOak,
  GiFamilyHouse,
  GiTreeFace
} from "react-icons/gi";
import TripsContainer from "../containers/TripsContainer";
import { getProfile, deletePicture } from "../services/backend";

class Profile extends Component {
  handleDelete = async () => {
    await deletePicture(this.props.user.last_picture.id);
    getProfile().then(this.props.fetchedProfile);
  };

  render() {
    const park = this.props.user.national_park_progress;
    const monument = this.props.user.national_monument_progress;
    const preserve = this.props.user.national_preserve_progress;
    const historicSite = this.props.user.historic_site_progress;
    const historicalPark = this.props.user.historical_park_progress;

    return (
      <Row className="m-2 d-flex justify-content-center">
        <Col sm={5}>
          <Card className="m-1">
            <Row className="ml-1">
              <Col lg={6}>
                <Card.Title className="m-2">
                  {Object.keys(this.props.user).length === 0
                    ? "Loading..."
                    : `Welcome ${this.props.user.firstname} ${this.props.user.lastname}!`}
                </Card.Title>
                <Card.Img
                  className="m-2"
                  style={{ width: "90%", borderRadius: "30px" }}
                  variant="right"
                  src={this.props.user.profile_url}
                />
              </Col>
              <Col lg={6}>
                <Card.Title className="m-2">
                  {this.props.user.last_picture &&
                    `${this.props.user.last_picture.title} ⛳ ${
                      this.props.user.last_picture.park.name
                    }`}
                </Card.Title>
                <Card.Img
                  className="m-2"
                  style={{ width: "90%" }}
                  variant="right"
                  src={this.props.user.last_picture && this.props.user.last_picture.url}
                />
                <Card.Text>
                  <Button
                    className="m-2"
                    variant="danger"
                    size="sm"
                    onClick={this.handleDelete}
                  >
                    Delete
                  </Button>
                </Card.Text>
              </Col>
            </Row>
            <Card.Body>
              {this.props.user.national_park_progress && (
                <React.Fragment>
                  <Card.Title>Your Current Progress</Card.Title>
                  <ProgressBar
                    striped
                    animated="true"
                    max={park.total}
                    now={park.visited}
                    label={`${park.visited}/${park.total}`}
                  />
                  <Card.Text>
                    <GiPineTree /> National Parks
                  </Card.Text>
                  <ProgressBar
                    variant="warning"
                    striped
                    animated="true"
                    max={monument.total}
                    now={monument.visited}
                    label={`${monument.visited}/${monument.total}`}
                  />
                  <Card.Text>
                    <GiCongress /> National Monuments
                  </Card.Text>
                  <ProgressBar
                    variant="success"
                    striped
                    animated="true"
                    max={preserve.total}
                    now={preserve.visited}
                    label={`${preserve.visited}/${preserve.total}`}
                  />
                  <Card.Text>
                    <GiHolyOak /> National Preserves
                  </Card.Text>
                  <ProgressBar
                    variant="info"
                    striped
                    animated="true"
                    max={historicSite.total}
                    now={historicSite.visited}
                    label={`${historicSite.visited}/${historicSite.total}`}
                  />
                  <Card.Text>
                    <GiFamilyHouse /> National Historic Sites
                  </Card.Text>
                  <ProgressBar
                    variant="secondary"
                    striped
                    animated="true"
                    max={historicalPark.total}
                    now={historicalPark.visited}
                    label={`${historicalPark.visited}/${historicalPark.total}`}
                  />
                  <Card.Text>
                    <GiTreeFace /> National Historical Parks
                  </Card.Text>
                </React.Fragment>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <TripsContainer displayMyTrips={true} />
        </Col>
      </Row>
    );
  }
}

let mapStateToProps = state => ({ user: state.user.loggedUser });
let mapDispatchToProps = dispatch => {
  return {
    fetchedProfile: user => dispatch({ type: "FETCHED_PROFILE", user })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
