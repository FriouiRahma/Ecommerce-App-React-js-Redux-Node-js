import React, { useState } from "react";
import { connect } from "react-redux";
import { getBoutiqueById } from "../../actions/Boutiques";
import { getProduitBoutique } from "../../actions/Produit";
import data from "../../utils/default.json";
import { addLike, removeLike } from "../../actions/likes";
import { addcommande } from "../../actions/commande";
import Pagination from "react-js-pagination";
import ProductBox from "../helpers/ProductBox";
import { setAlert } from "../../actions/alert";
const DescriptionBout = ({
  boutique,
  match,
  users,
  shoppinglist,
  getProduitBoutique,
  produitlist,
  boutiquelist,
  listproduit,
  likelist,
  addLike,
  removeLike,
  addcommande,
  isAuthenticated,
  setAlert,
}) => {
  let userid = null;
  const currentbout = boutiquelist.filter((b) => b._id === match.params.id);
  const bouitdetail = currentbout[0];
  const currentprod = listproduit.filter((p) => p.boutique && p.boutique !== null && p.boutique._id === match.params.id);

  if (isAuthenticated && users.user) {
    userid = users.user._id;
  }
  /**pagination start here */

  const todosPerPage = 4;
  const [activePage, setCurrentPage] = useState(1);

  // Logic for displaying current todos
  const indexOfLastTodo = activePage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = currentprod.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((prod, index) => {
    return <li key={index}>{prod.name}</li>;
  });

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
  }; /**pagination end here */

  const [count, setCount] = useState(0);
  const handelIncre = () => {
    setCount(count + 1);
  };

  const adding = async (id) => {
    if (likelist && likelist.lenght !== 0 && likelist.filter((p) => p.productt === id).length === 0) {
      addLike({ productt: id });
    } else {
      removeLike(id);
    }
  };
  return (
    <div className="description-boutique">
      <div className="container">
        {bouitdetail && bouitdetail !== null && (
          <div>
            <div className="infos-boutique">
              <div className="row bout-info">
                <div className="col-lg-2">
                  <figure>
                    <img src={`${data.backUrl}/uploads/${bouitdetail.photo}`} alt="" className="boutique-photo" />
                  </figure>
                  <h2 className="mb-20 name-boutique  ">{bouitdetail.name} </h2>
                  <div>{bouitdetail.telephone} </div>
                </div>
                <div className="col-lg-10">
                  <img src={`${data.backUrl}/uploads/${bouitdetail.photocouverture}`} alt="" className="boutique-couveture" />
                </div>
              </div>
              <div>
                <p>{bouitdetail.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="products-boutique">
          <div className="title">Liste des produits</div>
          <div className="row">
            {currentprod && currentprod.lenght !== 0 ? (
              currentprod.map((prod, index) => (
                <div className="col-md-2 mb-15" key={prod._id + "_" + index}>
                  <ProductBox
                    element={prod}
                    idprod={prod._id}
                    idofboutique={bouitdetail && bouitdetail !== null && bouitdetail._id}
                    idofuser={userid}
                    fraislivrairr={bouitdetail && bouitdetail !== null && bouitdetail.fraislivraison}
                  />
                </div>
              ))
            ) : (
              <div>Pas de produits</div>
            )}
          </div>
        </div>
        {/* <div className="pagination">
            <Pagination
               activePage={ activePage }
               itemsCountPerPage={ 3 }
               totalItemsCount={ currentprod.length }
               pageRangeDisplayed={ 3 }
               onChange={ handlePageChange }
            />
         </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // boutique: state.boutiques.boutiquedetail,
    shoppinglist: state.commandes.products,
    likelist: state.likes.likeuserlist,
    produitlist: state.produits.prodboutique,
    boutiquelist: state.boutiques.list,
    listproduit: state.produits.listprod,
    isAuthenticated: state.users.isAuthenticated,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  getBoutiqueById,
  getProduitBoutique,
  addLike,
  removeLike,
  addcommande,
  setAlert,
})(DescriptionBout);
