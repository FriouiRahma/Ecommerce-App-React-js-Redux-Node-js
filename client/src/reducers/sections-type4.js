import { GET_SECTION_TYPE4 ,DELETE_SECTION_TYPE4,UPDATE_SECTION_TYPE4} from "../actions/types";

const initialState = {
  listsectype4: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SECTION_TYPE4:
      return { ...state, listsectype4: payload };
    case DELETE_SECTION_TYPE4:
      return{...state,listsectype4:state.listsectype4.filter(el=>el._id!==payload)}
      case UPDATE_SECTION_TYPE4:
        return{...state,listsectype4:state.listsectype4.map(el=>el._id===payload._id? payload:el)}
    default:
      return state;
  }
}
