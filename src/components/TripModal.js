import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FaCarSide, FaRegCalendar, FaFeatherAlt, FaKiwiBird, FaSun, FaLeaf, FaSnowflake } from 'react-icons/fa'
import { GiFireFlower } from "react-icons/gi";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getTrips, getProfile, createTrip } from '../services/backend';

class TripModal extends Component {
  initialState = {
    redirect: null,
    title: "",
    description: "",
    season: "",
    year: ""
  }

  state = this.initialState

  handleFormChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createTrip = async (e) => {
    e.preventDefault()
    const trip = { park_id: this.props.parkId, user_id: this.props.userId, title: this.state.title, description: this.state.description, season: this.state.season, year: this.state.year }
    console.log(trip);
    await createTrip(trip)
    this.setState({ redirect: <Redirect to='/trips' /> })
    getProfile().then(this.props.fetchedProfile)
    getTrips().then(this.props.fetchedTrips)
    this.setState(this.initialState)
    this.props.closeModal()
  }

  closeModal = e => {
    this.setState(this.initialState)
    this.props.closeModal()
  }

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
            <Modal.Title id="contained-modal-title-vcenter">Log Trip <FaCarSide /></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.createTrip}>
              <div className="form-group" >
                <label>Trip Title <FaKiwiBird /></label>
                <input
                  required
                  type="text"
                  id="title"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleFormChange}
                  placeholder="My Awesome Trip" />
                <label>Trip Review <FaFeatherAlt /></label>
                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.handleFormChange} />
                <div className="row">
                  <div className="col-sm-6" >
                    <label>Season <GiFireFlower /><FaSun /><FaLeaf /><FaSnowflake /></label>
                    <select name="season" className="form-control" onChange={this.handleFormChange} required>
                      <option value=""></option>
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Fall">Fall</option>
                      <option value="Winter">Winter</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <label>Year <FaRegCalendar /></label>
                    <input
                      type="text"
                      id="year"
                      className="form-control"
                      name="year"
                      value={this.state.year}
                      onChange={this.handleFormChange}
                      placeholder="2018"
                      required />
                  </div>
                </div>
              </div>
              <Button variant="success" type="submit" className="mr-1" >Create</Button>
              <Button variant="danger" onClick={this.closeModal}>Cancel</Button>
            </form>
          </Modal.Body>
        </Modal >
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => ({ showModal: state.modal.showModal, parkId: state.modal.parkId, userId: state.user.loggedUser.id })
let mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: "CLOSE_MODAL" }),
    fetchedTrips: data => dispatch({ type: "FETCHED_TRIPS", data }),
    fetchedProfile: user => dispatch({ type: "FETCHED_PROFILE", user }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TripModal)