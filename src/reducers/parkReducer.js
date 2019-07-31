let initialState = {
  parks: [],
  search: "",
  filter: "All"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_PARKS": {
      return { ...state, parks: action.data };
    }
    case "FILTER_PARKS": {
      return { ...state, filter: action.filter };
    }
    case "CHANGE_SEARCH": {
      let search = action.value.length > 2 ? action.value.toLowerCase() : action.value;
      return { ...state, search };
    }
    default: {
      return state;
    }
  }
};
