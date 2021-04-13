import { GET_PRODBOUTIQUE, DELETE_PRODUCT, GET_PRODUCTDETAIL, UPDATE_PRODUIT, GET_ALLPRODUCT, ADD_PRODBOUT, CONVERT_IMAGE } from "./types";

import axios from "axios";
import { setAlert } from "./alert";
import { loaduserlikes } from "./likes";
//FR *** 23/07/2020*** get all product
export const loadallProducts = () => async (dispatch) => {
  try {
    const resp = await axios.get("/api/products");
    //console.log(resp);
    dispatch({
      type: GET_ALLPRODUCT,
      payload: resp.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

//FR *** 15/07/2020** ADD_PRODUIT PRIVATE ROUTE

export const addProduit = ({ boutique, name, description, price, tarifpromo, codeabarre, quantitestock, categories, caracteristique, imageproduit, photo }, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // must add categorie
  //   alert("entred add prod");
  const body = JSON.stringify({
    boutique,
    name,
    description,
    price,
    tarifpromo,
    codeabarre,
    quantitestock,
    categories,
    caracteristique,
    imageproduit,
    photo,
  });
  console.log("bodyaddproductfront", body);
  try {
    const tesaddP = await axios.post("/api/products/addProduit", body, config);
    console.log("AddProductback", tesaddP);
    dispatch({
      type: ADD_PRODBOUT,
      payload: tesaddP.data,
    });
    dispatch(setAlert("Produit ajouté", "success", 3000));
    setTimeout(() => {
      history.push(`/boutiqueuser`);
    }, 3000);
    dispatch(loadallProducts());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
// FR ***15/07/2020 ** GET_PRODUCTS OF A SPECIFIC BOUTIQUES**PRIVATE ROUTE

export const getProduitBoutique = (boutid) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`/api/products/prodbout/${boutid}`, config);
    // alert("prod of boutique from back");
    // console.log("load produit of boutique from the back", res);
    dispatch({
      type: GET_PRODBOUTIQUE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
// FR ***15/07/2020 ** DELETE_PRODUCTS **PRIVATE ROUTE
export const removeProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/deleteprod/${id}`);
    await axios.delete(`/api/likes/deletelike/${id}`);
    await axios.delete(`/api/globalsections/deletesectionsbytype/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
    dispatch(loaduserlikes());
    dispatch(getProduitBoutique());
    dispatch(setAlert("Produit supprimé", "danger", 3000));
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: REMOVE_CURRENT_PRODUCT,
    //   payload: { msg: err.response.data.msg},
    // });
  }
};
// FR ***21/07/2020 ** Get one boutique byId
export const getProductById = (prodId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(`/api/products/productdetail/${prodId}`, config);
    //console.log("Product from back", res);
    dispatch({
      type: GET_PRODUCTDETAIL,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

//UPDATE Product **PRIVATE ROUTE

export const updateproduit = (newproduit, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newproduit);
  //console.log("new category update rahmaaaa", body);
  try {
    const resp = await axios.put(`/api/products/updateP/${newproduit.id}`, body, config);
    //console.log("produit updated from back", resp);
    dispatch({
      type: UPDATE_PRODUIT,
      payload: resp.data,
    });

    dispatch(setAlert("Produit modifié", "success", 3000));
    setTimeout(() => {
      history.push(`/boutiqueuser`);
    }, 3000);
    dispatch(loadallProducts());
  } catch (err) {
    console.log(err);
  }
};
/***convert image to base64 */
export const convertTobase64 = (image) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    //alert("image base64");
    const body = JSON.stringify(image);
    console.log("image from front", body);
    const tesImage = await axios.post("/api/helpers/base64-encode", body, config);
    //console.log("image from back", tesImage);
    dispatch({
      type: CONVERT_IMAGE,
      payload: tesImage.data,
    });
  } catch (err) {
    console.log(err);
  }
};
