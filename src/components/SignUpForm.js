import React from "react";
import { Card, Row, Button, Form } from "react-bootstrap";

export default function SignUpForm(props) {
  return (
    <Card style={{ opacity: ".9" }}>
      <Row className="mt-3 justify-content-center">
        <h3>Sign Up</h3>
      </Row>
      <Form className="m-3" onSubmit={props.handleSignUp}>
        <Form.Group>
          <Form.Label className="mt-2">Username:</Form.Label>
          <Form.Control
            required
            name="username"
            placeholder="Enter your desired username"
            onChange={props.handleOnChange}
          />
          <Form.Label className="mt-2">Password:</Form.Label>
          <Form.Control
            required
            name="password"
            type="password"
            placeholder="Enter your desired password"
            onChange={props.handleOnChange}
          />
          <Form.Label className="mt-2">First Name:</Form.Label>
          <Form.Control
            required
            name="firstname"
            placeholder="Enter your first name"
            onChange={props.handleOnChange}
          />
          <Form.Label className="mt-2">Last Name:</Form.Label>
          <Form.Control
            required
            name="lastname"
            placeholder="Enter your last name"
            onChange={props.handleOnChange}
          />
          <Form.Label className="mt-2">Profile Picture:</Form.Label>
          <Form.Control
            name="profile_url"
            placeholder="Enter a photo URL"
            onChange={props.handleOnChange}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Create
        </Button>
        <Button className="ml-2" variant="danger" onClick={props.toggleSignUpForm}>
          Cancel
        </Button>
      </Form>
    </Card>
  );
}
