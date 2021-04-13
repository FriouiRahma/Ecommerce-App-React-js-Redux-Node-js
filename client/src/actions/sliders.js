import { ADD_SLIDER, GET_SLIDERS, DELETE_SLIDER, UPDATE_SLIDER } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const addslider = ({ titre, photo, description, lien }) => async (dispatch) => {
  alert("add slider");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ titre, photo, description, lien });
  //console.log(body);
  try {
    const resslider = await axios.post("/api/sliders/addSlider", body, config);
    dispatch({
      type: ADD_SLIDER,
      payload: resslider.data,
    });
    dispatch(setAlert("Slider ajouté", "success", 3000));
  } catch (e) {}
};

//GET SLIDERS
export const loadSliders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sliders/getsliders");

    dispatch({
      type: GET_SLIDERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
//delete slider
export const removeslider = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/sliders/deleteslider/${id}`);

    dispatch({
      type: DELETE_SLIDER,
      payload: id,
    });
    dispatch(setAlert("SLIDER supprimé", "danger", 3000));
  } catch (err) {
    //
  }
};
//update/slider *** BY ADMIN

export const updateslider = (newslider) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newslider);
  //console.log("imagetoupdate", body);
  try {
    const resslid = await axios.put(`/api/sliders/${newslider.id}`, body, config);
    dispatch({
      type: UPDATE_SLIDER,
      payload: resslid.data,
    });
    dispatch(setAlert("Slider modifieé", "success", 3000));
  } catch (err) {}
};
