import {
  ADD_COMMANDE,
  LOAD_COMMANDE,
  INCRE_QUANTITE,
  DECRE_QUANTITE,
  DELETE_COMMANDE,
  DELETE_ALLCOMMANDES,
  VERIF_ID,
  GET_COMMANDE,
  DELE_COMMANDE,
  GET_ALLCOMMANDE,
  LOGOUT,
  POST_COMMANDE,
  INCRE_QUANTITE_PROD,
  DECRE_QUANTITE_PROD,
  MODIF_STATUS,
  GET_COMMANDESTATUS,
  MODIF_GROUP_STATUS,
  MODIF_PRIX_FINAL,
  ADD_NOTE,
  ADD_TRACKING,
} from "../actions/types";
import { v4 as uuidv4 } from "uuid";

//commande for commande
//products for shopping cart
const initialState = {
  products: [],
  commande: [],
  allcommand: [],
  filtredcommandebystatus: [],
  prix_totcommande: null,
  id_user: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_COMMANDE:
      const result = state.products.filter((prod) => prod.id_prod === payload.id_prod);
      if (result && result.length) {
        // s'il existe
        const returned = {
          ...state,
          products: state.products.map((product) =>
            product.id_prod === payload.id_prod
              ? {
                  ...product,
                  quantite: product.quantite + payload.quantite,
                  prix_total: product.prix_total + product.prix_unitaire * payload.quantite,
                }
              : product
          ),
          prix_totcommande: state.prix_totcommande + payload.prix_unitaire * payload.quantite,
        };
        localStorage.setItem("commandes", JSON.stringify(returned));
        return returned;
      } else {
        //payload.quantite = 1;
        payload.prix_total = payload.prix_unitaire * payload.quantite;
        payload.id = uuidv4();

        const returnstate = {
          ...state,
          products: state.products.concat(payload),
          id_user: payload.id_user,
          prix_totcommande: state.prix_totcommande + payload.prix_unitaire * payload.quantite,
        };
        localStorage.setItem("commandes", JSON.stringify(returnstate));
        return returnstate;
      }

    case LOAD_COMMANDE:
      const storage = localStorage.getItem("commandes") ? JSON.parse(localStorage.getItem("commandes")) : { ...state, products: [], prix_totcommande: null };
      return storage;
    //increment quantite d apres the product
    case INCRE_QUANTITE_PROD:
      const returquantityprod = {
        ...state,
        products: state.products.map((el) => (el.id_prod === payload._id ? { ...el, quantite: el.quantite + 1, prix_total: el.prix_total + payload.price } : el)),
        prix_totcommande: state.prix_totcommande + payload.price,
      };
      localStorage.setItem("commandes", JSON.stringify(returquantityprod));
      return returquantityprod;
    case DECRE_QUANTITE_PROD:
      const retquantityprod = {
        ...state,
        products: state.products.map((el) => (el.id_prod === payload._id ? { ...el, quantite: el.quantite - 1, prix_total: el.prix_total - payload.price } : el)),
        prix_totcommande: state.prix_totcommande - payload.price,
      };
      localStorage.setItem("commandes", JSON.stringify(retquantityprod));
      return retquantityprod;

    case INCRE_QUANTITE:
      const returnedstate = {
        ...state,
        products: state.products.map((el) =>
          el.id_prod === payload.id_prod
            ? {
                ...el,
                quantite: el.quantite + 1,
                prix_total: el.prix_total + el.prix_unitaire,
              }
            : el
        ),
        prix_totcommande: state.prix_totcommande + payload.prix_unitaire,
      };
      localStorage.setItem("commandes", JSON.stringify(returnedstate));
      return returnedstate;
    case DECRE_QUANTITE:
      //check quantite(quantite>1) to decrement total price of commande
      state.products.filter((el) => el.id_prod === payload.id_prod && el.quantite > 1 && (state.prix_totcommande = state.prix_totcommande - payload.prix_unitaire));

      const returnstate = {
        ...state,
        products: state.products.map((el) =>
          el.id_prod === payload.id_prod
            ? {
                ...el,
                quantite: el.quantite > 1 ? el.quantite - 1 : el.quantite,
                prix_total: el.prix_total > el.prix_unitaire ? el.prix_total - el.prix_unitaire : el.prix_unitaire,
              }
            : el
        ),
      };
      localStorage.setItem("commandes", JSON.stringify(returnstate));
      return returnstate;
    case DELETE_COMMANDE:
      state.products.filter((el) => el.id_prod === payload.id_prod && (state.prix_totcommande = state.prix_totcommande - payload.quantite * payload.prix_unitaire));

      const deletestate = {
        ...state,
        products: state.products.filter((el) => el.id_prod !== payload.id_prod),
      };
      localStorage.setItem("commandes", JSON.stringify(deletestate));
      return deletestate;
    case POST_COMMANDE:
    case DELETE_ALLCOMMANDES:
      const returstate = { ...state, products: [], commande: [], prix_totcommande: null };
      localStorage.setItem("commandes", JSON.stringify(returstate));
      return returstate;
    case VERIF_ID:
      const st = { ...state, products: [], id_user: null, prix_totcommande: null };
      localStorage.setItem("commandes", JSON.stringify(st));
      return st;

    //commande from back
    case GET_COMMANDE:
      return {
        ...state,
        commande: payload,
      };
    case DELE_COMMANDE:
      return {
        ...state,
        commande: state.commande.filter((el) => el._id !== payload),
      };
    // case GET_COMMANDESTATUS:
    //   return{
    //     ...state,allcommand:state.allcommand.filter((el)=>el.status===payload)
    //   }

    case GET_ALLCOMMANDE:
      return {
        ...state,
        allcommand: payload,
      };
    /**update status of commande */
    case MODIF_STATUS:
      return {
        ...state,
        allcommand: state.allcommand.map((el) => (el._id === payload._id ? { ...el, status: payload.status } : el)),
      };
    case MODIF_PRIX_FINAL:
      return {
        ...state,
        allcommand: state.allcommand.map((el) => (el._id === payload._id ? { ...el, netapayer: payload.netapayer } : el)),
      };

    case ADD_NOTE:
      return {
        ...state,
        allcommand: state.allcommand.map((el) => (el._id === payload._id ? { ...el, privatenote: payload.privatenote } : el)),
      };
    case ADD_TRACKING:
      return {
        ...state,
        allcommand: state.allcommand.map((el) => (el._id === payload._id ? { ...el, tracking: payload.tracking } : el)),
      };
    case MODIF_GROUP_STATUS:
      return {
        ...state,
        allcommand: state.allcommand.map((el) => (el._id === payload._id ? { ...el, status: payload.status } : el)),
      };

    case LOGOUT:
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
}
