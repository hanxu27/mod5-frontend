import React from "react";
import { Button, Card, Accordion, Row } from "react-bootstrap";

const ParkNews = props => {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle
          className="text-left"
          as={Button}
          variant="link"
          eventKey={props.news.id}
        >
          {props.news.title}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={props.news.id}>
        <Card.Body>
          <Row>
            <a
              href={props.news.url || null}
              target="_blank"
              HTMLButtonElement
              rel="noopener noreferrer"
              className="ml-4 mb-2"
            >
              {props.news.releasedate
                ? props.news.releasedate.slice(0, 10)
                : "News"}
            </a>
          </Row>
          <p className="ml-3">{props.news.abstract}</p>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default ParkNews;
