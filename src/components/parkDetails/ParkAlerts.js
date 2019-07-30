import React from "react";
import { Button, Card, Accordion, Row } from "react-bootstrap";

const ParkAlerts = props => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle
          className="text-left"
          as={Button}
          variant="link"
          eventKey={props.alert.id}
        >
          {props.alert.title}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={props.alert.id}>
        <Card.Body>
          <Row>
            <a
              href={props.alert.url || null}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 mb-2"
            >
              {props.alert.category}
            </a>
          </Row>
          <p className="ml-3">{props.alert.description}</p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default ParkAlerts;
