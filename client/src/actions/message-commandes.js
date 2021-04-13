import { SEND_MESSAGE, GET_MESSAGECOMM, GET_MESSCOMDETAIL } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const loadmessagecommande = () => async (dispatch) => {
  try {
    const resp = await axios.get("/api/messages/getmesscomm");
    //console.log(resp);
    dispatch({
      type: GET_MESSAGECOMM,
      payload: resp.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};
export const addmessage = ({ source, id_commande, contenu,idsource_user }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ source, id_commande, contenu,idsource_user });
  try {
    const message = await axios.post("/api/messages/message", body, config);
    dispatch(loadmessagecommande());
    dispatch({
      type: SEND_MESSAGE,
      payload: message.data,
    });

    dispatch(setAlert("Message envoyé", "success", 3000));
  } catch (e) {}
};

//GET ONE BOUTIQUE BY ID
export const getmesscommById = (comtId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`/api/messages/messcomm/${comtId}`, config);
    //console.log("boutique from back", res);

    dispatch({
      type: GET_MESSCOMDETAIL,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};
