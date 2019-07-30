import React from "react";
import { Button, Card, Accordion, Row } from "react-bootstrap";

const ParkVisitorCenters = props => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle
          className="text-left"
          as={Button}
          variant="link"
          eventKey={props.visitorCenter.id}
        >
          {props.visitorCenter.name}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={props.visitorCenter.id}>
        <Card.Body>
          <Row>
            <a
              href={props.visitorCenter.url || null}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 mb-2"
            >
              {props.visitorCenter.directionsInfo}
            </a>
          </Row>
          <p className="ml-3">{props.visitorCenter.description}</p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default ParkVisitorCenters;
