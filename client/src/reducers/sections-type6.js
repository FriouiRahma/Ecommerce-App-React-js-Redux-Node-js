import { GET_SECTION_TYPE6,DELETE_SECTION_TYPE6} from "../actions/types";

const initialState = {
  listsectype6: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SECTION_TYPE6:
      return { ...state, listsectype6: payload };
      
    case DELETE_SECTION_TYPE6:
      return{...state,listsectype6:state.listsectype6.filter(el=>el._id!==payload)}  
    default:
      return state;
  }
}
