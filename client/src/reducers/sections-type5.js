import { GET_SECTION_TYPE5,DELETE_SECTION_TYPE5,UPDATE_SECTION_TYPE5 } from "../actions/types";

const initialState = {
  listsectype5: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SECTION_TYPE5:
      return { ...state, listsectype5: payload };
    case DELETE_SECTION_TYPE5:
      return {...state,listsectype5:state.listsectype5.filter(el=>el._id!=payload)}
    case UPDATE_SECTION_TYPE5:
      return{...state,listsectype5:state.listsectype5.map(el=>el._id===payload._id ? payload:el )}  
    default:
      return state;
  }
}
