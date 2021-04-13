import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadallProducts } from "../../actions/Produit";
import { Link } from "react-router-dom";
import data from "../../utils/default.json";
import { addcommande } from "../../actions/commande";
import { addLike, removeLike } from "../../actions/likes";
import ProductBox from "../helpers/ProductBox";
import { setAlert } from "../../actions/alert";
export const ProductCategorie = ({
  match,
  products,
  setAlert,
  loadallProducts,
  categorieList,
  addcommande,
  shoppinglist,
  users,
  isAuthenticated,
  likelist,
  addLike,
  removeLike,
}) => {
  useEffect(() => {
    loadallProducts();
  }, [loadallProducts]);
  let userid = null;
  if (isAuthenticated && users.user) {
    userid = users.user._id;
  }

  let productList = [];
  if (products && products.length !== 0) {
    products.map((el) => {
      el.categories.map((cl) => {
        if (cl._id === match.params.id) {
          productList = [...productList, el];
        }
        if (cl.parent === match.params.id) {
          productList = [...productList, el];
        }
      });
    });
  }

  const productList1 = productList.filter((item, index) => {
    return productList.indexOf(item) === index;
  });
  productList = [...productList1];

  const nomCategory = categorieList.filter((cat) => cat._id === match.params.id);
  const categoryName = nomCategory[0];

  return (
    <div className="products-categorie">
      <div className="container">
        <div className="products-list-cat">
          <h1 className="cat-Name">Categorie: {categoryName && categoryName !== null && categoryName.name}</h1>
          <div className="row">
            {productList && productList.length !== 0 ? (
              productList.map((el, index) => {
                return (
                  <div div className="col-md-2 mb-15" key={el._id + "_" + index}>
                    <ProductBox
                      element={el}
                      idprod={el._id}
                      idofboutique={el.boutique && el.boutique !== null && el.boutique._id}
                      idofuser={userid}
                      fraislivrairr={el.boutique && el.boutique !== null && el.boutique.fraislivraison}
                    />
                  </div>
                );
              })
            ) : (
              <div className="no-products">Pas de Produits</div>
            )}
          </div>
          {/* <h1>child of product category</h1> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppinglist: state.commandes.products,
    products: state.produits.listprod,
    categorieList: state.categories.list,
    isAuthenticated: state.users.isAuthenticated,
    users: state.users,
    likelist: state.likes.likeuserlist,
  };
};

export default connect(mapStateToProps, { loadallProducts, addcommande, addLike, removeLike, setAlert })(ProductCategorie);
