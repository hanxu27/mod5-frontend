import React from 'react'
import { connect } from 'react-redux'
import TripModal from '../components/TripModal';
import PictureModal from '../components/PictureModal';

const myModal = (props) => {
  return (
    <React.Fragment>

      {props.showModal === 'trip' ? <TripModal /> : <PictureModal />}
    </React.Fragment>
  )
}

let mapStateToProps = state => ({ showModal: state.modal.showModal })
export default connect(mapStateToProps)(myModal)
