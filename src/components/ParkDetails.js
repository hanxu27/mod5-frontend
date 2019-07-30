import React, { Component } from "react";
import { Row, Col, Button, Tabs, Tab, Accordion } from "react-bootstrap";
import Gallery from "react-awesome-slider";
import styles from "../galleryStyles.scss";
import { FaMap } from "react-icons/fa";
import { connect } from "react-redux";

import { getPark, flickrPictures, searchNPS } from "../services/backend";
import FlickrGallery from "./parkDetails/FlickrGallery";
import ParkEvents from "./parkDetails/ParkEvents";
import ParkNews from "./parkDetails/ParkNews";
import ParkAlerts from "./parkDetails/ParkAlerts";
import ParkVisitorCenter from "./parkDetails/ParkVisitorCenter";
import ParkCampGrounds from "./parkDetails/ParkCampGrounds";
import ParkEntranceFees from "./parkDetails/ParkEntranceFees";

class ParkDetails extends Component {
  state = {
    park: {},
    flickrPictures: [],
    events: [],
    alerts: [],
    news: [],
    visitorcenters: [],
    campgrounds: [],
    entranceFees: []
  };

  componentDidMount() {
    getPark(this.props.parkId)
      .then(park => this.setState({ park }))
      .then(() => this.getFlickrPictures())
      .then(() => {
        searchNPS("events", this.state.park.parkCode).then(events =>
          this.setState({ events })
        );
        searchNPS("alerts", this.state.park.parkCode).then(alerts =>
          this.setState({ alerts })
        );
        searchNPS("newsreleases", this.state.park.parkCode).then(newsreleases =>
          this.setState({ news: newsreleases })
        );
        searchNPS("visitorcenters", this.state.park.parkCode).then(visitorcenters =>
          this.setState({ visitorcenters })
        );
        searchNPS("campgrounds", this.state.park.parkCode).then(campgrounds =>
          this.setState({ campgrounds })
        );
        searchNPS("parks", this.state.park.parkCode).then(park =>
          this.setState({ entranceFees: park[0].entranceFees })
        );
      });
  }

  getFlickrPictures = (page = 1) =>
    flickrPictures(this.state.park.fullname, page).then(flickrPictures => {
      let totalPictures = this.state.flickrPictures.concat(flickrPictures);
      this.setState({
        flickrPictures: totalPictures
      });
    });

  render() {
    const { url, fullname, states, description, weatherInfo, pictures } = this.state.park;
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h4 className="m-3 page-header text-center">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {fullname}
            </a>
          </h4>

          <Tabs defaultActiveKey="overview">
            <Tab eventKey="overview" title="Overview">
              {pictures && (
                <Gallery cssModule={styles}>
                  {pictures.map(img => (
                    <div key={img.id} data-src={img.url} />
                  ))}
                </Gallery>
              )}
              <Tabs className="mt-5 mb-2" defaultActiveKey="description">
                <Tab eventKey="description" title="Description">
                  <div className="mt-3 text-dark">
                    <h6>
                      <FaMap /> {states}
                    </h6>
                    <p>{description}</p>
                    <p>{weatherInfo}</p>
                  </div>
                </Tab>
                {this.state.alerts && this.state.alerts.length > 0 && (
                  <Tab className="m-1" eventKey="alerts" title="Alerts">
                    <Accordion>
                      {this.state.alerts.map(a => {
                        return <ParkAlerts alert={a} />;
                      })}
                    </Accordion>
                  </Tab>
                )}
                {this.state.events && this.state.events.length > 0 && (
                  <Tab className="m-1" eventKey="events" title="Events">
                    <Accordion>
                      {this.state.events.map(e => {
                        return <ParkEvents event={e} />;
                      })}
                    </Accordion>
                  </Tab>
                )}
                {this.state.news && this.state.news.length > 0 && (
                  <Tab className="m-1" eventKey="news" title="News">
                    <Accordion>
                      {this.state.news.map(n => {
                        return <ParkNews news={n} />;
                      })}
                    </Accordion>
                  </Tab>
                )}
                {this.state.visitorcenters && this.state.visitorcenters.length > 0 && (
                  <Tab className="m-1" eventKey="visitorcenters" title="Visitor Center">
                    <Accordion>
                      {this.state.visitorcenters.map(v => {
                        return <ParkVisitorCenter visitorCenter={v} />;
                      })}
                    </Accordion>
                  </Tab>
                )}
                {this.state.campgrounds && this.state.campgrounds.length > 0 && (
                  <Tab className="m-1" eventKey="campgrounds" title="Campground">
                    <Accordion>
                      {this.state.campgrounds.map(c => {
                        return <ParkCampGrounds campGround={c} />;
                      })}
                    </Accordion>
                  </Tab>
                )}
                {this.state.entranceFees && this.state.entranceFees.length > 0 && (
                  <Tab className="m-1" eventKey="entranceFees" title="Entrance Fee">
                    <Accordion>
                      {this.state.entranceFees.map(f => {
                        return <ParkEntranceFees fee={f} />;
                      })}
                    </Accordion>
                  </Tab>
                )}
              </Tabs>
              <Button variant="primary" className="m-1" onClick={this.props.backToParks}>
                Back
              </Button>
              {this.props.user.id && (
                <React.Fragment>
                  <Button
                    variant="danger"
                    className="m-1 float-right"
                    name="trip"
                    onClick={e =>
                      this.props.openModal(e.target.name, this.state.park, "Create")
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
              <FlickrGallery
                pictures={this.state.flickrPictures}
                getFlickrPictures={this.getFlickrPictures}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
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
