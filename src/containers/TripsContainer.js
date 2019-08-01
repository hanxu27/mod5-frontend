import React, { Component } from "react";
import { connect } from "react-redux";
import TripCard from "../components/TripCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTrips } from "../services/backend";

class TripsContainer extends Component {
  initialState = { page: 1, lastItemIndex: 4, hasMore: true };
  state = this.initialState;

  componentDidMount() {
    getTrips() &&
      getTrips(this.state.page).then(({ hasMore, trips }) => {
        console.log(trips);
        this.props.fetchedTrips(trips);
        this.setState({ hasMore });
      });
  }

  handleScroll = async () => {
    const adder = 5;
    let lastItemIndex = this.state.lastItemIndex + adder;
    let page = this.state.page + 1;
    (await getTrips()) &&
      getTrips(this.state.page).then(({ hasMore, trips }) => {
        this.props.fetchedTrips(trips);
        this.setState({ page, lastItemIndex, hasMore });
      });
  };

  getDisplayTrip = () => {
    if (this.props.displayMyTrips && this.props.myTrips) return this.props.myTrips;
    else if (this.props.trips) return this.props.trips;
    else return [];
  };

  render() {
    let displayTrips = this.getDisplayTrip();
    return (
      <InfiniteScroll
        dataLength={this.state.lastItemIndex}
        next={this.handleScroll}
        height={window.innerHeight - window.innerHeight * 0.076}
        hasMore={this.state.hasMore}
        endMessage={
          <div className="d-flex justify-content-center">
            <h4>that's all folks</h4>
          </div>
        }
      >
        {displayTrips.map(trip => (
          <TripCard trip={trip} key={trip.id} displayMyTrips={this.props.displayMyTrips} />
        ))}
      </InfiniteScroll>
    );
  }
}

let mapDispatchToProps = dispatch => ({
  fetchedTrips: data => dispatch({ type: "FETCHED_TRIPS", data })
});
export default connect(
  null,
  mapDispatchToProps
)(TripsContainer);
