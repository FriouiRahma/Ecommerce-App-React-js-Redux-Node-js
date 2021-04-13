import axios from "axios";
import { GET_USERSLIKES, ADD_USERLIKES, DELETE_LIKE, GET_ALLLIKES } from "./types";

/* add like*/
export const addLike = ({ productt }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ productt });
  try {
    const like = await axios.post("/api/likes/addlike", body, config);
    //console.log(like);
    dispatch({
      type: ADD_USERLIKES,
      payload: like.data,
    });
    dispatch(loaduserlikes());
    dispatch(nombrelikes());
  } catch (err) {
    console.log(err);
  }
};

// suppriemer likes

export const removeLike = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/likes/deletelike/${id}`);

    dispatch({
      type: DELETE_LIKE,
      payload: id,
    });
    dispatch(loaduserlikes());
    dispatch(nombrelikes());
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: REMOVE_CURRENT_PRODUCT,
    //   payload: { msg: err.response.data.msg},
    // });
  }
};

// FR** 28/07/2020*** Get likes of users

export const loaduserlikes = () => async (dispatch) => {
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  try {
    const reslike = await axios.get("/api/likes/likesusers");
    //console.log(reslike);
    dispatch({
      type: GET_USERSLIKES,
      payload: reslike.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//get all likes
export const nombrelikes = () => async (dispatch) => {
  try {
    const nbrlikes = await axios.get("/api/likes/alllikes");
    dispatch({
      type: GET_ALLLIKES,
      payload: nbrlikes.data,
    });
  } catch (err) {
    console.log(err);
  }
};
