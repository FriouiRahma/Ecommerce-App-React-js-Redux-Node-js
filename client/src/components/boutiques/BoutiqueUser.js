import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getBoutiqueUser } from "../../actions/Boutiques";
import { getProduitBoutique } from "../../actions/Produit";
import PropTypes from "prop-types";
import { removeProduct } from "../../actions/Produit";
import { Link } from "react-router-dom";
import data from "../../utils/default.json";
import closeIcon from "../../icons/close-icon.svg";
import UserLayout from "../layout/UserLayout";
import { addLike, removeLike } from "../../actions/likes";
import { addcommande } from "../../actions/commande";
import { confirmAlert } from "react-confirm-alert";
import noteIcon from "../../icons/note.svg";
import ModalAcheter from "../helpers/ModalAcheter";
import "react-confirm-alert/src/react-confirm-alert.css";

//FR**13/07/2020**

const BoutiqueUser = ({
  shoppinglist,
  likelist,
  getBoutiqueUser,
  users,
  addLike,
  removeLike,
  addcommande,
  // user,
  // boutiquelist,
  getProduitBoutique,
  produitlist,
  removeProduct,
  boutique,
  isAuthenticated,
  match,
}) => {
  useEffect(() => {
    //dispatch action getBoutiqueUser to the back
    //getBoutiqueUser();

    // const curboutuser=boutiquelist.filter((el)=> el.user===user._id)
    // const boutqueuser=curboutuser[0]
    // console.log("bout of user",curboutuser)
    //dispatch action getProduitBoutique to the back
    boutique && boutique.length !== 0 && getProduitBoutique(boutique[0]._id);
  }, [getBoutiqueUser, boutique, getProduitBoutique, match.params.id]);

  // if (!isAuthenticated) {
  //   return <Redirect to='/login' />;
  // }
  let userid = null;
  if (isAuthenticated && users.user) {
    userid = users.user._id;
  }
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeProduct(id),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  return (
    <div className='container'>
      <div className='boutique-of-user'>
        <UserLayout>
          {/* {console.log(" loading boutique user front", boutique)} */}
          {boutique !== null &&
            boutique.map((bout) => (
              <div key={bout._id}>
                <div className='infos-boutique mt-50'>
                  <div className='row  boutuser-info  '>
                    <div className='col-lg-4'>
                      <figure>
                        <img src={`${data.backUrl}/uploads/${bout.photo}`} alt='' className='boutique-photo' />
                      </figure>
                    </div>
                    <div className='col-lg-6'>
                      <h2 className='mb-20 name-boutique  '>{bout.name} </h2>
                      <p>{bout.description}</p>
                      <p>{bout.description}</p>
                      <div>Telephone: {bout.telephone} </div>
                      <div>Website: {bout.website} </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className='products-boutique'>
            <h2 className='title'>Liste des produits</h2>
            <div className='row'>
              {produitlist && produitlist.length !== 0 ? (
                produitlist.map((prod) => (
                  <div key={prod._id} className='col-lg-2'>
                    <div className='Product-Box'>
                      <div className='buttons-top'>
                        <div className='editButton'>
                          <Link to={`/updateproduct/${prod._id}`}>
                            <img src={noteIcon} alt='' className='editIcon' title='Edit' />
                          </Link>
                        </div>

                        <div className='closeButton'>
                          <img
                            src={closeIcon}
                            alt=''
                            className='closeIcon'
                            onClick={() => {
                              submit(prod._id);
                            }}
                          />
                        </div>
                      </div>
                      <Link to={`/product/${prod._id}`}>
                        <figure>
                          <img src={`${data.backUrl}/uploads/${prod.photo && prod.photo.length !== 0 && prod.photo[0]}`} alt='' />
                        </figure>
                      </Link>

                      <div className='name-prod-sect'>
                        <div className='name'>
                          <Link to={`/product/${prod._id}`}>{prod.name}</Link>
                        </div>
                        <div className='tarifs'>
                          <div className={prod.tarifpromo ? "prix" : "tarifpromo"}>{prod.price} DT </div>
                          {prod.tarifpromo !== null && <div className='tarifpromo'>{prod.tarifpromo} DT</div>}
                        </div>
                      </div>
                      <div className='info-prod-section'>
                        <ModalAcheter
                          prodr={prod}
                          idofprod={prod && prod != null && prod._id}
                          boutiqueid={prod.boutique && prod.boutique !== null && prod.boutique._id}
                          iduser={userid}
                          fraislivrai={prod.boutique && prod.boutique !== null && prod.boutique.fraislivraison}
                        />
                        <div className='buttons'>
                          <button
                            className='shop'
                            onClick={
                              () =>
                                addcommande(
                                  prod.tarifpromo === null
                                    ? {
                                        id_prod: prod._id,
                                        prix_unitaire: prod.price,
                                        id_boutique: boutique && boutique.length !== 0 && boutique[0]._id,
                                        frais_livraison: boutique && boutique.lenght !== 0 && boutique[0].fraislivraison,
                                        //prix_total: prod.price,
                                        quantite: 1,
                                      }
                                    : {
                                        id_prod: prod._id,
                                        prix_unitaire: prod.tarifpromo,
                                        id_boutique: boutique && boutique.length !== 0 && boutique[0]._id,
                                        frais_livraison: boutique && boutique.lenght !== 0 && boutique[0].fraislivraison,
                                        //prix_total: prod.price,
                                        quantite: 1,
                                      },
                                  userid
                                )
                              //console.log('fraislivraisonhhhhhhh',boutique&&boutique.length!==0&& boutique[0].fraislivraison)
                            }
                          >
                            {shoppinglist.filter((sh) => sh.id_prod === prod._id).length === 0 ? (
                              <div className='shop-icon'></div>
                            ) : (
                              <div className='shop-icon active'>
                                <div className='number'>{shoppinglist.filter((sh1) => sh1.id_prod === prod._id)[0].quantite}</div>
                              </div>
                            )}
                          </button>
                          <button
                            className='like'
                            onClick={
                              likelist && likelist.lenght !== 0 && likelist.filter((p) => p.productt && p.productt !== null && p.productt._id === prod._id).length === 0
                                ? () => addLike({ productt: prod._id })
                                : () => removeLike(prod._id)
                            }
                          >
                            {likelist.filter((p) => p.productt && p.productt !== null && p.productt._id === prod._id).length === 0 ? (
                              // <img src={heartIcon} alt='Wishlist' />
                              <div className='like-icon'></div>
                            ) : (
                              <div className='like-icon active'></div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>There are no product yet</h2>
              )}
            </div>
          </div>
        </UserLayout>
      </div>
    </div>
  );
};

BoutiqueUser.propTypes = {
  getBoutiqueUser: PropTypes.func.isRequired,
  getProduitBoutique: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    shoppinglist: state.commandes.products,
    likelist: state.likes.likeuserlist,
    boutique: state.boutiques.boutiqueuser,
    boutiquelist: state.boutiques.list,
    user: state.users.user,
    produitlist: state.produits.prodboutique,
    isAuthenticated: state.users.isAuthenticated,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  getBoutiqueUser,
  getProduitBoutique,
  removeProduct,
  addLike,
  removeLike,
  addcommande,
})(BoutiqueUser);
