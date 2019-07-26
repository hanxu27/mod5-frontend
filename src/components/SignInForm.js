import React, { useState } from 'react'
import { Col, Row, Button, Form } from 'react-bootstrap'

export default function SignInForm(props) {
  const [validated, setValidated] = useState(false)

  const handleSignIn = e => {
    e.preventDefault()
    setValidated(true)
    props.handleSignIn(e)
  }

  return (
    <Row className="mt-3 justify-content-md-center">
      <Col sm={10} md={6} lg={3} xl={2}>
        <Form className='m-3' validated={validated} onSubmit={handleSignIn} >
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control required name="username" placeholder="Enter username" value={props.username} onChange={props.handleOnChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label >Password:</Form.Label>
            <Form.Control required type="password" name="password" placeholder="Enter password" value={props.password} onChange={props.handleOnChange} />
            <Form.Control.Feedback>Enter Password</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" >Login</Button>
          <h5 className="mt-5">Not registered?</h5>
          <Button variant="success" onClick={props.toggleSignUpForm} >Sign Up</Button>
        </Form>
      </Col>
    </Row>
  )
}
