import React, { useState } from "react";
import { connect } from "react-redux";
import { addmessage } from "../../actions/message-commandes";
import data from "../../utils/default.json";
import { recupcommande } from "../../actions/commande";

export const CommandeInfoUser = ({ messagecommande, match, addmessage, commandlist, recupcommande, users }) => {
  let userid = "";
  const { isAuthenticated } = users;
  if (isAuthenticated && users.user) {
    userid = users.user._id;
  }
  console.log("messagecommande", messagecommande);

  const currmessage = messagecommande.filter((el) => el.id_commande && el.id_commande !== null && el.id_commande._id === match.params.id);

  recupcommande();

  const commandefiltred = commandlist.filter((el) => el._id === match.params.id);
  const currcommande = commandefiltred[0];
  console.log("commandelist to a affiche", currcommande);
  //console.log("commande name of boutique", currcommande.product.boutique.name);
  const [formData, setFormData] = useState({
    contenu: "",
  });
  const { contenu } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const add = async (idcommande) => {
    addmessage({
      source: "u",
      id_commande: idcommande,
      contenu,
      idsource_user: userid,
    });
    setFormData({
      contenu: "",
    });
  };

  return (
    <div>
      <div className="container  commande-info-user">
        {commandefiltred.map((el, index) => (
          <div key={index}>
            <div  className='commande-num'>Commande Num {el.idCommande}</div>
            <div className="row">
              <div className="col-lg-6">
                <table className="table-details">
                  <thead>
                    <tr>
                      <th>Nom boutique</th>
                      <th>Telephone</th>
                      <th>Website</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{el.boutique && el.boutique !== null && el.boutique.name}</td>
                      <td>{el.boutique && el.boutique !== null && el.boutique.telephone}</td>
                      <td>{el.boutique && el.boutique !== null && el.boutique.website}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-lg-6">
                <table className="table-details">
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>Image</th>
                      <th style={{ width: "25%" }}>Nom product</th>
                      <th style={{ width: "25%" }}>quatité</th>
                      <th style={{ width: "25%" }}>prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {el.products.map((prod) => (
                      <React.Fragment>
                        <tr>
                          <td>
                            <figure>
                              <img src={`${data.backUrl}/uploads/${prod.id_prod && prod.id_prod !== null && prod.id_prod.photo[0]}`} alt="" />
                            </figure>
                          </td>
                          <td>{prod.id_prod && prod.id_prod !== null && prod.id_prod.name}</td>
                          <td>{prod.quantite}</td>
                          <td>{prod.prix_unitaire}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-lg-6">
            <div className="send-message">
              {currmessage &&
                currmessage.length !== 0 &&
                currmessage.map((el) => (
                  <div key={el._id} className="message-detail">
                    {el.source === "u" ? (
                      <div>VOUS: {el.contenu}</div>
                    ) : (
                      <div>
                        {el.idsource_user.firstname}: {el.contenu}
                      </div>
                    )}
                  </div>
                ))}
              <div className="title-message">Envoyer message</div>
              <div className="sendmessage">
                <div>
                  <textarea rows="4" cols="50" type="text" name="contenu" onChange={(e) => onChange(e)} value={contenu} />
                </div>

                <button className="btn-send" onClick={() => add(match.params.id)}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messagecommande: state.messages.messlist,
    commandlist: state.commandes.allcommand,
    users: state.users,
  };
};

export default connect(mapStateToProps, { recupcommande, addmessage })(CommandeInfoUser);
