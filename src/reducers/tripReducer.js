let initialState = {
  trips: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_TRIPS": {
      console.log(action.data);
      let trips = action.data.length === 0 ? [...state.trips] : [...state.trips, ...action.data]
      return { ...state, trips }
    }
    case "CLEAR_TRIPS": {
      return { ...state, trips: [] }
    }
    default: {
      return state
    }
  }
}