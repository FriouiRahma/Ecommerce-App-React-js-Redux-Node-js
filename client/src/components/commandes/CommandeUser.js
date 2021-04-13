import React, { useEffect } from "react";
import { connect } from "react-redux";
import { recupcommande } from "../../actions/commande";
import { addmessage } from "../../actions/message-commandes";
import { Link } from "react-router-dom";
import data from "../../utils/default.json";
import moreInfo from "../../icons/support.svg";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";

export const Commande = ({ recupcommande, commande, addmessage, isAuthenticated, loading, statuslist }) => {
  useEffect(() => {
    recupcommande();
  }, [recupcommande]);
  
  const secstatus = [...statuslist, { _id: "0", name: "En attente" }];
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div className="commande-list">
      <div>
        <div className="container list-comm ">
          <h1>Liste des Commandes</h1>
          <table className="list-commande-table">
            <thead>
              <tr>
                <th>ID commande</th>
                <th>Boutique</th>
                <th>Frais de transport</th>
                <th>Nom Produit</th>
                <th>Quantité</th>
                <th>Prix</th>
                <th>Net à payer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Plus d'information</th>
              </tr>
            </thead>
            <tbody>
              {commande.map((comman, index) => {
                const namestatus = secstatus.filter((statu) => statu._id === comman.status)[0];
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{comman.idCommande}</td>
                      <td>{comman.boutique && comman.boutique !== null && comman.boutique.name}</td>
                      <td>{comman.boutique && comman.boutique !== null && comman.boutique.fraislivraison}DT</td>
                      <td>
                        {comman.products.map((prod, id) => (
                          <div key={id}>
                            <Link to={`/product/${prod.id_prod && prod.id_prod !== null && prod.id_prod._id}`}>{prod.id_prod && prod.id_prod !== null && prod.id_prod.name}</Link>
                          </div>
                        ))}
                      </td>
                      <td>
                        {comman.products.map((prod, id) => (
                          <div key={id}>{prod.quantite}</div>
                        ))}
                      </td>
                      <td>
                        {comman.products.map((prod, id) => (
                          <div key={id}>{prod.prix_unitaire}DT</div>
                        ))}
                      </td>
                      <td className="net-payer">{comman.netapayer}DT</td>
                      <td>{namestatus && namestatus !== null && namestatus.name}</td>
                      <td>
                        <div className="date">
                          <Moment format="YYYY-MM-DD" date={comman.createdAt}></Moment>
                        </div>
                        <div className="date">
                          <Moment format="HH-mm-ss" date={comman.createdAt}></Moment>
                        </div>
                      </td>
                      <td>
                        <Link to={`/info-commande-user/${comman._id}`}>
                          <img src={moreInfo} title="more information" className="moreinfo" />
                        </Link>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
    commande: state.commandes.commande,
    statuslist: state.status.liststatus,
  };
};

export default connect(mapStateToProps, { recupcommande, addmessage })(Commande);
