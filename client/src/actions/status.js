import axios from "axios";
import { GET_STATUS, ADD_STATUS, UPDATE_STATUS, DELETE_STATUS, ADD_NEXT_STATUS, REMOVE_NEXT_STATUS } from "./types";
import { setAlert } from "./alert";

/**recupération status */
export const loadstatus = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/status/getstatus");
    dispatch({
      type: GET_STATUS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

/*add status by admin */
export const addstatus = ({ name, couleur }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, couleur });
  try {
    const res = await axios.post("/api/status/addstatusadmin", body, config);
    dispatch({
      type: ADD_STATUS,
      payload: res.data,
    });
    dispatch(setAlert("Status ajouté", "success", 3000));
    dispatch(loadstatus());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
/***add status by boutique */
export const addstatusboutique = ({ name, couleur, id_boutique }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, couleur, id_boutique });
  try {
    const res = await axios.post("/api/status/addstatusboutique", body, config);
    dispatch({
      type: ADD_STATUS,
      payload: res.data,
    });
    dispatch(setAlert("Status ajouté", "success", 3000));
    dispatch(loadstatus());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

/***update status by admin */
export const updatestatus = (newstatus, history) => async (dispatch) => {
  // alert("onsubmit action");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // alert("onsubmit action");
  const body = JSON.stringify(newstatus);
  //console.log("body", body);
  try {
    const res = await axios.put(`/api/status/updatestatus/${newstatus.id}`, body, config);
    //console.log("boutique updated from back", resb);
    dispatch({
      type: UPDATE_STATUS,
      payload: res.data,
    });
    dispatch(setAlert("status modifié", "success", 3000));
    dispatch(loadstatus());
    setTimeout(() => {
      history.push("/Status-List-Admin");
    }, 3000);
  } catch (e) {
    console.log(e);
  }
};

/******update status by boutique */
export const updatestatusboutique = (newstatus, history) => async (dispatch) => {
  // alert("onsubmit action");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // alert("onsubmit action");
  const body = JSON.stringify(newstatus);
  //console.log("body", body);
  try {
    const res = await axios.put(`/api/status/updatestatus/${newstatus.id}`, body, config);
    //console.log("boutique updated from back", resb);
    dispatch({
      type: UPDATE_STATUS,
      payload: res.data,
    });
    dispatch(setAlert("status modifié", "success", 3000));
    dispatch(loadstatus());
    setTimeout(() => {
      history.push("/updateboutique");
    }, 3000);
  } catch (e) {
    console.log(e);
  }
};
/** delete status by admin */
export const removeStatus = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/status/deletestatus/${id}`);
    dispatch({
      type: DELETE_STATUS,
      payload: id,
    });
    dispatch(setAlert("Status supprimé", "danger", 3000));
    dispatch(loadstatus());
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: REMOVE_CURRENT_PRODUCT,
    //   payload: { msg: err.response.data.msg},
    // });
  }
};
//user can add Note
export const addNextstatus = ({ idstatus, nextstatus }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ idstatus, nextstatus });
  try {
    const resNext = await axios.put(`/api/status/addnext/${idstatus}`, body, config);

    dispatch({
      type: ADD_NEXT_STATUS,
      payload: resNext.data,
    });
    dispatch(setAlert("next status ajoutée", "success", 3000));
    dispatch(loadstatus());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// user can remove commercial from his boutique

export const removestatus = ({ id, idnextstatus }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ id, idnextstatus });

  try {
    const res = await axios.put(`/api/status/deletestatus/${id}`, body, config);
    dispatch({
      type: REMOVE_NEXT_STATUS,
      payload: res.data,
    });
    dispatch(setAlert("next status supprimé", "danger", 3000));
    dispatch(loadstatus());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
