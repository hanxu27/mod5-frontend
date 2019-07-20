let initialState = {
  trips: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_TRIPS": {
      return { ...state, trips: action.data }
    }
    case "CLEAR_TRIPS": {
      return { ...state, trips: [] }
    }
    default: {
      return state
    }
  }
}