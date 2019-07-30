import React from "react";
import { Button, Card, Accordion, Row } from "react-bootstrap";

const ParkEvents = props => {
  let html = { __html: props.event.description };

  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle
          className="text-left"
          as={Button}
          variant="link"
          eventKey={props.event.id}
        >
          {props.event.title}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={props.event.id}>
        <Card.Body>
          <Row>
            <a
              href={props.event.infourl || null}
              target="_blank"
              HTMLButtonElement
              rel="noopener noreferrer"
              className="ml-4 mb-2"
            >
              {props.event.date === props.event.dateend
                ? props.event.date
                : `${props.event.date} through ${props.event.dateend}`}
            </a>
          </Row>
          <p className="ml-3" dangerouslySetInnerHTML={html} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default ParkEvents;
