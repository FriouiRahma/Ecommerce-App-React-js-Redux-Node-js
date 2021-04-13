import {
  GET_BOUTIQUES,
  GET_BOUTQUEDETAIL,
  GET_BOUTQUEUSER,
  LOGOUT,
  UPDATE_BOUTIQUE,
  ADD_BOUTIQUE,
  GET_ALLBOUTUSER,
  DELETE_BOUTIQUE,
  UPDATE_BOUT,
  ACTIVATE_BOUTIQUE,
  DESACTIVATE_BOUTIQUE,
  ADD_BOUT,
  ADD_EDITOR,
  REMOVE_EDITOR,
} from "../actions/types";

//FR***08/07/2020****
const initialState = {
  list: [],
  // boutiquedetail
  boutiquedetail: null,
  boutiqueuser: [],
  boutuseradm: [],
  // current: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BOUTIQUES:
      return { ...state, list: payload };
    case GET_BOUTQUEUSER:
      return { ...state, boutiqueuser: payload };
    //case ADD_EDITOR:
    // case REMOVE_EDITOR:
    case UPDATE_BOUTIQUE:
      return {
        ...state,
        boutiqueuser: state.boutiqueuser.map((el) => (el._id === payload._id ? payload : el)),
        list: state.list.map((el) => (el._id === payload._id ? payload : el)),
      };

    case UPDATE_BOUT:
      return {
        ...state,
        boutuseradm: state.boutuseradm.map((el) => (el._id === payload._id ? payload : el)),
      };
    //Add boutique
    case ADD_BOUTIQUE:
      return {
        ...state,
        list: [...state.list, payload],
      };
    case GET_BOUTQUEDETAIL:
      return { ...state, boutiquedetail: payload };
    case LOGOUT:
      return { ...state, boutiquedetail: null, boutiqueuser: null };
    case GET_ALLBOUTUSER:
      return { ...state, boutuseradm: payload };
    case DELETE_BOUTIQUE:
      return {
        ...state,
        boutuseradm: state.boutuseradm.filter((el) => el._id !== payload),
        list: state.list.filter((el) => el._id !== payload),
      };
    case ACTIVATE_BOUTIQUE:
      return {
        ...state,
        boutuseradm: state.boutuseradm.map((el) => (el._id === payload ? { ...el, status: "1" } : el)),
      };
    case DESACTIVATE_BOUTIQUE:
      return {
        ...state,
        boutuseradm: state.boutuseradm.map((el) => (el._id === payload ? { ...el, status: "0" } : el)),
      };
    case ADD_BOUT:
      return {
        ...state,
        boutuseradm: [...state.boutuseradm, payload],
      };
    default:
      return state;
  }
}
