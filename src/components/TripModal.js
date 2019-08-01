import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  FaCarSide,
  FaRegCalendar,
  FaFeatherAlt,
  FaKiwiBird,
  FaSun,
  FaLeaf,
  FaSnowflake
} from "react-icons/fa";
import { GiFireFlower, GiRadioactive } from "react-icons/gi";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProfile, createTrip, editTrip } from "../services/backend";

class TripModal extends Component {
  initialState = { redirect: null };
  state = this.initialState;

  handleSubmit = e => {
    e.preventDefault();
    let trip = {};
    if (this.props.content) {
      trip = {
        id: this.props.content.id,
        park_id: this.props.park.id,
        user_id: this.props.userId,
        title: e.target.title.value,
        description: e.target.description.value,
        season: e.target.season.value,
        year: e.target.year.value
      };
    } else {
      trip = {
        park_id: this.props.park.id,
        user_id: this.props.userId,
        title: e.target.title.value,
        description: e.target.description.value,
        season: e.target.season.value,
        year: e.target.year.value
      };
    }
    if (this.props.request === "Create") {
      this.createTrip(trip);
    } else if (this.props.request === "Edit") {
      this.editTrip(trip);
    }
  };

  editTrip = trip => {
    editTrip(trip).then(data => {
      if (data.message) {
        this.props.addError(data.message);
      } else {
        getProfile().then(this.props.fetchedProfile);
        this.setState({ redirect: <Redirect to="/profile" /> });
        this.setState(this.initialState);
        this.props.clearError();
        this.props.closeModal();
      }
    });
  };

  createTrip = trip => {
    createTrip(trip).then(data => {
      if (data.message) {
        this.props.addError(data.message);
      } else {
        getProfile().then(this.props.fetchedProfile);
        this.setState({ redirect: <Redirect to="/profile" /> });
        this.setState(this.initialState);
        this.props.clearError();
        this.props.closeModal();
      }
    });
  };

  closeModal = e => {
    this.props.clearError();
    this.setState(this.initialState);
    this.props.closeModal();
  };

  render() {
    return (
      <React.Fragment>
        {this.state.redirect}
        <Modal
          onHide={this.closeModal}
          show={this.props.showModal === "trip"}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-info">
              <FaCarSide /> {this.props.park && this.props.park.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.errorMsg.length > 0 &&
              this.props.errorMsg.map(e => (
                <h3 className="text-danger d-flex justify-content-center">
                  <GiRadioactive />
                  {e}
                </h3>
              ))}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>
                  Trip Title <FaKiwiBird />
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="title"
                  defaultValue={this.props.content && this.props.content.title}
                  placeholder="My Awesome Trip"
                />
                <label className="mt-2">
                  Trip Review <FaFeatherAlt />
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  defaultValue={this.props.content && this.props.content.description}
                />
                <div className="row">
                  <div className="mt-2 col-sm-6">
                    <label>
                      Season <GiFireFlower />
                      <FaSun />
                      <FaLeaf />
                      <FaSnowflake />
                    </label>
                    <select
                      defaultValue={this.props.content && this.props.content.season}
                      name="season"
                      className="form-control"
                      required
                    >
                      <option value="" />
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Fall">Fall</option>
                      <option value="Winter">Winter</option>
                    </select>
                  </div>
                  <div className="mt-2 col-sm-6">
                    <label>
                      Year <FaRegCalendar />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="year"
                      defaultValue={this.props.content && this.props.content.year}
                      placeholder="2018"
                      required
                    />
                  </div>
                </div>
              </div>
              <Button variant="success" type="submit" className="mr-1">
                {this.props.request}
              </Button>
              <Button variant="danger" onClick={this.closeModal}>
                Cancel
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => ({
  content: state.modal.content,
  request: state.modal.request,
  showModal: state.modal.showModal,
  park: state.modal.park,
  userId: state.user.loggedUser.id,
  errorMsg: state.error.message
});
let mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: "CLOSE_MODAL" }),
    fetchedProfile: user => dispatch({ type: "FETCHED_PROFILE", user }),
    addError: payload => dispatch({ type: "ADD_ERROR", payload }),
    clearError: () => dispatch({ type: "CLEAR_ERROR" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripModal);
