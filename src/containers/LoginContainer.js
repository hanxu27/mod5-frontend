import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { login } from "../services/backend";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import { signUp } from "../services/backend";
import FancyPhoto from "../components/splash_login";
import ErrorMsg from "../components/ErrorMsg";

class Login extends Component {
  initialState = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    profile_url: "",
    showSignUpForm: false
  };

  state = this.initialState;

  toggleSignUpForm = () => {
    this.props.clearError();
    this.setState(this.initialState);
    this.setState({ showSignUpForm: !this.state.showSignUpForm });
  };
  handleOnChange = e => this.setState({ [e.target.name]: e.target.value });
  getUserStore = data => {
    localStorage.setItem("token", data.token);
    this.props.handleSignIn(data.user);
    this.props.clearError();
  };

  handleSignIn = e => {
    e.preventDefault();
    login({ username: this.state.username, password: this.state.password }).then(data => {
      if (data.message) {
        this.props.addError(data.message);
      } else {
        this.getUserStore(data);
      }
      this.setState(this.initialState);
    });
  };

  handleSignUp = e => {
    e.preventDefault();
    signUp({
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      profile_url: this.state.profile_url
    }).then(data => {
      if (data.message) {
        this.props.addError(data.message);
      } else {
        this.getUserStore(data);
        this.setState(this.initialState);
      }
    });
  };

  render() {
    return (
      <FancyPhoto>
        {this.props.errorMsg.length > 0 && <ErrorMsg />}
        <Row className="mt-3 mb-5 justify-content-center">
          <Col sm={10} md={6} lg={4}>
            {this.state.showSignUpForm ? (
              <SignUpForm
                toggleSignUpForm={this.toggleSignUpForm}
                handleOnChange={this.handleOnChange}
                handleSignUp={this.handleSignUp}
              />
            ) : (
              <SignInForm
                username={this.state.username}
                password={this.state.password}
                toggleSignUpForm={this.toggleSignUpForm}
                handleSignIn={this.handleSignIn}
                handleOnChange={this.handleOnChange}
              />
            )}
          </Col>
        </Row>
      </FancyPhoto>
    );
  }
}

let mapStateToProps = state => ({ errorMsg: state.error.message });
let mapDispatchToProps = dispatch => {
  return {
    handleSignIn: user => dispatch({ type: "HANDLE_SIGN_IN", user }),
    addError: payload => dispatch({ type: "ADD_ERROR", payload }),
    clearError: () => dispatch({ type: "CLEAR_ERROR" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
