import React from 'react'
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { GiPineTree, GiCongress, GiHolyOak, GiFamilyHouse, GiTreeFace } from 'react-icons/gi'
import TripsContainer from '../containers/TripsContainer'

const Profile = (props) => {
  const park = props.user.national_park_progress
  const monument = props.user.national_monument_progress
  const preserve = props.user.national_preserve_progress
  const historicSite = props.user.historic_site_progress
  const historicalPark = props.user.historical_park_progress
  return (
    <Row className="pt-3 pb-5 justify-content-md-center">
      <Col md={5}>
        <Card className="m-1">
          <Card.Title className='m-4'>{Object.keys(props.user).length === 0 ? "Loading..." : `Welcome ${props.user.firstname} ${props.user.lastname}!`}</Card.Title>
          <Card.Img className='ml-4' style={{ width: '25%' }} variant="right" src={props.user.profile_url} />
          <Card.Body>
            {props.user.national_park_progress &&
              <React.Fragment>
                <Card.Title>Your Current Progress</Card.Title>
                <ProgressBar striped animated="true" max={park.total} now={park.visited} label={`${park.visited}/${park.total}`} />
                <Card.Text><GiPineTree /> National Parks</Card.Text>
                <ProgressBar variant="warning" striped animated="true" max={monument.total} now={monument.visited} label={`${monument.visited}/${monument.total}`} />
                <Card.Text><GiCongress /> National Monuments</Card.Text>
                <ProgressBar variant="success" striped animated="true" max={preserve.total} now={preserve.visited} label={`${preserve.visited}/${preserve.total}`} />
                <Card.Text><GiHolyOak /> National Preserves</Card.Text>
                <ProgressBar variant="info" striped animated="true" max={historicSite.total} now={historicSite.visited} label={`${historicSite.visited}/${historicSite.total}`} />
                <Card.Text><GiFamilyHouse /> National Historic Sites</Card.Text>
                <ProgressBar variant="secondary" striped animated="true" max={historicalPark.total} now={historicalPark.visited} label={`${historicalPark.visited}/${historicalPark.total}`} />
                <Card.Text><GiTreeFace /> National Historical Parks</Card.Text>
              </React.Fragment>
            }
          </Card.Body>
        </Card>
      </Col>
      <TripsContainer displayMyTrips={true} />
    </Row>
  )
}

let mapStateToProps = state => ({ user: state.user.loggedUser })
export default connect(mapStateToProps)(Profile)