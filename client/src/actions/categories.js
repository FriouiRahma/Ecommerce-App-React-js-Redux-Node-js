import { GET_CATEGORIES, UPDTAE_CATEGRY, ADD_CATEGORY, DELETE_CATEGORIE } from "../actions/types";
import axios from "axios";
import { setAlert } from "./alert";
//add category admin
export const addCategory = ({ parent, name, slug, order }, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ parent, name, slug, order });
  const res = await axios.post("/api/categories/addcategory", body, config);
  try {
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert("catégorie ajoutée", "success", 3000));
    setTimeout(() => {
      history.push("/category-list-admin");
    }, 3000);
  } catch (err) {
    console.log(err);
  }
};
//update category Admin
export const UpdateCategory = (newcategory, parent, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //alert("update parent")
  const body = JSON.stringify({ ...newcategory, parent });
  //console.log("newcategpry", body);
  try {
    const res = await axios.put(`/api/categories/${newcategory.id}`, body, config);
    //dispatch(loadCategories());
    dispatch({
      type: UPDTAE_CATEGRY,
      payload: res.data,
    });
    dispatch(setAlert("catégorie modifiée", "success", 3000));
    setTimeout(() => {
      history.push("/category-list-admin");
    }, 3000);
  } catch (err) {
    console.log(err);
  }
};

export const loadCategories = () => async (dispatch) => {
  //console.log("load Categories here");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get("/api/categories", config);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletecatwithoutchild = (id) => async (dispatch) => {
  //alert('hiiii')
  try {
    await axios.delete(`/api/categories/deletecategorie/${id}`);
    dispatch({
      type: DELETE_CATEGORIE,
      payload: id,
    });
    dispatch(setAlert("catégorie supprimée", "danger", 3000));
  } catch (err) {
    console.log(err);
  }
};
