import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../services/backend";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import { signUp } from "../services/backend";

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

  toggleSignUpForm = () => this.setState({ showSignUpForm: !this.state.showSignUpForm });
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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    handleSignIn: user => dispatch({ type: "HANDLE_SIGN_IN", user }),
    addError: payload => dispatch({ type: "ADD_ERROR", payload }),
    clearError: () => dispatch({ type: "CLEAR_ERROR" })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Login);
