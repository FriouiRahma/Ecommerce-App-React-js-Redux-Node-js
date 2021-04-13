import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { commander } from "../../actions/commande";
import data from "../../utils/default.json";
const Chekout = ({ commandelist, productList, commander, users, history }) => {
  console.log("commandelist.products", commandelist.products);

  const connecteduser = users.user;
  console.log("connecteduser", connecteduser);
  const coorduserconneted = users.profile;
  console.log("coorduserconneted", coorduserconneted);
  //console.log('connecteduser.lastname',connecteduser.lastname);
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    address: "",
  });
  // useEffect(() => {
  //   if (connecteduser) {
  //     setFormData((prevItems) => {
  //       return {
  //         ...prevItems,
  //         nom: connecteduser&&connecteduser!==null&&  connecteduser.lastname,
  //         telephone:coorduserconneted&&coorduserconneted!==null&&  coorduserconneted.telephone,
  //         address:coorduserconneted&&coorduserconneted!==null&& coorduserconneted.address.city +","+coorduserconneted.address.line+","+coorduserconneted.address.region+","+coorduserconneted.address.zipcode

  //       };
  //     });
  //   }
  // }, [connecteduser,coorduserconneted]);

  const { nom, telephone, address } = formData;
  
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const products = commandelist.products;
  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  // Group by color as key to the person array
  const objectToArray = groupBy(products, "id_boutique");
 
  const fraiscommande = products.map((el) => el.frais_livraison);
  let frais_livraison = 0;
  if (fraiscommande) {
    frais_livraison = fraiscommande[0];
  }

 
  const user = commandelist.id_user;
  const addcommande = () => {
    commander(user, nom, telephone, address, objectToArray, products, frais_livraison, history);
  };
  return (
    <div>
      <div className="container">
        <div className="chekout-detail">
          <div className="verif-title">Vérifiez votre liste </div>
          <table className="table-details">
            <thead>
              <tr>
                <th>Image</th>
                <th>Produit</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {productList &&
                productList.length !== 0 &&
                commandelist.products &&
                commandelist.products.length !== 0 &&
                commandelist.products.map((el, index) => (
                  <tr key={index} className="chekout-info">
                    <td>
                      <img className="picture-item" src={`${data.backUrl}/uploads/${productList.filter((p) => p._id === el.id_prod)[0].photo[0]}`} alt="" />
                    </td>
                    <td>
                      <Link className="linkprod" to={`/product/${el.id_prod}`}>
                        {productList.filter((p) => p._id === el.id_prod)[0].name}
                      </Link>
                    </td>
                    <td>{el.prix_total}DT </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="double-button">
            <button className="button-check">
              <Link to="/commandes">Retour au panier</Link>
            </button>
            <button className="button-check">
              <Link to="/boutiques">Continuer à magasiner</Link>
            </button>
          </div>
          {commandelist.products.length !== 0 && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <div className="price-commande">Total {commandelist.prix_totcommande} DT</div>
            </div>
          )}

          <div className="coordonne">Entrer vos coordonnés</div>
          <div className="form-group">
            <label htmlFor="">Nom</label>
            <input type="text" name="nom" onChange={(e) => onChange(e)} value={nom || ""} />
          </div>
          <div className="form-group">
            <label htmlFor="">Téléphone</label>
            <input type="text" name="telephone" onChange={(e) => onChange(e)} value={telephone || ""} />
          </div>
          <div className="form-group">
            <label htmlFor="">Adresse</label>
            <input type="text" name="address" onChange={(e) => onChange(e)} value={address || ""} />
          </div>
          {commandelist.products.length !== 0 && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <button className="button-commande" onClick={addcommande}>
                Commander
              </button>
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
    users: state.users,
  };
};

export default connect(mapStateToProps, { commander })(Chekout);
