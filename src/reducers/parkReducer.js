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
    case "SHOW_PARK_DETAILS": {
      return { ...state, showParkDetails: action.parkId }
    }
    case "BACK_TO_PARKS": {
      return { ...state, showParkDetails: false }
    }
    case "CHANGE_SEARCH": {
      let search = action.value.length > 2 ? action.value.toLowerCase() : action.value
      return { ...state, search }
    }
    default: {
      return state
    }
  }
}