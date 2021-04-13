import { ADD_SECTIONS, GET_SECTIONS, UPDATE_SECTION, DELETE_SECTION} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//FR ** 10/08/2020***
//ADD SECTION BY ADMIN

export const addsection = ({ name, titre, productID, history }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, titre, productID });
  
  try {
    const ressection = await axios.post("/api/sections/addSection", body, config);
    dispatch({
      type: ADD_SECTIONS,
      payload: ressection.data,
    });
    dispatch(setAlert("Section added", "success", 3000));
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

//GET SECTIONS
export const loadSections = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sections/getsections");

    dispatch({
      type: GET_SECTIONS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//update section *** BY ADMIN

export const updatesection = (newsection, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newsection);
  try {
    const ressect = await axios.put(`/api/sections/${newsection.id}`, body, config);
    dispatch({
      type: UPDATE_SECTION,
      payload: ressect.data,
    });
    dispatch(setAlert("Section modifiée", "success", 3000));
    setTimeout(() => {
      history.push("/sectionlistadmin");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//DELETE_SECTION **BY ADMIN
export const removeSection = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/sections/deletesection/${id}`);

    dispatch({
      type: DELETE_SECTION,
      payload: id,
    });
    dispatch(setAlert("Section supprimée", "danger", 3000));
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: REMOVE_CURRENT_PRODUCT,
    //   payload: { msg: err.response.data.msg},
    // });
  }
};

