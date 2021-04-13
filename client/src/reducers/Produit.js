import {
  GET_PRODBOUTIQUE,
  DELETE_PRODUCT,
  GET_PRODUCTDETAIL,
  UPDATE_PRODUIT,
  GET_ALLPRODUCT,
  ADD_PRODBOUT,
  CONVERT_IMAGE,
} from "../actions/types";

const initialState = {
  listprod: [],
  prodboutique: [],
  proddetail: null,
  imageconverted: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALLPRODUCT:
      return { ...state, listprod: payload };
    case GET_PRODBOUTIQUE:
      return { ...state, prodboutique: payload };
    case ADD_PRODBOUT:
      return {
        ...state,
        prodboutique: [...state.prodboutique, payload],
        listprod: [...state.listprod, payload],
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        prodboutique: state.prodboutique.filter((el) => el._id !== action.payload),
      };
    case GET_PRODUCTDETAIL:
      return {
        ...state,
        proddetail: payload,
      };
    case UPDATE_PRODUIT:
      return {
        ...state,
        prodboutique: state.prodboutique.map((el) => (el._id === payload._id ? payload : el)),
        listprod: state.listprod.map((el) => (el._id === payload._id ? payload : el)),
        proddetail: payload,
      };

    case CONVERT_IMAGE:
      return {
        ...state,
        imageconverted: [...state.imageconverted, payload],
      };

    default:
      return state;
  }
}
