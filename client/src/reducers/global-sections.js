import { GET_SECTIONS_BYTYPE,GET_SECTIONS_GLOBAL,DELETE_SECTIONS_BYTYPE,ADD_SECTIONS_BYTYPE,MODIF_ORDER } from "../actions/types";

const initialState = {
  sectionsbytype: [],
  globalSection:[]
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SECTIONS_BYTYPE:
      return { ...state, sectionsbytype: payload };
    case GET_SECTIONS_GLOBAL:
      return{...state,globalSection:payload}
      case DELETE_SECTIONS_BYTYPE:
      return {...state,globalSection:state.globalSection.filter(el=>el.id_sections_type!==payload)}
    case ADD_SECTIONS_BYTYPE:
      return{...state,globalSection:[...state.globalSection,payload]  }
    case MODIF_ORDER:
      return{...state,globalSection:state.globalSection.map(el=>el._id===payload._id?payload:el)}

    default:
      return state;
  }
}
