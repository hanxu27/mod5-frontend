let initialState = {
  parks: [],
  showParkDetails: false,
  search: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_PARKS": {
      return { ...state, parks: action.data }
    }
    default: {
      return state
    }
  }
}