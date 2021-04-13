import { ADD_SLIDER, GET_SLIDERS, DELETE_SLIDER, UPDATE_SLIDER } from "../actions/types";

const initialState = {
  listslider: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_SLIDER:
      return { ...state, listslider: [...state.listslider, payload] };
    case GET_SLIDERS:
      return { ...state, listslider: payload };
    case DELETE_SLIDER:
      return { ...state, listslider: state.listslider.filter((el) => el._id !== payload) };
    case UPDATE_SLIDER:
      return {
        ...state,
        listslider: state.listslider.map((el) => (el._id === payload._id ? payload : el)),
      };
    default:
      return state;
  }
}
