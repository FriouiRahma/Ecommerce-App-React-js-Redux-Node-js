import {
  GET_BOUTIQUES,
  UPDATE_BOUTIQUE,
  GET_BOUTQUEUSER,
  GET_BOUTQUEDETAIL,
  ADD_BOUTIQUE,
  GET_ALLBOUTUSER,
  DELETE_BOUTIQUE,
  UPDATE_BOUT,
  DESACTIVATE_BOUTIQUE,
  ACTIVATE_BOUTIQUE,
  ADD_BOUT,
  ADD_EDITOR,
  REMOVE_EDITOR,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//FR***08/07/2020****
//GET ALL BOUTQUES
export const loadBoutiques = () => async (dispatch) => {
  
  try {
    const res = await axios.get("/api/boutiques");

    dispatch({
      type: GET_BOUTIQUES,
      payload: res.data,
    });
  } catch (err) {}
};

//ADD BOUTQUES **PRIVATE ROUTE

export const addBoutique = ({ name, description, website, telephone, address, region, city, photo, photocouverture, type, fraislivraison, history }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // alert("entred");
  const body = JSON.stringify({
    name,
    description,
    website,
    telephone,
    address,
    region,
    city,
    photo,
    photocouverture,
    type,
    fraislivraison,
  });
  try {
    const tesadd = await axios.post("/api/boutiques/addboutique", body, config);

    dispatch({
      type: ADD_BOUTIQUE,
      payload: tesadd.data,
    });

    dispatch(setAlert("Boutique ajouté", "success", 3000));
    setTimeout(() => {
      history.push("/boutiques");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//ADD BOUTQUES **ADMIN

export const addboutadmin = ({ user, name, website, telephone, address, region, city, photo, history }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ user, name, website, telephone, address, region, city, photo });

  try {
    const tesadd = await axios.post("/api/boutiques/addboutadmin", body, config);
    //console.log(tesadd);
    dispatch({
      type: ADD_BOUT,
      payload: tesadd.data,
    });

    dispatch(setAlert("Boutique  ajouté", "success", 3000));
    setTimeout(() => {
      history.push(`/boutique-list`);
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//UPDATE BOUTIQUE **PRIVATE ROUTE

export const updateboutique = (newboutique, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newboutique);

  try {
    const resb = await axios.put(`/api/boutiques/${newboutique.id}`, body, config);

    dispatch({
      type: UPDATE_BOUTIQUE,
      payload: resb.data,
    });
    dispatch(setAlert("Boutique modifié", "success", 3000));
    dispatch(getBoutiqueUser());
    setTimeout(() => {
      history.push(`/boutiqueuser`);
    }, 3000);
  } catch (e) {
    console.log(e);
  }
};
//update boutique by admin

export const updateboutadmin = (newboutique, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newboutique);
  try {
    const res = await axios.put(`/api/boutiques/updateboutadmin/${newboutique.id}`, body, config);
    dispatch({
      type: UPDATE_BOUT,
      payload: res.data,
    });
    dispatch(setAlert("Boutique updated", "success", 3000));
    setTimeout(() => {
      history.push(`/boutique-list`);
    }, 3000);
  } catch (e) {
    console.log(e);
  }
};

//GET ONE BOUTIQUE BY ID
export const getBoutiqueById = (boutId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`/api/boutiques/boutique/${boutId}`, config);

    dispatch({
      type: GET_BOUTQUEDETAIL,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};
// GET ONE BOUTIQUE OF USER ** PRVATE ROUTE
export const getBoutiqueUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/boutiques/boutique_user");

    dispatch({
      type: GET_BOUTQUEUSER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//get boutique with user to admin
export const allboutwithuser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/boutiques/boutuser");

    dispatch({
      type: GET_ALLBOUTUSER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
// delete boutique by admin
export const removeBoutique = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/boutiques/deletebout/${id}`);

    dispatch({
      type: DELETE_BOUTIQUE,
      payload: id,
    });
    dispatch(setAlert("Boutique supprimé", "danger", 3000));
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: REMOVE_CURRENT_PRODUCT,
    //   payload: { msg: err.response.data.msg},
    // });
  }
};

//activate boutique *** update status

export const activateboutique = (id) => async (dispatch) => {
  try {
    await axios.put(`/api/boutiques/activate-boutique/${id}`);
    dispatch({
      type: ACTIVATE_BOUTIQUE,
      payload: id,
    });
  } catch (err) {}
};

//desactivate boutique *** update status

export const desactivateboutique = (id) => async (dispatch) => {
  try {
    await axios.put(`/api/boutiques/desactivate-boutique/${id}`);

    dispatch({
      type: DESACTIVATE_BOUTIQUE,
      payload: id,
    });
  } catch (err) {}
};
//user can add commecial to his boutique(Editor)
export const addcommecial = ({ id, editors }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ id, editors });
  try {
    const resEd = await axios.put(`/api/boutiques/addcommercial/${id}`, body, config);

    dispatch({
      type: ADD_EDITOR,
      payload: resEd.data,
    });
    dispatch(getBoutiqueUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// user can remove commercial from his boutique

export const removecommerciel = ({ id, idediteur }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ id, idediteur });

  try {
    const res = await axios.put(`/api/boutiques/deletecommercial/${id}`, body, config);
    dispatch({
      type: REMOVE_EDITOR,
      payload: res.data,
    });
    dispatch(getBoutiqueUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
