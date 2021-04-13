import axios from "axios";
import {
  USER_LOADED,
  LOAD_USERS,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  CONNECT_FB_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  PROFILE_LOADED,
  PROFILE_UPDATED,
  DELETE_USER,
  UPDATE_USER,
  ACTIVATE_USER,
  DESACTIVATE_USER,
} from "./types";
import { setAlert } from "./alert";
import { getBoutiqueUser } from "./Boutiques";
import { loaduserlikes } from "./likes";
import { loadcommande, verifiduser, recupcommande } from "./commande";

// load users/admin
export const loadUsersAdmin = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/usersadmin");
    //console.log("load user admin", res);
    dispatch({
      type: LOAD_USERS,
      payload: res.data,
    });
  } catch {}
};

//delete user by admin
export const removeuser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/deleteuser/${id}`);

    dispatch({
      type: DELETE_USER,
      payload: id,
    });
    dispatch(setAlert("USER removed", "danger", 3000));
  } catch (err) {
    //
  }
};

//UPDATE USER by ADMIN

export const updateuser = (newuser, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newuser);

  try {
    const res = await axios.put(`/api/users/updateuser/${newuser.id}`, body, config);
    //console.log("produit updated from back", res);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    dispatch(setAlert("Product updated", "success", 3000));
    setTimeout(() => {
      history.push(`/user-list`);
    }, 3000);
  } catch (err) {
    console.log(err);
  }
};

//activate user *** update status

export const activateuser = (id) => async (dispatch) => {
  try {
    await axios.put(`/api/users/activate-status/${id}`);

    dispatch({
      type: ACTIVATE_USER,
      payload: id,
    });
  } catch (err) {}
};

//desactivate user ** update status

export const desactivateuser = (id) => async (dispatch) => {
  //console.log("iduser",id)
  try {
    await axios.put(`/api/users/desactivate-status/${id}`);

    dispatch({
      type: DESACTIVATE_USER,
      payload: id,
    });
  } catch (err) {}
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users");
    //console.log("load user res", res);
    const id = res.data._id;
    //console.log("iduserrrr", id);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(verifiduser(id));
    dispatch(loadcommande());
    dispatch(loadProfile());
    //dispatch action load boutique of user
    //load likes of user
    dispatch(getBoutiqueUser());
    dispatch(loaduserlikes());
    dispatch(recupcommande());
  } catch (err) {
    // const errors = err.response.data.errors;
    console.log("not authenticated");
    console.log(err);

    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// Load User
export const loadProfile = () => async (dispatch) => {
  console.log("load profile here");

  try {
    const res = await axios.get("/api/users/profile/me");
    console.log("load profile res", res);

    dispatch({
      type: PROFILE_LOADED,
      payload: res.data,
    });
  } catch (err) {}
};

export const register = ({ firstname, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ firstname, email, password });

  try {
    const res = await axios.post("/api/users/signup", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users/signin", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const connectFb = (email, firstname, lastname) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, firstname, lastname });

  try {
    const res = await axios.post("/api/users/connect-fb", body, config);
    dispatch({
      type: CONNECT_FB_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const forgetPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  try {
    const res = await axios.post("/api/users/forget-password", body, config);
    console.log(res);

    dispatch(setAlert("Email Successfully sended", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const resetPassword = (password, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ password, token });
  console.log("reset");

  try {
    const res = await axios.post("/api/users/reset-password", body, config);
    console.log(res);

    dispatch(setAlert("Pawwsord Successfully changed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const updateProfile = (profile, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(profile);
  console.log(profile);

  try {
    const res = await axios.post("/api/users/profile", body, config);
    dispatch({
      type: PROFILE_UPDATED,
      payload: res.data,
    });

    dispatch(setAlert("Profile updated", "success", 3000));
    setTimeout(() => {
      history.push("/profile");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
