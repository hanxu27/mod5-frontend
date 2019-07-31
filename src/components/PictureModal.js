import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { MdPhotoAlbum } from "react-icons/md";
import { GiRadioactive } from "react-icons/gi";
import { MdInsertLink, MdSpeakerNotes, MdFavorite } from "react-icons/md";
import { Redirect } from "react-router-dom";

import { createPicture } from "../services/backend";

class PictureModal extends Component {
  initialState = { redirect: null };
  state = this.initialState;

  closeModal = e => {
    this.props.clearError()
    this.props.closeModal();
  };

  handleSubmit = e => {
    e.preventDefault();
    let picture = {
      park_id: this.props.park.id,
      user_id: this.props.userId,
      title: e.target.title.value,
      caption: e.target.caption.value,
      url: e.target.url.value
    };
    this.createPicture(picture);
  };

  createPicture = picture => {
    createPicture(picture).then(data => {
      if (data.message) {
        this.props.addError(data.message);
      } else {
        this.props.closeModal();
        this.props.backToParks();
        this.props.fetchedProfile(data);
        this.setState({ redirect: <Redirect to="/profile" /> });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.redirect}
        <Modal
          onHide={this.closeModal}
          show={this.props.showModal === "picture"}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className="text-info">
              <MdPhotoAlbum /> {this.props.park && this.props.park.name}
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
                <div className="row">
                  <div className="mt-2 col-sm-6">
                    <label>
                      Title <MdFavorite />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      defaultValue={this.props.content && this.props.content.title}
                      placeholder="A Bear's Dinner"
                      required
                    />
                  </div>
                  <div className="mt-2 col-sm-6">
                    <label>
                      Caption <MdSpeakerNotes />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="caption"
                      defaultValue={this.props.content && this.props.content.caption}
                      placeholder="A bear eating my friend ehh"
                      required
                    />
                  </div>
                </div>
                <label className="mt-2">
                  Link <MdInsertLink />
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="url"
                  defaultValue={this.props.content && this.props.content.url}
                />
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
    clearError: () => dispatch({ type: "CLEAR_ERROR" }),
    backToParks: () => dispatch({ type: "BACK_TO_PARKS" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureModal);
