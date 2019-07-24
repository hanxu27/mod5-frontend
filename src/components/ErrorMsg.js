import React from 'react'
import { Alert, Row } from 'react-bootstrap'
import { connect } from 'react-redux';

const ErrorMsg = (props) => {
  return (
    <Row className='mt-3 justify-content-center'>
      <Alert variant="danger" onClose={() => props.clearError()} dismissible>
        <Alert.Heading>You got mail!</Alert.Heading>
        <p>{props.errorMsg}</p>
      </Alert>
    </Row>
  )
}

let mapStateToProps = state => ({ errorMsg: state.error.message })
let mapDispatchToProps = dispatch => ({
  clearError: () => dispatch({ type: "CLEAR_ERROR" }),
})
export default connect(mapStateToProps, mapDispatchToProps)(ErrorMsg)
