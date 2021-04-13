import React from "react";
import { connect } from "react-redux";
//import { loaduserlikes } from "../../actions/likes";
import { removeLike } from "../../actions/likes";
import closeIcon from "../../icons/delete (2).svg";
import data from "../../utils/default.json";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import staricon from "../../icons/star (1).svg";
import { confirmAlert } from "react-confirm-alert";
const LikeList = ({ userslike, productList, removeLike, isAuthenticated, loading }) => {
  //let like = [];

  // if (productList) {
  //   like = userslike.map((el) => productList.filter((p) => p._id === el.productt)[0].name);
  //   console.log("userlikeeeeeeeeeee", like);
  // }
  //console.log("userslike", userslike);
  const header = (
    <thead>
      <tr>
        <th></th>
        <th>image produit</th>
        <th>Nom produit </th>
        <th>prix unitaire</th>
      </tr>
    </thead>
  );
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeLike(id),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <div className="container   list-like">
        <div className="user-favorite">
          Mes préférés
          <img src={staricon} alt="" className="closeIcon" />
        </div>
        <div className="likes-details">
          <table className="table-details">
            {userslike && userslike.length !== 0 && header}
            <tbody>
              {productList && productList.length !== 0 && userslike && userslike.length !== 0 ? (
                userslike.map(
                  (el, index) =>
                    el.productt !== null && (
                      <React.Fragment key={index}>
                        <tr className="like-info">
                          <td>
                            <img
                              title="delete"
                              src={closeIcon}
                              alt=""
                              className="closeIcon"
                              onClick={() => {
                                submit(el.productt && el.productt !== null && el.productt._id);
                              }}
                            />
                            {/* <button onClick={() => removeLike(el.productt)}>remove like</button> */}
                          </td>
                          <td>
                            <img className="picture-item" src={`${data.backUrl}/uploads/${el.productt && el.productt !== null && el.productt.photo[0]}`} alt="" />
                          </td>
                          <td>
                            <Link to={`/product/${el.productt && el.productt !== null && el.productt._id}`}>{el.productt && el.productt !== null && el.productt.name}</Link>
                          </td>
                          <td style={{ fontWeight: "600" }}>{el.productt && el.productt != null && el.productt.price} DT </td>
                        </tr>
                      </React.Fragment>
                    )
                )
              ) : (
                <tr className="like-list-empty">
                  <td className="auc-like">Aucun produit dans la list de souhaits</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
    userslike: state.likes.likeuserlist,
    productList: state.produits.listprod,
  };
};

export default connect(mapStateToProps, { removeLike })(LikeList);
