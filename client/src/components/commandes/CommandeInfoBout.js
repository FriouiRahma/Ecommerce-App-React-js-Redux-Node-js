import React, { useState } from "react";
import { connect } from "react-redux";
import { addmessage, loadmessagecommande } from "../../actions/message-commandes";
import { modifstatus } from "../../actions/commande";
import data from "../../utils/default.json";
import UserLayout from "../layout/UserLayout";
export const CommandeInfo = ({ match, boutique, messagecommande, addmessage, loadmessagecommande, commandelist, modifstatus, statuslist, users }) => {
  // useEffect(() => {
  //    loadmessagecommande();
  // }, [loadmessagecommande]);
  let userid = "";
  const { isAuthenticated } = users;
  if (isAuthenticated && users.user) {
    userid = users.user._id;
  }
  let idboutique = "";
  idboutique = boutique && boutique.length !== 0 && boutique[0]._id;
  let statusofboutique = statuslist.filter((el) => el.id_boutique === idboutique);
  let defaultstatus = statuslist.filter((el) => el.id_boutique === "0");
  statusofboutique = [...statusofboutique, { _id: "0", name: "En Attente", couleur: "#5d7584" }, ...defaultstatus];
  console.log("statusofboutique", statusofboutique);
  
  // const   secstatus=[...statuslist,{_id:"0",name:"En attente"}]
  const secstatus = [...statuslist, { _id: "0", name: "En attente" }];
  const currmessage = messagecommande.filter((el) => el.id_commande && el.id_commande !== null && el.id_commande._id === match.params.id);
  const currcommande = commandelist.filter((el) => el._id === match.params.id);
  
  const currentcommande = currcommande[0];
  
  const [formData, setFormData] = useState({
    contenu: "",
  });
  /*******  changement status commande*******/
  const [status, setStatus] = useState();
  /***filter status name from the back */

  const namestattttt = statusofboutique.filter((statu) => statu._id === status)[0];
  const handelChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const changerstatus = () => {
    modifstatus({ id: currentcommande._id, statuss: status });
    // addmessage({
    //   source: "b",
    //   id_commande: currentcommande._id,
    //   contenu: `status updates to  "${namestattttt && namestattttt !== null && namestattttt.name}"`,
    //   idsource_user: userid,
    // });
  };

  const { contenu } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const add = async (idcommande) => {
    addmessage({
      source: "b",
      id_commande: idcommande,
      contenu,
      idsource_user: userid,
    });
    setFormData({
      contenu: "",
    });
  };
  return (
    <div className="container commande-info-boutique">
      <UserLayout>
        <div className="commande">
          {currcommande &&
            currcommande.length !== 0 &&
            currcommande.map((el, index) => {
              const namestatus = statusofboutique.filter((statu) => statu._id === el.status)[0];
              return (
                <div key={index}>
                  <div className="status-commande">
                    <div className="status-name" style={{ backgroundColor: namestatus && namestatus !== null && namestatus.couleur }}>
                      <div> {namestatus && namestatus !== null && namestatus.name}</div>
                    </div>
                    <div className="select-style">
                      <select onChange={handelChangeStatus}>
                        {statusofboutique.map((stat, index) => (
                          <React.Fragment key={index}>
                            <option value={stat._id}>{stat.name}</option>
                          </React.Fragment>
                        ))}
                      </select>
                      <button className="btn-appliquer" onClick={changerstatus}>
                        changer status
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <table className="table-details">
                        <thead>
                          <tr>
                            <th style={{ width: "20%" }}>Image</th>
                            <th>Nom</th>
                            <th>Quantite</th>
                            <th>prix unitaire</th>
                          </tr>
                        </thead>
                        <tbody>
                          {el.products.map((prod, index) => (
                            <React.Fragment>
                              <tr key={index}>
                                <td>
                                  <figure>
                                    <img src={`${data.backUrl}/uploads/${prod.id_prod && prod.id_prod !== null && prod.id_prod.photo[0]}`} alt="" />
                                  </figure>
                                </td>
                                <td>{prod.id_prod && prod.id_prod !== null && prod.id_prod.name}</td>
                                <td>{prod.quantite}</td>
                                <td>{prod.prix_unitaire}DT</td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="col-lg-6">
                      <table className="table-details">
                        <thead>
                          <tr>
                            <th>CommandeID</th>
                            <th>Nom</th>
                            <th>email</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{el.idCommande}</td>
                            <td>{el.user.firstname}</td>
                            <td>{el.user.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      {currmessage &&
                        currmessage.length !== 0 &&
                        currmessage.map((el) => (
                          <div key={el._id} className="message-detail">
                            {el.source === "u" ? (
                              <div>
                                {el.idsource_user.firstname}: {el.contenu}
                              </div>
                            ) : (
                              <div>VOUS: {el.contenu}</div>
                            )}
                          </div>
                        ))}
                      <div className="title-message">Envoyer message</div>
                      <div className="sendmessage">
                        <div>
                          <textarea rows="4" cols="50" type="text" name="contenu" onChange={(e) => onChange(e)} value={contenu} />
                        </div>
                        <div></div>
                      </div>

                      <button className="btn-send" onClick={() => add(match.params.id)}>
                        Envoyer
                      </button>
                    </div>
                  </div>
                  {/* <div className='name'> {el.product.name} </div>
                  <figure>
                    <img src={`${data.backUrl}/uploads/${el.product.photo[0]}`} alt='' />
                  </figure>
                  <div className='quantity'> quantity:{el.quantity} </div>
                  <div className='price'> price :{el.price} </div>
                  <select onChange={handelChangeStatus}>
                    {statuslist.map((stat, index) => (
                      <React.Fragment key={index}>
                        <option value={stat._id}>{stat.name}</option>
                      </React.Fragment>
                    ))}
                  </select>
                  <button onClick={changerstatus}> changer status </button>
                  {el.status === "0" ? (
                    <h2>"En attente</h2>
                  ) : (
                    namestatus && namestatus !== null && namestatus.name
                  )} */}
                </div>
              );
            })}
        </div>
      </UserLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    commandelist: state.commandes.allcommand,
    messagecommande: state.messages.messlist,
    statuslist: state.status.liststatus,
    users: state.users,
    boutique: state.boutiques.boutiqueuser,
  };
};

export default connect(mapStateToProps, { addmessage, loadmessagecommande, modifstatus })(CommandeInfo);
