import { GET_SECTION_TYPE2,DELETE_SECTION_TYPE2,UPDATE_SECTION_TYPE2 } from "../actions/types";

const initialState = {
  listsectype2: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SECTION_TYPE2:
      return { ...state, listsectype2: payload };
    case DELETE_SECTION_TYPE2:
        return{...state,listsectype2:state.listsectype2.filter(el=>el._id!==payload)}
    case UPDATE_SECTION_TYPE2:
      return{...state,listsectype2:state.listsectype2.map(el=> el._id === payload._id ? payload : el)}
    default:
      return state;
  }
}
