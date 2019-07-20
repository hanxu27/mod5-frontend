let initialState = {
  loggedUser: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_PROFILE": {
      return { ...state, loggedUser: action.user }
    }
    case "HANDLE_SIGN_IN": {
      return { ...state, loggedUser: action.user }
    }
    case "HANDLE_CREATE": {
      return { ...state, loggedUser: action.data }
    }
    case "CLEAR_USER": {
      return { ...state, loggedUser: {} }
    }
    default: {
      return state
    }
  }
}