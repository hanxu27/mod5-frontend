let initialState = {
  message: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ERROR": {
      return { ...state, message: action.payload }
    }
    case "CLEAR_ERROR": {
      return initialState
    }
    default: {
      return state
    }
  }
}