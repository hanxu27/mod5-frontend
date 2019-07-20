import React from 'react'
import { Card } from 'react-bootstrap'

export default function TripCard(props) {
  const img = props.trip.park.pictures ? props.trip.park.pictures[0] : null
  return (
    <Card>
      <Card.Header as="h2" className="text-white" style={{ background: 'rgb(200, 110, 120)' }} >
        {props.trip.park.fullname}
      </Card.Header>

      <Card.Body>
        <h3>{`${props.trip.title}`}</h3>
        <h4>{`${props.trip.user.username}`}</h4>
        <h4>{`${props.trip.season} ${props.trip.year}`}</h4>
        <p>{props.trip.description}</p>
      </Card.Body>

      <Card.Img className='p-2' variant='bottom' style={{ maxHeight: '20rem', borderRadius: '10px' }} src={img ? img.url : null} />
    </Card>
  )
}
