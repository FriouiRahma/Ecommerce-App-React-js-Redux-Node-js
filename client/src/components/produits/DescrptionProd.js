import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProductById } from "../../actions/Produit";
import { addLike, removeLike } from "../../actions/likes";
import { Link } from "react-router-dom";
import { addcommande } from "../../actions/commande";
import { getBoutiqueUser } from "../../actions/Boutiques";
import ModalAcheter from "../helpers/ModalAcheter";
import Slider from "react-slick";
import noteIcon from "../../icons/note.svg";
import { setAlert } from "../../actions/alert";
//import { incrementquantprod, decrementquantprod } from "../../actions/commande";
import data from "../../utils/default.json";
import ProductBox from "../helpers/ProductBox";
import SocialMediaShare from "../helpers/SocialMediaShare";

const DescrptionProd = ({
  //incrementquantprod,
  //decrementquantprod,
  commandenumber,
  addcommande,
  getProductById,
  getBoutiqueUser,
  match,
  product,
  boutique,
  isAuthenticated,
  addLike,
  productlsit,
  removeLike,
  likelist,
  commandelist,
  setAlert,
  users,
  shoppinglist,
  categories,
  alllikes,
}) => {
  const [count, setCount] = useState(1);
  let newProducts = [];
  let productList = [];
  let idcategories = {};
  const currproduit = productlsit.filter((p) => p._id === match.params.id);
  const produtdetail = currproduit && currproduit !== null && currproduit[0];
  const [randomPorducts, SetRandomPorducts] = useState([]);
  //console.log("produtdetail", currproduit && currproduit.length !== 0 && currproduit);
  useEffect(() => {
    // to get details to update product
    getProductById(match.params.id);
    getBoutiqueUser();
    if (productlsit && productlsit.length !== 0) {
      idcategories = currproduit && currproduit.length !== 0 && currproduit[0].categories.map((el) => el);
    }
    //console.log("rahma-currproduit", idcategories);
    //const idcat = idcategories && idcategories.length !== 0 && idcategories[0]._id
    if (productlsit && productlsit.length !== 0) {
      productlsit.map((el) => {
        el.categories.map((cl) => {
          if (cl._id === idcategories[0]._id) {
            productList = [...productList, el];
          }
          // if (cl.parent === idcategories[0]._id) {
          //   productList = [...productList, el];
          // }
        });
      });
    }
    //console.log("rahma-productList", productList);
    for (var i = 0; i < 12; i++) {
      var idx = Math.floor(Math.random() * productList.length);
      newProducts.push(productList[idx]);
      productList.splice(idx, 1);
      let lastrandomProducts = newProducts.filter((el) => el && el !== null && el._id !== currproduit[0]._id);
      SetRandomPorducts(lastrandomProducts);
    }
    //console.log("rahma-newProducts", newProducts);
  }, [productlsit, getBoutiqueUser, getProductById, match.params.id]);
  let userid = null;
  let userlikes = null;
  let likedproduct = null;

  const boutiqueone = boutique && boutique !== null && boutique[0];
  const Nbrlikesofproduct = alllikes.filter((lik) => lik.productt === match.params.id);
  //console.log("alllikes-likessss", Nbrlikesofproduct.length);

  //console.log("produtdetail", produtdetail);
  //console.log("getBoutiqueUser", boutique);
  //console.log("likelist", likelist);

  // const currcommande = commandelist.products.filter(
  //   (commande) => commande.id_prod === match.params.id
  // );
  //const commandedetail = currcommande[0];
  //console.log("commandedetail",commandedetail)
  if (produtdetail && produtdetail !== null) {
    likedproduct = likelist.filter((p) => p.productt && p.productt !== null && p.productt._id === produtdetail && produtdetail !== null && produtdetail._id);
    userlikes = likedproduct[0];
    //console.log("usersssssss", userlikes && userlikes !== null && userlikes);
  }

  //console.log("productlst filtred", currproduit);
  if (isAuthenticated && users.user) {
    userid = users.user._id;
  }

  const addlke = () => {
    if (isAuthenticated) {
      if (likelist.filter((p) => p.productt && p.productt !== null && p.productt._id === produtdetail._id).length !== 0) {
        const productt = produtdetail._id;
        removeLike(productt);
      } else {
        const productt = produtdetail._id;
        //console.log(productt);
        addLike({ productt });
      }
    } else {
      setAlert("Vous devez d'abord connecter", "danger", 3000);
    }
  };

  const Handeladdcommand = () => {
    isAuthenticated
      ? addcommande(
          produtdetail.tarifpromo === null
            ? {
                id_prod: produtdetail._id,
                prix_unitaire: produtdetail.price,
                id_boutique: produtdetail.boutique && produtdetail.boutique !== null && produtdetail.boutique._id,
                frais_livraison: produtdetail.boutique && produtdetail.boutique !== null && produtdetail.boutique.fraislivraison,
                //prix_total: produtdetail.price,
                quantite: count,
              }
            : {
                id_prod: produtdetail._id,
                prix_unitaire: produtdetail.tarifpromo,
                id_boutique: produtdetail.boutique && produtdetail.boutique !== null && produtdetail.boutique._id,
                frais_livraison: produtdetail.boutique && produtdetail.boutique !== null && produtdetail.boutique.fraislivraison,
                //prix_total: produtdetail.price,
                quantite: count,
              },
          userid
        )
      : setAlert("Vous devez d'abord connecter", "danger", 3000);
  };
  const handelIncre = () => {
    setCount(count + 1);
  };
  const handeldecre = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const tab = produtdetail && produtdetail.length !== 0 && produtdetail.photo.map((el) => el);
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`${data.backUrl}/uploads/${tab[i]}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className='container'>
        {produtdetail && produtdetail != null && (
          <div className='product-detail'>
            <div className='row'>
              <div className='col-md-4 '>
                <Slider {...settings}>
                  {produtdetail.photo.map((el, i) => {
                    return <img src={`${data.backUrl}/uploads/${el}`} alt='' />;
                  })}
                </Slider>
              </div>
              <div className=' col-md-7 butt-right '>
                <div className='product-infos'>
                  <h4 className='name'>{produtdetail && produtdetail !== null && produtdetail.name}</h4>
                  <div className='barcode'>Référence:{produtdetail.codeabarre}</div>
                  <p className='description'>{produtdetail.description}</p>

                  {produtdetail &&
                    produtdetail !== null &&
                    produtdetail.caracteristique.map((el, idx) => (
                      <React.Fragment key={idx}>
                        <ul className='caracteristique'>
                          <li className='titre-carater'>{el.libelle}</li>
                          <div className='children'>
                            {el.value.map((vl, id) => (
                              <React.Fragment key={id}>
                                <li className='valeurchild'>{vl}</li>
                              </React.Fragment>
                            ))}
                          </div>
                        </ul>
                      </React.Fragment>
                    ))}

                  <div className={produtdetail.tarifpromo ? "price" : "trueprix"}>{produtdetail.price} DT</div>
                  {produtdetail.tarifpromo && <div className='tarifpromo'>{produtdetail.tarifpromo} DT</div>}
                  <div className='quantite'>
                    <span>quantité</span>
                    <div>
                      <button className={count === 1 ? "disable-button" : "btn-shop-left"} onClick={handeldecre}>
                        -
                      </button>

                      {/* {  commandedetail.quantite } */}
                      <span className='quantity-wanted'>{count}</span>
                      <button className='btn-shop-right' onClick={handelIncre}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className='stock'>Quantité en stock: {produtdetail.quantitestock}</div>
                  {isAuthenticated &&
                    boutiqueone &&
                    boutiqueone !== null &&
                    produtdetail.boutique &&
                    produtdetail.boutique !== null &&
                    boutiqueone._id === produtdetail.boutique._id && (
                      <div>
                        <Link to={`/updateproduct/${produtdetail._id}`}>
                          <img src={noteIcon} alt='' className='editIcon' title='Edit' />
                        </Link>
                      </div>
                    )}
                  <div className='butts-ache-ajout'>
                    <button className='button-achet'>
                      <ModalAcheter
                        prodr={produtdetail}
                        idofprod={produtdetail && produtdetail != null && produtdetail._id}
                        boutiqueid={produtdetail.boutique && produtdetail.boutique !== null && produtdetail.boutique._id}
                        iduser={userid}
                        fraislivrai={produtdetail.boutique && produtdetail.boutique !== null && produtdetail.boutique.fraislivraison}
                      />
                    </button>
                    <button className='shop' onClick={Handeladdcommand}>
                      {shoppinglist.filter((sh) => sh.id_prod === produtdetail._id).length === 0 ? (
                        <div className='butt-ajoutpanier'>
                          <div className='shop-icon'></div>
                          Ajouter au panier
                        </div>
                      ) : (
                        <div className='butt-ajoutpanier'>
                          <div className='shop-icon active'>
                            <div className='number'>{shoppinglist.filter((sh1) => sh1.id_prod === produtdetail._id)[0].quantite}</div>
                            Ajouter au panier
                          </div>
                        </div>
                      )}
                    </button>

                    <div className='like'>
                      <div onClick={addlke}>
                        {likelist.filter((p) => p.productt && p.productt !== null && p.productt._id === produtdetail._id).length === 0 ? (
                          <div className='like-icon'></div>
                        ) : (
                          <div className='like-icon active'> </div>
                        )}
                      </div>
                      <span className='nbr-wishes'>{Nbrlikesofproduct.length}</span>
                    </div>
                  </div>
                  <div className='mt-20'>
                    <SocialMediaShare url={`${data.frontUrl}/product/${produtdetail._id}}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='container' style={{ marginTop: "10px" }}>
        <div className='row'>
          {randomPorducts &&
            randomPorducts.length !== 0 &&
            randomPorducts.map((pl) => (
              <div className='col-lg-2'>
                <ProductBox
                  element={pl && pl !== null && pl}
                  idprod={pl && pl !== null && pl._id}
                  idofboutique={pl && pl !== null && pl.boutique && pl.boutique !== null && pl.boutique._id}
                  idofuser={userid}
                  fraislivrairr={pl && pl !== null && pl.boutique && pl.boutique !== null && pl.boutique.fraislivraison}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    //commandelist
    commandelist: state.commandes,
    // product: state.produits.proddetail,
    commandenumber: state.commandes,
    users: state.users,
    likelist: state.likes.likeuserlist,
    productlsit: state.produits.listprod,
    //bout user
    boutique: state.boutiques.boutiqueuser,
    isAuthenticated: state.users.isAuthenticated,
    shoppinglist: state.commandes.products,
    categories: state.categories.list,
    //all likes
    alllikes: state.likes.likelist,
  };
};

export default connect(mapStateToProps, {
  getProductById,
  addLike,
  removeLike,
  addcommande,
  getBoutiqueUser,
  setAlert,
  //incrementquantprod,
  //decrementquantprod
})(DescrptionProd);
