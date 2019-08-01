import React, { Component } from "react";
import { CardColumns, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import ParkCard from "../components/ParkCard";
import { displayParks } from "../actions/parkActions";

class ParksContainer extends Component {
  state = {
    lastParkIndex: 10,
    counter: 0
  };

  currentParks = () =>
    displayParks(this.props.parks, this.props.search).slice(0, this.state.lastParkIndex);

  handleScroll = e => {
    const adder = 10;
    const counter = this.state.counter + 1;
    let lastParkIndex = this.state.lastParkIndex + adder;
    this.setState({ lastParkIndex, counter });
  };

  render() {
    return (
      <Container fluid={true}>
        <Row className="justify-content-center">
          <Col md={8}>
            <InfiniteScroll
              dataLength={this.state.lastParkIndex}
              next={this.handleScroll}
              height={window.innerHeight - window.innerHeight * 0.06}
              hasMore={true}
              endMessage={<h4 className="justify-content-center">that's all folks...</h4>}
            >
              <CardColumns className="m-2">
                {this.currentParks().map(park => (
                  <ParkCard key={park.id} park={park} />
                ))}
              </CardColumns>
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    );
  }
}

let mapStateToProps = state => ({ parks: state.park.parks, search: state.park.search });
export default connect(mapStateToProps)(ParksContainer);
