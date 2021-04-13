import { ADD_SECTION5, GET_SECTION_TYPE5, DELETE_SECTION_TYPE5, UPDATE_SECTION_TYPE5 } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//FR
//ADD SECTION3 BY ADMIN

export const addsection5 = ({ name, titre, liensite1, publicite1, liensite2, publicite2, liensite3, publicite3, history }) => async (dispatch) => {
  //alert('hiiiiii')
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, titre, liensite1, publicite1, liensite2, publicite2, liensite3, publicite3 });
  //console.log("bodyyyyyyy3333555",body);
  try {
    const ressection = await axios.post("/api/sectiontype5/addSection5", body, config);
    dispatch({
      type: ADD_SECTION5,
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
export const loadSectiontype5 = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sectiontype5/getsectiontype5");

    dispatch({
      type: GET_SECTION_TYPE5,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeSectionType5 = (id) => async (dispatch) => {
  //alert('hiiiii')
  try {
    await axios.delete(`/api/sectiontype5/deletesectiontype5/${id}`);

    dispatch({
      type: DELETE_SECTION_TYPE5,
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

export const updateSectionType5 = (newsection, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newsection);
  try {
    const ressect = await axios.put(`/api/sectiontype5/${newsection.id}`, body, config);
    dispatch({
      type: UPDATE_SECTION_TYPE5,
      payload: ressect.data,
    });
    dispatch(setAlert("Sectione modifiée", "success", 3000));
    setTimeout(() => {
      history.push("/sectionlist5");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
