import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOAD_USERS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  CONNECT_FB_SUCCESS,
  PROFILE_LOADED,
  PROFILE_UPDATED,
  DELETE_USER,
  UPDATE_USER,
  ACTIVATE_USER,
  DESACTIVATE_USER,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  userslist: null,
  profile: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOAD_USERS:
      return {
        ...state,
        userslist: payload,
      };
    case PROFILE_LOADED:
    case PROFILE_UPDATED:
      return {
        ...state,
        loading: false,
        profile: payload,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case CONNECT_FB_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        profile: null,
      };

    case DELETE_USER:
      return {
        ...state,
        userslist: state.userslist.filter((el) => el._id !== action.payload),
      };
    case UPDATE_USER:
      return {
        ...state,
        userslist: state.userslist.map((el) => (el._id === payload._id ? payload : el)),
      };
    case ACTIVATE_USER:
      return {
        ...state,
        userslist: state.userslist.map((el) => (el._id === payload ? { ...el, status: "1" } : el)),
      };
    case DESACTIVATE_USER:
      return {
        ...state,
        userslist: state.userslist.map((el) => (el._id === payload ? { ...el, status: "0" } : el)),
      };
    default:
      return state;
  }
}
