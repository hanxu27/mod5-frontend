import React from 'react';
import { CardColumns } from 'react-bootstrap';
import ParkCard from '../components/ParkCard';
import { connect } from 'react-redux';

const ParksContainer = (props) => {
  return (
    <CardColumns>
      {props.parks.map(park => {
        return <ParkCard
          key={park.id}
          park={park}
        // showPark={this.props.showPark}
        // planNewVisit={this.props.planNewVisit}
        // logPastVisit={this.props.logPastVisit} 
        />
      })}
    </CardColumns>
  )
}

let mapStateToProps = state => ({ parks: state.park.parks })
export default connect(mapStateToProps)(ParksContainer)