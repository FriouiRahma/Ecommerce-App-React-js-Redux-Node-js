import { GET_SECTIONS_BYTYPE, ADD_SECTIONS_BYTYPE, DELETE_SECTIONS_BYTYPE, GET_SECTIONS_GLOBAL, DELETE_SECTION_GLOBTYPE, MODIF_ORDER } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//FR ** 10/08/2020***
//GET SECTION-TYPE BY ADMIN

export const getsectionbytype = ({ type }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ type });
  //console.log("bodyyyyyyy",body);
  try {
    const ressections = await axios.post("/api/globalsections/getglobalsection", body, config);
    console.log("ressections", ressections);
    dispatch({
      type: GET_SECTIONS_BYTYPE,
      payload: ressections.data,
    });
    dispatch(setAlert(`you  get elements of type num-${type}`, "success", 3000));
  } catch (err) {
    console.log(err);
  }
};
export const addsectionbytype = ({ typesection, idsectiontype }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ typesection, idsectiontype });
  //console.log("bodyyyyyyy",body);
  try {
    const ressections = await axios.post("/api/globalsections/addsectionsbytype", body, config);
    dispatch({
      type: ADD_SECTIONS_BYTYPE,
      payload: ressections.data,
    });
    dispatch(getallsectionsglobal());
    dispatch(setAlert(`you added an element of type num-${typesection}`, "success", 3000));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
export const deletesectionbytype = (idsectiontype) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const ressections = await axios.delete(`/api/globalsections/deletesectionsbytype/${idsectiontype}`, config);

    dispatch({
      type: DELETE_SECTIONS_BYTYPE,
      payload: idsectiontype,
    });

    dispatch(setAlert(`element deleted`, "danger", 3000));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const getallsectionsglobal = () => async (dispatch) => {
  try {
    const ressections = await axios.get(`/api/globalsections/getsectionsglobal`);

    dispatch({
      type: GET_SECTIONS_GLOBAL,
      payload: ressections.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//DELETE_SECTION **BY ADMIN
export const removeSectionGlobType = (id) => async (dispatch) => {
  //alert('hiiiiiiiiii')
  try {
    await axios.delete(`/api/globalsections/deletesectionbytype2/${id}`);

    dispatch({
      type: DELETE_SECTION_GLOBTYPE,
      payload: id,
    });
    dispatch(setAlert("SECTION removed from global section", "danger", 3000));
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: REMOVE_CURRENT_PRODUCT,
    //   payload: { msg: err.response.data.msg},
    // });
  }
};

export const modiforder = ({ id, neworder }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ id, neworder });

  try {
    const resorder = await axios.put(`/api/globalsections/modiforder/${id}`, body, config);

    dispatch({
      type: MODIF_ORDER,
      payload: resorder,
    });
    dispatch(getallsectionsglobal());
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: REMOVE_CURRENT_PRODUCT,
    //   payload: { msg: err.response.data.msg},
    // });
  }
};
