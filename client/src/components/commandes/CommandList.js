import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import closeIcon from "../../icons/delete (2).svg";
import data from "../../utils/default.json";
import shopping from "../../icons/online-shopping (1).svg";
import { confirmAlert } from "react-confirm-alert";

import { incrementquant, decrementquant, deletecommande, deletallcommandes } from "../../actions/commande";

const CommandList = ({ commandelist, productList, incrementquant, decrementquant, deletecommande, deletallcommandes }) => {
  const cartlist = commandelist.products;
  //console.log("products of commande", cartlist);
  //const totcommande = commandelist.prix_totcommande;
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deletecommande(id),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const submit1 = () => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deletallcommandes(),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const header = (
    <thead>
      <tr>
        <th></th>
        <th>Image</th>
        <th>Nom produit </th>
        <th> Prix</th>
        <th>Quantité</th>
        <th>Prix</th>
      </tr>
    </thead>
  );

  return (
    <div>
      <div className='container'>
        <div className='shopping-list'>
          <div className={commandelist.products.length !== 0 ? "shopping-detail" : ""}>
            <div className='panier-user'>
              Panier
              {/* <img src={shopping} alt="" className="closeIcon" /> */}
            </div>
            <table className='table-details'>
              {cartlist && cartlist.length !== 0 && header}
              <tbody>
                {productList.length !== 0 &&
                  commandelist.products &&
                  commandelist.products.length !== 0 &&
                  commandelist.products.map((el, index) => (
                    <React.Fragment>
                      <tr key={index} className='shopping-info'>
                        <td>
                          <img
                            src={closeIcon}
                            alt=''
                            className='closeIcon'
                            onClick={() => {
                              submit(el._id);
                            }}
                          />
                          {/* <button onClick={() => deletecommande(el)}>supp</button> */}
                        </td>

                        <td>
                          <img className='picture-item' src={`${data.backUrl}/uploads/${productList.filter((p) => p._id === el.id_prod)[0].photo[0]}`} alt='' />
                        </td>

                        <td>
                          <Link to={`/product/${el.id_prod}`}>{productList.filter((p) => p._id === el.id_prod)[0].name}</Link>
                        </td>

                        <td>{el.prix_unitaire}DT </td>
                        <td>
                          <button className={el.quantite === 1 ? "disable-button" : "btn-shop-left"} onClick={() => decrementquant(el)}>
                            -
                          </button>

                          <span className='quantity-wanted'>{el.quantite}</span>
                          <button className='btn-shop-right' onClick={() => incrementquant(el)}>
                            +
                          </button>
                        </td>
                        <td>{el.prix_total} DT</td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
          <div>
            {cartlist && cartlist.length !== 0 ? (
              <div className='last-info'>
                <button className='btn-procede ' onClick={submit1}>
                  Vider le panier
                </button>
                <button className='btn-procede'>
                  <Link to='/chekout'>Procéder à chekout</Link>
                </button>
              </div>
            ) : (
              <div>
                <div className='commande-empty'>Votre panier est vide</div>
                <div className='commande-empty promo '>
                  <Link className='empty-cart' to='/boutiques'>
                    Ne manquez pas nos super promos! Profitez-en
                  </Link>
                </div>
              </div>
            )}
          </div>

          {cartlist && cartlist.length !== 0 && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <div className='price-commande'> Total {commandelist.prix_totcommande} DT</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    commandelist: state.commandes,
    productList: state.produits.listprod,
  };
};

export default connect(mapStateToProps, {
  incrementquant,
  decrementquant,
  deletecommande,
  deletallcommandes,
})(CommandList);
