let initialState = {
  showModal: false,
  parkId: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL": {
      return { ...state, showModal: action.showModal, parkId: action.parkId }
    }
    case "CLOSE_MODAL": {
      return { ...state, showModal: false, parkId: 0 }
    }
    default: {
      return state
    }
  }
}