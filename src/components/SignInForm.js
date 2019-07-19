import React from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'

export default function SignInForm(props) {
  return (
    <Row className="pt-5 justify-content-md-center">
      <Col xs={3}>
        <Form onSubmit={props.handleSignIn} >
          <Form.Group >
            <Form.Label>Username:</Form.Label>
            <Form.Control name="username" placeholder="Enter username" onChange={props.handleOnChange} />
            <Form.Label className="mt-2">Password:</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" onChange={props.handleOnChange} />
          </Form.Group>
          <Button variant="primary" type="submit" >Login</Button>
          <h5 className="pt-5">Not registered?</h5>
          <Button variant="success" onClick={props.toggleSignUpForm} >Sign Up</Button>
        </Form>
      </Col>
    </Row>
  )
}
