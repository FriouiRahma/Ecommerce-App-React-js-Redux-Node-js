import { GET_STATUS, ADD_STATUS, UPDATE_STATUS, DELETE_STATUS } from "../actions/types";

const initialState = {
  liststatus: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STATUS:
      return { ...state, liststatus: payload };
    case ADD_STATUS:
      return { ...state, liststatus: [...state.liststatus, payload] };
    case UPDATE_STATUS:
      return { ...state, liststatus: state.liststatus.map((el) => (el._id === payload ? payload : el)) };
    case DELETE_STATUS:
      return { ...state, liststatus: state.liststatus.filter((el) => el._id !== payload) };
    default:
      return state;
  }
}
