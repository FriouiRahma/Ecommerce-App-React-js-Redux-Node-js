import { ADD_SECTTIINGS, DELETE_SETTING, GET_ALL_SETTINGS, UPDATE_SETTINGS,GET_FILES_SETTINGS } from "../actions/types";

const initialState = {
  listsettings: [],
  filessettinges:[]
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_SECTTIINGS:
      return { ...state, listsettings: [...state.listsettings, payload] };
    case GET_ALL_SETTINGS:
      return { ...state, listsettings: payload };
    case UPDATE_SETTINGS:
      return {
        ...state,
        listsettings: state.listsettings.map((el) => (el._id === payload._id ? payload : el)),
      };
    case DELETE_SETTING:
      return { ...state, listsettings: state.listsettings.filter((el) => el._id !== payload) };
      case GET_FILES_SETTINGS:
        return{...state,filessettinges:[...state.filessettinges,payload]}



    default:
      return state;
  }
}
