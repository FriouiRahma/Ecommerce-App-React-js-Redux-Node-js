import { ADD_SECTIONS, GET_SECTIONS, UPDATE_SECTION, DELETE_SECTION } from "../actions/types";

const initialState = {
  listsection: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_SECTIONS:
      return { ...state, listsection: [...state.listsection, payload] };
    case GET_SECTIONS:
      return { ...state, listsection: payload };
    case UPDATE_SECTION:
      return {
        ...state,
        listsection: state.listsection.map((el) => (el._id === payload._id ? payload : el)),
      };
    case DELETE_SECTION:
      return { ...state, listsection: state.listsection.filter((el) => el._id !== payload) };

    default:
      return state;
  }
}
