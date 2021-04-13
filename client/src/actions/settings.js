import axios from "axios";
import { setAlert } from "./alert";
import { ADD_SECTTIINGS, DELETE_SETTING, GET_ALL_SETTINGS, UPDATE_SETTINGS,GET_FILES_SETTINGS } from "./types";

/******get settings */
export const loadsettings = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/settings/getallsettings");
    dispatch({
      type: GET_ALL_SETTINGS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
/*/***add settings by admin */
export const addsetting = ({ image1, image2, lienright, history }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ image1, image2, lienright });
  try {
    const ressetting = await axios.post("/api/settings/addsettings", body, config);
    dispatch({
      type: ADD_SECTTIINGS,
      payload: ressetting.data,
    });
    dispatch(loadsettings());
    dispatch(setAlert("Setting ajoutée", "success", 3000));
    setTimeout(() => {
      history.push("/admin-dashboard");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

/*****delete setting by admin */
export const deletesetting = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/settings/deletesetting/${id}`);
    dispatch({
      type: DELETE_SETTING,
      payload: id,
    });
    dispatch(loadsettings());
    dispatch(setAlert("Setting supprimée", "danger", 3000));
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: REMOVE_CURRENT_PRODUCT,
    //   payload: { msg: err.response.data.msg},
    // });
  }
};

export const updatesetting = (newsetting, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newsetting);

  try {
    const resset = await axios.put(`/api/settings/${newsetting.id}`, body, config);
    dispatch({
      type: UPDATE_SETTINGS,
      payload: resset.data,
    });
    dispatch(loadsettings());
    setTimeout(() => {
      history.push("/settinglist");
    }, 3000);
    dispatch(setAlert("Setting modifieé", "success", 3000));
  } catch (err) {}
};

/****get filessettings */
export const getfilessettings = () => async (dispatch) => {
  try {
    const resfilessetting = await axios.get("/api/settings/getfilessettings");
    dispatch({
      type: GET_FILES_SETTINGS,
      payload: resfilessetting.data,
    });
  } catch {}
};
