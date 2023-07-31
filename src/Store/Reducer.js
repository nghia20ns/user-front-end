import {
  CHOOSE_DETAIL_USER,
  IS_ALERT,
  IS_LOGIN,
  SET_TODO_INPUT,
  SHOW_ALL_USER,
  SHOW_MESSAGE_ALERT,
} from "./Constant";

export const initialState = {
  isAlert: false,
  showMessageAlert: "",
  isLogin: false,
  showAllUser: [],
  todoState: "",
  todoInput: "dashboard",
  stateDetailUser: "",
  error: null,
};
const Reducer = (state, action) => {
  switch (action.type) {
    case SET_TODO_INPUT:
      return {
        ...state,
        todoInput: action.payload,
      };

    case CHOOSE_DETAIL_USER:
      return {
        ...state,
        stateDetailUser: action.payload,
      };
    case SHOW_ALL_USER:
      return {
        ...state,
        showAllUser: action.payload,
      };
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case IS_ALERT:
      return {
        ...state,
        isAlert: action.payload,
      };
    case SHOW_MESSAGE_ALERT:
      return {
        ...state,
        showMessageAlert: action.payload,
      };
    //-------------more--------------//
    default:
      return state;
  }
};
export default Reducer;
