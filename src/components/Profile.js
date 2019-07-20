import React from 'react'
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Profile = (props) => {
  const park = props.user.national_park_progress
  const monument = props.user.national_monument_progress
  const preserve = props.user.national_preserve_progress
  // debugger
  // console.log(park.visited)
  return (
    <Row className="pt-3 pb-5 justify-content-md-center">
      <Col md={5}>
        <Card>
          <Card.Title className='m-4'>Welcome {`${props.user.firstname} ${props.user.lastname}`}!</Card.Title>
          <Card.Img className='ml-4' style={{ width: '25%' }} variant="right" src={props.user.profile_url} />
          <Card.Body>
            {props.user.national_park_progress &&
              <React.Fragment>
                <Card.Title>Your Current Progress</Card.Title>
                <ProgressBar striped animated="true" max={park.total} now={park.visited} label={`${park.visited}/${park.total}`} />
                <Card.Text>National Parks</Card.Text>
                <ProgressBar variant="warning" striped animated="true" max={monument.total} now={monument.visited} label={`${monument.visited}/${monument.total}`} />
                <Card.Text>National Monument</Card.Text>
                <ProgressBar variant="success" striped animated="true" max={preserve.total} now={preserve.visited} label={`${preserve.visited}/${preserve.total}`} />
                <Card.Text>National Preserve</Card.Text>
              </React.Fragment>
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

let mapStateToProps = state => ({ user: state.user.loggedUser })
export default connect(mapStateToProps)(Profile)