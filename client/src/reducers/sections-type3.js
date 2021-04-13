import { GET_SECTION_TYPE3,DELETE_SECTION_TYPE3,UPDATE_SECTION_TYPE3 } from "../actions/types";

const initialState = {
  listsectype3: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SECTION_TYPE3:
      return { ...state, listsectype3: payload };
    case DELETE_SECTION_TYPE3:
      return{...state,listsectype3:state.listsectype3.filter(el=>el._id!==payload)}

    case UPDATE_SECTION_TYPE3:
      return{...state,listsectype3:state.listsectype3.map(el=>el._id===payload._id ? payload :el)}
    default:
      return state;
  }
}
