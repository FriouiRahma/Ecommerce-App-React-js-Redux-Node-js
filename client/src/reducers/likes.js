import { GET_USERSLIKES, ADD_USERLIKES, DELETE_LIKE, LOGOUT, GET_ALLLIKES } from "../actions/types";

const initialestate = {
  likeuserlist: [],
  likelist: [],
};

export default function (state = initialestate, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERSLIKES:
      return { ...state, likeuserlist: payload };
    case ADD_USERLIKES:
      return { ...state, likeuserlist: [...state.likeuserlist, payload] };
    case DELETE_LIKE:
      return { ...state, likeuserlist: state.likeuserlist.filter((el) => el.productt !== payload) };
    case GET_ALLLIKES:
      return { ...state, likelist: payload };
    case LOGOUT:
      return { ...state, likeuserlist: [] };
    default:
      return state;
  }
}
