import {ADD_SECTION2,GET_SECTION_TYPE2,DELETE_SECTION_TYPE2,UPDATE_SECTION_TYPE2 } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//FR
//ADD SECTION3 BY ADMIN

export const addsection2 = ({name, titre, productID, video ,history }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({name, titre, productID,video, });
 // console.log("bodyyyyyyy222222226",body);
  try {
    const ressection = await axios.post("/api/sectiontype2/addSection2", body, config);
    dispatch({
      type: ADD_SECTION2,
      payload: ressection.data,
    });
    dispatch(setAlert("Section modifiée", "success", 3000));
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
//GET SECTIONtype2
export const loadSectiontype2 = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sectiontype2/getsectiontype2");

    dispatch({
      type: GET_SECTION_TYPE2,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
//DELETE_SECTION **BY ADMIN
export const removeSectionType2 = (id) => async (dispatch) => {
  alert('hiiiiii')
  try {
    await axios.delete(`/api/sectiontype2/deletesectiontype2/${id}`);

    dispatch({
      type: DELETE_SECTION_TYPE2,
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


//update section *** BY ADMIN

export const updateSectionType2 = (newsection, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newsection);
  try {
    const ressect = await axios.put(`/api/sectiontype2/${newsection.id}`, body, config);
    dispatch({
      type: UPDATE_SECTION_TYPE2,
      payload: ressect.data,
    });
    dispatch(setAlert("Section modifiée", "success", 3000));
    setTimeout(() => {
      history.push("/sectionlist2");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};












