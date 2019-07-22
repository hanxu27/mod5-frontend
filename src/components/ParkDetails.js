import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import Gallery from 'react-awesome-slider'
import styles from '../galleryStyles.scss'
import { FaMap } from 'react-icons/fa'
import { GiPineTree } from 'react-icons/gi'
import { connect } from 'react-redux';

import { getPark } from '../services/backend';

class ParkDetails extends Component {
  state = {
    park: {}
  }

  componentDidMount() {
    getPark(this.props.parkId).then(park => this.setState({ park }))
  }
  render() {
    const { url, fullname, states, description, weatherInfo, pictures } = this.state.park
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="text-center">
            <a href={url} target="_blank" rel="noopener noreferrer"> {fullname}</a>
          </h1>
        </div>

        {pictures && <Gallery cssModule={styles} >{pictures.map(img => <div key={img.id} data-src={img.url} />)}</Gallery>}

        <div className="pt-4 text-dark">
          <h6><FaMap /> {states}</h6>
          <p>{description}</p>
          <p>{weatherInfo}</p>

          <Button
            type="button"
            className="btn btn-primary m-1"
            onClick={this.props.backToParks}>Back</Button>

          <Button
            type="button"
            className="btn btn-success m-1 float-right"
            onClick={null}>Log Visit</Button>
        </div >
      </div >
    )
  }
}

let mapStateToProps = state => ({ parkId: state.park.showParkDetails })
let mapDispatchToProps = dispatch => {
  return {
    backToParks: () => dispatch({ type: "BACK_TO_PARKS" }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ParkDetails)