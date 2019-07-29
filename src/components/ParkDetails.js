import React, { Component } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import Gallery from "react-awesome-slider";
import styles from "../galleryStyles.scss";
import { FaMap } from "react-icons/fa";
import { connect } from "react-redux";
import FlickrGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import { getPark, flickrPictures } from "../services/backend";

class ParkDetails extends Component {
  state = {
    park: {},
    flickrPictures: [],
    flickrPage: 1
  };

  componentDidMount() {
    getPark(this.props.parkId)
      .then(park => this.setState({ park }))
      .then(() => this.getFlickrPictures());
  }

  getFlickrPictures = () =>
    flickrPictures(this.state.park.name, this.state.flickrPage).then(
      flickrPictures => this.setState({ flickrPictures })
    );

  render() {
    const {
      url,
      fullname,
      states,
      description,
      weatherInfo,
      pictures
    } = this.state.park;
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="text-center">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {" "}
              {fullname}
            </a>
          </h1>
        </div>

        <Tabs defaultActiveKey="description">
          <Tab eventKey="description" title="Description">
            {pictures && (
              <Gallery cssModule={styles}>
                {pictures.map(img => (
                  <div key={img.id} data-src={img.url} />
                ))}
              </Gallery>
            )}

            <div className="mt-4 text-dark">
              <h6>
                <FaMap /> {states}
              </h6>
              <p>{description}</p>
              <p>{weatherInfo}</p>
            </div>
            <Button
              variant="primary"
              className="m-1"
              onClick={this.props.backToParks}
            >
              Back
            </Button>
            {this.props.user.id && (
              <React.Fragment>
                <Button
                  variant="danger"
                  className="m-1 float-right"
                  name="trip"
                  onClick={e =>
                    this.props.openModal(
                      e.target.name,
                      this.state.park,
                      "Create"
                    )
                  }
                >
                  Log Visit
                </Button>
                <Button
                  variant="success"
                  className="m-1 float-right"
                  name="picture"
                  onClick={e =>
                    this.props.openModal(e.target.name, this.state.park, "Add")
                  }
                >
                  Add Photo
                </Button>
              </React.Fragment>
            )}
          </Tab>
          <Tab eventKey="morePictures" title="More Pictures">
            <FlickrGallery photos={this.state.flickrPictures} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  parkId: state.park.showParkDetails,
  user: state.user.loggedUser
});
let mapDispatchToProps = dispatch => {
  return {
    backToParks: () => dispatch({ type: "BACK_TO_PARKS" }),
    openModal: (showModal, park, request) =>
      dispatch({ type: "OPEN_MODAL", showModal, park, request })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParkDetails);
