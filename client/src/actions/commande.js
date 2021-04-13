import {
  ADD_COMMANDE,
  LOAD_COMMANDE,
  INCRE_QUANTITE,
  DECRE_QUANTITE,
  DELETE_COMMANDE,
  DELETE_ALLCOMMANDES,
  VERIF_ID,
  POST_COMMANDE,
  GET_COMMANDE,
  DELE_COMMANDE,
  GET_ALLCOMMANDE,
  INCRE_QUANTITE_PROD,
  DECRE_QUANTITE_PROD,
  MODIF_STATUS,
  GET_COMMANDESTATUS,
  MODIF_GROUP_STATUS,
  MODIF_PRIX_FINAL,
  POST_COMMANDE_SECTION,
  ADD_NOTE,
  ADD_TRACKING,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
//Add commande to shopping cart
export const addcommande = (newcommande, id_user) => async (dispatch) => {
  //console.log("newcommmandeshopping", newcommande);
  try {
    dispatch({
      type: ADD_COMMANDE,
      payload: { ...newcommande, id_user },
    });
  } catch (err) {
    console.log(err);
  }
};
//commander ** POST COMMANDE TO THE BACK
export const commander = (user, nom, telephone, adresse, commandeGroupedByIDbout, products, frais_livraison, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body1 = JSON.stringify({
    user,
    nom,
    telephone,
    adresse,
    products,
    commandeGroupedByIDbout,
    frais_livraison,
  });
  // const commandeGroupedByIDbout = JSON.stringify(objectToArray);
 
  
  const body = { ...body1, commandeGroupedByIDbout };
 
  try {
    const commande = await axios.post("/api/commandes/commande", body1, config);

    dispatch({
      type: POST_COMMANDE,
      payload: commande,
    });
    dispatch(setAlert("Commande envoyée", "success", 3000));
    setTimeout(() => {
      history.push("/commande-list-user");
    }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
/***** updtae status commande livré ou en attende */
export const modifstatus = (newstatus) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newstatus);

  try {
    //alert("commande");
    //console.log("newstatus", newstatus);
    const status = await axios.put(`/api/commandes/status/${newstatus.id}`, body, config);
    //console.log("update status",status)
    dispatch({
      type: MODIF_STATUS,
      payload: status.data,
    });
    dispatch(setAlert("Status modifiée", "success", 3000));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
/***** updtae status commande livré ou en attende */
export const modifprixtotal = (newprixfinal) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newprixfinal);

  try {
   
    const status = await axios.put(`/api/commandes/prixfinal/${newprixfinal.id}`, body, config);
  
    dispatch({
      type: MODIF_PRIX_FINAL,
      payload: status.data,
    });
    dispatch(setAlert("Prix total modifié", "success", 3000));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

/***** updtae status commande groupé */
export const modifgroupstatus = (newstatusgroup) => async (dispatch) => {
  console.log("newstatus", newstatusgroup);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(newstatusgroup);
  try {
  
    const status = await axios.put(`/api/commandes/groupstatus`, body, config);
  
    dispatch({
      type: MODIF_GROUP_STATUS,
      payload: status.data,
    });
    dispatch(allcommande());
    dispatch(setAlert("Status modifiée", "success", 3000));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

/***********Get commande local storage*/
export const loadcommande = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_COMMANDE,
    });
  } catch (err) {
    console.log(err);
  }
};
//inrementation quatite produit
export const incrementquantprod = (newprodquantite) => async (dispatch) => {

  try {
    dispatch({
      type: INCRE_QUANTITE_PROD,
      payload: newprodquantite,
    });
  } catch (err) {
    console.log(err);
  }
};
//decrementation quantité d'aprés produit
export const decrementquantprod = (newprodquantite) => async (dispatch) => {
 
  console.log("newprodquantite", newprodquantite);
  try {
    dispatch({
      type: DECRE_QUANTITE_PROD,
      payload: newprodquantite,
    });
  } catch (err) {
    console.log(err);
  }
};
//incrementation quantite
export const incrementquant = (newcomquantite) => async (dispatch) => {
  try {
    dispatch({
      type: INCRE_QUANTITE,
      payload: newcomquantite,
    });
  } catch (e) {}
};
//decrementation quantite
export const decrementquant = (newcomquantite) => async (dispatch) => {
  try {
    dispatch({
      type: DECRE_QUANTITE,
      payload: newcomquantite,
    });
  } catch (e) {}
};
export const deletecommande = (comid) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_COMMANDE,
      payload: comid,
    });
  } catch (e) {}
};
export const deletallcommandes = () => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ALLCOMMANDES,
    });
  } catch (e) {}
};
//verif commande of iduser
export const verifiduser = (iduser) => async (dispatch) => {
  const localsto = JSON.parse(localStorage.getItem("commandes"));
  // if (id_user !== null) {
  //   const idusersto = localsto.id_user;
  // }

  if (localsto && localsto.id_user && localsto.id_user !== null && localsto.id_user !== iduser) {
    localStorage.removeItem("commandes");
    dispatch({
      type: VERIF_ID,
      payload: iduser,
    });
  }
};
/*******GET COMMANDE FROM THE BACK **/
export const recupcommande = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/commandes");
    // console.log("commande's result", res);
    dispatch({
      type: GET_COMMANDE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
/***********DELETE COMMANDE FROM THE BACK */

export const removecommande = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/commandes/delcommande/${id}`);

    dispatch({
      type: DELE_COMMANDE,
      payload: id,
    });
    dispatch(setAlert("Commande removed", "danger", 3000));
  } catch (err) {
    console.log(err.message);
  }
};

/**********GET ALL COMMANDES */
export const allcommande = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/commandes/get-commande");

    dispatch({
      type: GET_ALLCOMMANDE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
/**********GET COMMANDES  with status */
export const cammandewithstatus = (id) => async (dispatch) => {
 

  try {
    // const res = await axios.post(`/api/commandes/commandestatus/${nawstatus.id}`,body,config);

    dispatch({
      type: GET_COMMANDESTATUS,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

//user can add Note
export const addNewNote = ({ id, newnote, id_user }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ id, newnote, id_user });
  try {
    const resNote = await axios.put(`/api/commandes/addNewNote/${id}`, body, config);

    dispatch({
      type: ADD_NOTE,
      payload: resNote.data,
    });
    dispatch(setAlert("Note ajoutée", "success", 3000));
    dispatch(allcommande());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//user can add tracking
export const addNewtracking = ({ id, newntacking }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ id, newntacking });
  try {
    const resNote = await axios.put(`/api/commandes/addNewtracking/${id}`, body, config);

    dispatch({
      type: ADD_TRACKING,
      payload: resNote.data,
    });
    dispatch(setAlert("tracking ajoutée", "success", 3000));
    dispatch(allcommande());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//commander ** POST COMMANDE TO THE BACK FROM THE SECTION
export const commanderfromsection = (boutique, userid, nom, telephone, address, products, frais_livraison) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body1 = JSON.stringify({
    boutique,
    userid,
    nom,
    telephone,
    address,
    products,
    frais_livraison,
  });
  
 
  // const body = { ...body1, commandeGroupedByIDbout };
  
  try {
    const commande = await axios.post("/api/commandes/addcommandesection", body1, config);

    dispatch({
      type: POST_COMMANDE_SECTION,
      payload: commande,
    });
    dispatch(setAlert("Commande envoyée", "success", 3000));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
