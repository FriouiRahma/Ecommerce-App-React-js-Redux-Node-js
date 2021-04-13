import {ADD_SECTION4,GET_SECTION_TYPE4,DELETE_SECTION_TYPE4,UPDATE_SECTION_TYPE4 } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//FR
//ADD SECTION3 BY ADMIN

export const addsection4 = ({name,titre,liensite,image,history }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({name,titre,liensite,image });
  //console.log("bodyyyyyyy33336",body);
  try {
    const ressection = await axios.post("/api/sectiontype4/addSection4", body, config);
    dispatch({
      type: ADD_SECTION4,
      payload: ressection.data,
    });
    dispatch(setAlert("Section ajoutée", "success", 3000));
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

//GET SECTIONtype3
export const loadSectiontype4 = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sectiontype4/getsectiontype4");

    dispatch({
      type: GET_SECTION_TYPE4,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeSectionType4 = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/sectiontype4/deletesectiontype4/${id}`);

    dispatch({
      type: DELETE_SECTION_TYPE4,
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

export const updateSectionType4 = (newsection, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newsection);
  try {
    const ressect = await axios.put(`/api/sectiontype4/${newsection.id}`, body, config);
    dispatch({
      type: UPDATE_SECTION_TYPE4,
      payload: ressect.data,
    });
    dispatch(setAlert("Section modifiée", "success", 3000));
    setTimeout(() => {
      history.push("/sectionlist4");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};









