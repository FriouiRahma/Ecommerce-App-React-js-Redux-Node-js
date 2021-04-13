import { ADD_SECTION6, GET_SECTION_TYPE6, DELETE_SECTION_TYPE6, UPDATE_SECTION_TYPE6 } from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//FR
//ADD SECTION3 BY ADMIN

export const addsection6 = ({ name, titre, name1, paragraphe1, image1, name2, paragraphe2, image2, history }) => async (dispatch) => {
  //alert('hiiiiii')
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, titre, name1, paragraphe1, image1, name2, paragraphe2, image2 });
  //console.log("bodyyyyyyy3333555",body);
  try {
    const ressection = await axios.post("/api/sectiontype6/addSection6", body, config);
    dispatch({
      type: ADD_SECTION6,
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
export const loadSectiontype6 = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/sectiontype6/getsectiontype6");

    dispatch({
      type: GET_SECTION_TYPE6,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeSectionType6 = (id) => async (dispatch) => {
  // alert('hiiiii')
  try {
    await axios.delete(`/api/sectiontype6/deletesectiontype6/${id}`);

    dispatch({
      type: DELETE_SECTION_TYPE6,
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

export const updateSectionType6 = (newsection, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newsection);
  try {
    const ressect = await axios.put(`/api/sectiontype6/${newsection.id}`, body, config);
    dispatch({
      type: UPDATE_SECTION_TYPE6,
      payload: ressect.data,
    });
    dispatch(setAlert("Section modifiée", "success", 3000));
    setTimeout(() => {
      history.push("/sectionlist6");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
