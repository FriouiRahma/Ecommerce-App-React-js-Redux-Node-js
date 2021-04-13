import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { modifprixtotal } from "../../actions/commande";
import commandenote from "../../icons/note (1).svg";
const ModalCommande = ({ onencommande, modifprixtotal }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "80vh",
    },
  };
  Modal.setAppElement("#root");
  var subtitle;
  const [modalIsOpencommande, setIsOpencommande] = React.useState(false);
  const [prixfinal, setPrixfinal] = useState();
  const onChangeprixfinal = (e) => setPrixfinal(e.target.value);
  const changerprixfinal = (e, id) => {
    e.preventDefault();
    modifprixtotal({ id, prixfinal });
  };
  function openModalcommande(e, valeur) {
    e.preventDefault();
    setIsOpencommande(true);
    setPrixfinal(valeur);
  }
  function closeModalcommande(e) {
    setIsOpencommande(false);
  }

  return (
    <div>
      <div className="button-open" onClick={(e) => openModalcommande(e, onencommande.netapayer)}>
        {onencommande.netapayer}DT
      </div>
      <Modal isOpen={modalIsOpencommande} onRequestClose={closeModalcommande} style={customStyles}>
        <div className="row">
          <div className="col-lg-12">
            <div className="modal-commande">
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Commande info</h2>
              <img src={commandenote} className="commande-note" alt=""   />
              <table>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {onencommande.products.map((prod, index) => {
                    // total1 = total1 + prod.quantite * prod.prix_unitaire;

                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td>{prod.id_prod && prod.id_prod !== null && prod.id_prod.name} </td>
                          <td>{prod.prix_unitaire}DT</td>
                          <td>{prod.quantite}</td>
                          <td>{prod.quantite * prod.prix_unitaire}DT</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
              <div>
                <div className="neta-payer">
                  <div className="frais-livraison">
                    Frais de livraison:<span>{onencommande.frais_livraison != null ? onencommande.frais_livraison : 0}DT</span>
                  </div>
                  <div className="total-price">
                    Total:<span>{onencommande.total}DT</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="prix-final">
                      <b>Net à payer:</b>{" "}
                      <input className="valeur-netapayer" type="text" placeholder="prixfinal" name="prixfinal" onChange={(e) => onChangeprixfinal(e)} value={prixfinal || ""} />
                      <button className="btn-netap" onClick={(e) => changerprixfinal(e, onencommande._id)}>
                        OK
                      </button>
                    </div>
                    <div className="total-price  final">
                      Net à payer:<span>{onencommande.netapayer}DT</span>
                    </div>
                  </div>
                  <div>
                    <button className="btn-netapayer" onClick={closeModalcommande}>
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default connect(null, { modifprixtotal })(ModalCommande);
