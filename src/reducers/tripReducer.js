let initialState = {
  trips: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_TRIPS": {
      return { ...state, trips: action.data }
    }
    default: {
      return state
    }
  }
}