import { BreakTypes } from "../types";

const initialState = {
    breakState: 'no-break',
    windowChanged: true,
    breakType: '',
    breakDescription: '',
    breakStartTime: '',
};

const BreakReducer = (state = initialState, action) => {
  switch (action.type) {
    case BreakTypes.START_BREAK:
      return { ...state, breakState: 'break', windowChanged: false, ...action.payload};

    case BreakTypes.END_BREAK:
      return { ...state, breakState: 'break-feedback' };

     case BreakTypes.CLOSE_BREAK_SCREEN:
      return { ...state, breakState: 'no-break', windowChanged:false };

     case BreakTypes.SET_WINDOW_CHANGED:
      return { ...state, windowChanged:true };


    default:
      return state;
  }
};

export default BreakReducer;
