import { ADD_COMMANDE, UPDATE_COMMANDE } from "./types";
import { setAlert } from "./alert";
//Add commande
export const addcommande = (newcommande) => async (dispatch) => {
  dispatch({
    type: ADD_COMMANDE,
    payload: newcommande,
  });

  dispatch(setAlert("Produit ajouté au panier", "success", 3000));
};
//Update the qte if the commande exist
export const updatecommande = (commandeupdated) => async (dispatch) => {
  dispatch({
    type: UPDATE_COMMANDE,
    payload: commandeupdated,
  });
  //console.log("commandeupdated", commandeupdated);
  dispatch(setAlert(" produit updated in the pan", "success", 3000));
};

// kif ya3mel ajouter au panier yetajouta kif ma 3melt enti avec quantité = 1
//ey ama ek el plus wel moins kifeh chna3mlehom eni
// yetzed juste fel quantité (quantité minimum 1)

// kif ta3mel ajouter au panier wel produit mawjoud fel panier bech tetzed juste quantité
// el client ynajem ya3ml commande martin 3al nafs el porduit
// oui ynajem ki yenzel 2 fois yetzed awel mara elproduit lel commande wla 2 eme ybadel fel quantité
// c bon fhemt el principe?
// awel mara yajouti produit lel commande wba3d kol mara ywali yajouti quantité
// ma y2atherch 3al nombre des commandes?
// ma3neha el produit  eli  yenzl 3lih barcha marat heka wa7ou commande wa7da?
// commande produit X quantité 3 fois par exemple 1 seule commande behi el qte statique taw nda5alha? kol
//kol ma yab3ath produit lel commande tetzd qte de 1?
// awel mara yetajouta qte 1 wba3d kol mara incrementation de 1 behi
// yalla bon travail :) hhh merci
