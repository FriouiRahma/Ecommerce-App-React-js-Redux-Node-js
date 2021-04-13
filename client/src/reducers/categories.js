import { GET_CATEGORIES, UPDTAE_CATEGRY, ADD_CATEGORY,DELETE_CATEGORIE } from "../actions/types";

const initialState = {
  list: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        list: payload,
      };
     
    case UPDTAE_CATEGRY:
      return {
        ...state,
        list: state.list.map((el) => (el._id === payload._id ? payload : el)),
      };
    case ADD_CATEGORY:
      return {
        ...state,
        list: [...state.list, payload],
      }
      case DELETE_CATEGORIE:
        return{
          ...state,
          list: state.list.filter((el) => el._id !== payload),
        }
     
   

    default:
      return state;
  }
}
