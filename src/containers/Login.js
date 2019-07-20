import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../services/backend'
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import { getTrips } from '../services/backend';
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    profile_url: '',
    showSignUpForm: false
  }

  toggleSignUpForm = () => this.setState({ showSignUpForm: !this.state.showSignUpForm })
  handleOnChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSignIn = (e) => {
    e.preventDefault()
    login({ username: this.state.username, password: this.state.password })
      .then(data => {
        if (data.message) {
          console.log(data.message)
        } else {
          localStorage.setItem('token', data.token)
          this.props.handleSignIn(data.user)
          getTrips().then(this.props.fetchedTrips)
        }
        this.setState({ username: '', password: '', firstname: '', lastname: '', profile_url: '', showSignUpForm: false })
      })
  }
  handleCreate = (e) => {
    e.preventDefault()
    console.log(this.state.username, this.state.password)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showSignUpForm ?
          <SignUpForm
            toggleSignUpForm={this.toggleSignUpForm}

          />
          :
          <SignInForm
            username={this.state.username}
            password={this.state.password}
            toggleSignUpForm={this.toggleSignUpForm}
            handleSignIn={this.handleSignIn}
            handleOnChange={this.handleOnChange} />
        }
      </React.Fragment>
    )
  }
}

let mapDispatchToProps = dispatch => {
  return {
    handleSignIn: user => dispatch({ type: "HANDLE_SIGN_IN", user }),
    fetchedTrips: data => dispatch({ type: "FETCHED_TRIPS", data }),
    // handleCreate: data => dispatch({ type: "HANDLE_CREATE", data })
  }
}
export default connect(null, mapDispatchToProps)(Login)
