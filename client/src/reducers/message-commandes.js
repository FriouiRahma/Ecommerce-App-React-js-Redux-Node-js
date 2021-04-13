import { SEND_MESSAGE, GET_MESSAGECOMM, GET_MESSCOMDETAIL } from "../actions/types";

const initialState = {
  messlist: [],
  messcommande: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messlist: [...state.messlist, payload],
      };
    case GET_MESSAGECOMM:
      return {
        ...state,
        messlist: payload,
      };
    case GET_MESSCOMDETAIL:
      return {
        ...state,
        messcommande: payload,
      };

    default:
      return state;
  }
}
