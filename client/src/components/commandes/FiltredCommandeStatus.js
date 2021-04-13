import React from "react";
import { connect } from "react-redux";
import { allcommande, cammandewithstatus } from "../../actions/commande";
import { loadmessagecommande } from "../../actions/message-commandes";
import { Link } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import data from "../../utils/default.json";
export const FiltredCommandeStatus = ({ boutique, commandelist, match, statuslist, cammandewithstatus, commandefiltred }) => {
  console.log("commandefiltred", commandefiltred);
  let boutiqueofcommande = null;
  if (boutique && boutique.length !== 0) {
    boutiqueofcommande = boutique[0];
    console.log("boutiqueofcommande", boutiqueofcommande);
  }

  const commandeboutique =
    commandelist &&
    commandelist.length !== 0 &&
    commandelist.filter((el) => boutiqueofcommande && boutiqueofcommande !== null && el.boutique && el.boutique !== null && el.boutique._id === match.params.id);

  return (
    <div>
      <UserLayout>
        <div className="commandeboutique">
          <h1 className="commande-title">Commande boutique</h1>
          <div>
            <Link to={`/commande-boutique/${boutiqueofcommande && boutiqueofcommande !== null && boutiqueofcommande._id}`}>Tous commandes boutique</Link>
          </div>
          {statuslist.map((el, index) => (
            <div key={index}>
              <Link
                to={"/commande-friltred-status"}
                onClick={() => cammandewithstatus({ id: el._id, idboutique: boutiqueofcommande && boutiqueofcommande !== null && boutiqueofcommande._id })}
              >
                {el.name}
              </Link>
            </div>
          ))}
          <div>
            <div className="commandedetail">
              <div className="row">
                {commandefiltred && commandefiltred.length !== 0
                  ? commandefiltred.map((el, index) => (
                      <div key={el._id} className="col-md-3 ">
                        <div className="boutiquename">{el.boutique.name}</div>
                        {el.products.map((prod, index) => (
                          <div key={index}>
                            <div className="name">{prod.id_prod.name}</div>
                            <div className="description">{prod.id_prod.descritpion}</div>
                            <div className="quantity">{prod.quantite}</div>
                            <div className="price">{prod.prix_unitaire}</div>
                            <figure>
                              <img src={`${data.backUrl}/uploads/${prod.id_prod && prod.id_prod !== null && prod.id_prod.photo[0]}`} alt="" />
                            </figure>
                          </div>
                        ))}
                        <div className="btn ">
                          <Link className="btn " to={`/info-commande-boutique/${el._id}`}>
                            More information
                          </Link>
                        </div>
                      </div>
                    ))
                  : "there is no commande with this status"}
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boutique: state.boutiques.boutiqueuser,
    commandelist: state.commandes.allcommand,
    commandefiltred: state.commandes.filtredcommandebystatus,
    statuslist: state.status.liststatus,
  };
};

export default connect(mapStateToProps, { allcommande, loadmessagecommande, cammandewithstatus })(FiltredCommandeStatus);
