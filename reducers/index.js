import {
  LOGIN,
  LOGOUT,
  PRODUCT_LIST,
  SHOW_USER,
  REMOVE_ITEM,
  ADD_ITEM,
  ERROR
} from "../actions/constant";
import { combineReducers } from "redux";

const initState = {
  users: [],
  products: []
};

const Dashboard = (state, action) => {
  state = initState;
  switch (action.type) {
    case LOGIN:
      return { ...state, users: action.payload };
    case LOGOUT:
      return { ...state, users: [] };
    case PRODUCT_LIST:
      return { ...state, products: action.payload.list };
    case REMOVE_ITEM:
      return { ...state, products: action.payload.list };
    case ADD_ITEM:
      return { ...state, products: action.payload.list };
    default:
      return state;
  }
};

export default combineReducers({ Dashboard });
