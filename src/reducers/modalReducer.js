let initialState = {
  showModal: false,
  park: {},
  request: null,
  content: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL": {
      return { ...state, showModal: action.showModal, park: action.park, request: action.request, content: action.content }
    }
    case "CLOSE_MODAL": {
      return initialState
    }
    default: {
      return state
    }
  }
}