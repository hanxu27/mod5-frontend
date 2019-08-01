let initialState = {
  trips: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_TRIPS": {
      let trips = action.data ? [...state.trips, ...action.data] : [...state.trips];
      return { ...state, trips };
    }
    case "CLEAR_TRIPS": {
      return { ...state, trips: [] };
    }
    default: {
      return state;
    }
  }
};
