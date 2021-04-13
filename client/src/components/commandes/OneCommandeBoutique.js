import React, { useState } from "react";
import ModalClient from "./ModalClient";
import ModalProduct from "./ModalProduct";
import ModalNote from "./ModalNote";
import ModalCommande from "./ModalCommande";
import Notecomponent from "./Notecomponent";
import { connect } from "react-redux";
import AddTracking from "./AddTracking";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const OneCommandeBoutique = ({ statusofboutique, onecommande, iduser, handleChange, chekedone, namestatus }) => {
  /******chekbox */
  const Checkbox = ({ type = "checkbox", id, name, checked = false, onChange }) => {
    return <input type={type} value={id} id={id} name={name} checked={checked} onChange={onChange} />;
  };

  const [options] = useState({
    tabid: [],
  });
  const { tabid } = options;

  console.log("tabid", tabid);
  let stat = [];
  /*******  changement status commande*******/
  namestatus &&
    namestatus !== null &&
    namestatus.next_status &&
    namestatus.next_status.length !== 0 &&
    namestatus.next_status.map((el) => {
      statusofboutique.map((sl) => {
        if (sl._id === el) {
          stat = [...stat, sl];
        }
      });
    });

  return (
    <tr>
      <td className="col-chechbox">
        <Checkbox checked={chekedone} onChange={handleChange} id={onecommande._id} />
      </td>
      <td>
        <Link to={`/info-commande-boutique/${onecommande._id}`}>{onecommande.idCommande}</Link>
      </td>
      <td>
        <ModalClient oneclient={onecommande} />
      </td>
      <td>
        <div>{onecommande.telephone}</div> <div>{onecommande.adresse}</div>{" "}
      </td>
      <td className="col-products">
        <ModalProduct oneproduct={onecommande} />
      </td>
      <td>
        <ModalCommande onencommande={onecommande} />
      </td>
      <td>
        <div style={{ backgroundColor: namestatus.couleur }}>{namestatus && namestatus !== null && namestatus.name}</div>
      </td>
      <td>
        <div>
          <Moment format="YYYY-MM-DD" date={onecommande.createdAt}></Moment>
        </div>
        <div className="date-en-seconde">
          <Moment format="HH:mm:ss" date={onecommande.createdAt}></Moment>
        </div>
      </td>
      <td>
        <AddTracking oneelement={onecommande} />
      </td>
      <td> {stat && stat.length !== 0 && stat.map((el) => <div style={{ backgroundColor: el.couleur }}>{el.name}</div>)} </td>
      <td className="col-notes">
        <div>
          <ModalNote onenote={onecommande} />
          <Notecomponent note={onecommande} iduser={iduser} />
        </div>
      </td>
    </tr>
  );
};

export default connect(null, {})(OneCommandeBoutique);
