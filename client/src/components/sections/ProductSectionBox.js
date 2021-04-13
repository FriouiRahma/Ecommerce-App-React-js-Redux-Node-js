import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike } from "../../actions/likes";
import { addcommande } from "../../actions/commande";
import { loadSections } from "../../actions/sections";
import data from "../../utils/default.json";
import ModalSection from "./ModalSection";
import { setAlert } from "../../actions/alert";
const ProductSectionBox = ({ shoppinglist, isAuthenticated, loadSections, likelist, addLike, removeLike, addcommande, idprod, element, idofuser, fraislivrairr, idofboutique }) => {
  useEffect(() => {
    loadSections();
  }, [loadSections]);
  return (
    <div className="produitsection">
      {/* Nom product: {el.name} */}
      <Link to={`/product/${idprod}`}>
        <figure>
          <img src={`${data.backUrl}/uploads/${element.photo && element.photo.lenght !== 0 && element.photo[0]}`} alt="" />
        </figure>
      </Link>
      <div className="name-prod-sect">
        <div className="name">
          <Link to={`/product/${idprod}`}>{element.name}</Link>
        </div>
        <div className="tarifs">
          <div className={element.tarifpromo ? "prix" : "tarifpromo"}>{element.price} DT </div>
          {element.tarifpromo !== null && <div className="tarifpromo">{element.tarifpromo} DT</div>}
        </div>
      </div>
      <div className="info-prod-section">
        {/* Open Model Here */}
        <ModalSection prodr={element} idofprod={idprod} boutiqueid={idofboutique} iduser={idofuser} fraislivrai={fraislivrairr} />
        <div className="buttons">
          <button
            className="shop"
            onClick={() =>
              isAuthenticated
                ? addcommande(
                    element.tarifpromo === null
                      ? {
                          id_prod: idprod,
                          prix_unitaire: element.price,
                          id_boutique: idofboutique,
                          frais_livraison: fraislivrairr,
                          //prix_total: prod.price,
                          quantite: 1,
                        }
                      : {
                          id_prod: idprod,
                          prix_unitaire: element.tarifpromo,
                          id_boutique: idofboutique,
                          frais_livraison: fraislivrairr,
                          //prix_total: prod.price,
                          quantite: 1,
                        },
                    idofuser
                  )
                : setAlert("Vous devez d'abord connecter", "danger", 3000)
            }
          >
            {shoppinglist.filter((sh) => sh.id_prod === idprod).length === 0 ? (
              <div className="shop-icon"></div>
            ) : (
              <div className="shop-icon active">
                <div className="number">{shoppinglist.filter((sh1) => sh1.id_prod === idprod)[0].quantite}</div>
              </div>
            )}
          </button>
          <button
            className="like"
            onClick={
              likelist && likelist.lenght !== 0 && likelist.filter((p) => p.productt === element._id).length === 0 ? () => addLike({ productt: idprod }) : () => removeLike(idprod)
            }
          >
            {likelist.filter((p) => p.productt === idprod).length === 0 ? (
              // <img src={heartIcon} alt='Wishlist' />
              <div className="like-icon"></div>
            ) : (
              <div className="like-icon active"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppinglist: state.commandes.products,
    likelist: state.likes.likeuserlist,
    isAuthenticated: state.users.isAuthenticated,
  };
};

export default connect(mapStateToProps, { loadSections, addLike, removeLike, addcommande })(ProductSectionBox);
