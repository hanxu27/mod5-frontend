import React from "react";
import { Button, Card, Accordion } from "react-bootstrap";

const ParkEntranceFees = props => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle
          className="text-left"
          as={Button}
          variant="link"
          eventKey={props.fee.title}
        >
          {props.fee.cost > 0
            ? `$${props.fee.cost.split(".")[0]} ${props.fee.title}`
            : props.fee.title}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={props.fee.title}>
        <Card.Body>
          <p className="ml-3">{props.fee.description}</p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default ParkEntranceFees;
