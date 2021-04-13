import {ADD_SECTION3,GET_SECTION_TYPE3,DELETE_SECTION_TYPE3,UPDATE_SECTION_TYPE3 } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//FR
//ADD SECTION3 BY ADMIN

export const addsection3 = ({name, titre, productID, video ,liensite1,publicite1,history }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({name, titre, productID,video,liensite1,publicite1 });
  //console.log("bodyyyyyyy33336",body);
  try {
    const ressection = await axios.post("/api/sectiontype3/addSection3", body, config);
    dispatch({
      type: ADD_SECTION3,
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
//GET SECTIONtype3
export const loadSectiontype3 = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sectiontype3/getsectiontype3");

    dispatch({
      type: GET_SECTION_TYPE3,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const removeSectionType3 = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/sectiontype3/deletesectiontype3/${id}`);

    dispatch({
      type: DELETE_SECTION_TYPE3,
      payload: id,
    });
    dispatch(setAlert("SECTION supprimée", "danger", 3000));
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: REMOVE_CURRENT_PRODUCT,
    //   payload: { msg: err.response.data.msg},
    // });
  }
};


//update section *** BY ADMIN

export const updateSectionType3 = (newsection, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newsection);
  try {
    const ressect = await axios.put(`/api/sectiontype3/${newsection.id}`, body, config);
    dispatch({
      type: UPDATE_SECTION_TYPE3,
      payload: ressect.data,
    });
    dispatch(setAlert("Section modifiée", "success", 3000));
    setTimeout(() => {
      history.push("/sectionlist3");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};












