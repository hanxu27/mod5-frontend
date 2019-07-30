import React from "react";
import { Button, Card, Accordion, Row } from "react-bootstrap";

const ParkCampGrounds = props => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle
          className="text-left"
          as={Button}
          variant="link"
          eventKey={props.campGround.id}
        >
          {props.campGround.name}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={props.campGround.id}>
        <Card.Body>
          <Row>
            <a
              href={props.campGround.url || null}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 mb-2"
            >
              {props.campGround.directionsoverview}
            </a>
          </Row>
          <p className="ml-3">{props.campGround.description}</p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default ParkCampGrounds;
