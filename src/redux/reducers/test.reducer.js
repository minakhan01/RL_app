const initialState = {
  value: null,
  loading: false,
  err: null,
};

const TestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

export default TestReducer;
