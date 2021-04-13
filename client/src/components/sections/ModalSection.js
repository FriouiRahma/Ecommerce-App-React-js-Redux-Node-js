import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import data from "../../utils/default.json";
import { commanderfromsection } from "../../actions/commande";
import Closeicon from "../../icons/cancel1.svg";
import { setAlert } from "../../actions/alert";
/******************11/11/2020****************************************************/
// @update-picture/   Modal Starts Here
/***************************FR**************************************************/
const ModalSection = ({ commanderfromsection, idofprod, prodr, iduser, fraislivrai, boutiqueid, setAlert, isAuthenticated }) => {
  let userid = iduser;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  // Make sure to bind modal to your appprodrement (http://reactcommunity.org/react-modal/accessibility/)
  //Modal.setAppprodrement("#root");

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal(e) {
    e.preventDefault();
    isAuthenticated ? setIsOpen(true) : console.log("alert", setAlert("Vous devez d'abord connecter", "danger", 3000));
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setFormData({
      nom: "",
      telephone: "",
      address: "",
    });
    setIsOpen(false);
  }
  const handprodrIncre = (e) => {
    e.preventDefault(e);
    setCount(count + 1);
  };
  const handprodrdecre = (e) => {
    e.preventDefault(e);
    if (count > 1) {
      setCount(count - 1);
    }
  };
  let products = [];
  const [count, setCount] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    telephone: "",
    address: "",
  });
  const { nom, telephone, address } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  let id_prod = null;
  let prix_unitaire = 0;
  let frais_livraison = 0;
  let boutique = null;
  const acheter = (boutique, id_prod, prix_unitaire, count, frais_livraison) => {
    products = [...products, { id_prod, prix_unitaire, quantite: count }];
    const add = commanderfromsection(boutique, userid, nom, telephone, address, products, frais_livraison);
    if (add) {
      setFormData({
        nom: "",
        telephone: "",
        address: "",
      });
      products = [];
    }
    // console.log(boutique, userid,nom,telephone,address,products,frais_livraison);
  };
  return (
    <div>
      <div>
        <div className="openmodel-acheter" style={{ cursor: "pointer" }} onClick={(e) => openModal(e)}>
          Acheter
        </div>

        <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
          <div className="modalsection-box">
            <div className="button-close">
              <button onClick={closeModal}>
                <img className="iconclose" src={Closeicon} />
              </button>
            </div>

            <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
            <form>
              <div>
                <div style={{ display: "flex", marginBottom: "40px" }}>
                  <img style={{ width: "150px" }} src={`${data.backUrl}/uploads/${prodr.photo[0]}`} alt="" />
                  <div className="prod-info">
                    <div className="name-produit">
                      {prodr.name}
                      {prodr.tarifpromo ? <div className="prix">{prodr.tarifpromo} DT</div> : <div className="prix">{prodr.price} DT </div>}
                    </div>

                    <div>
                      <button className="btn-shop-left" onClick={(e) => handprodrdecre(e)}>
                        -
                      </button>
                      <span className="quantity-wanted">{count}</span>
                      <button className="btn-shop-right" onClick={(e) => handprodrIncre(e)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <h2 className="enter-coord">Entrer vos coordonnés</h2>
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
              </div>
            </form>
            <button
              className="button-acheter"
              onClick={() => acheter(boutiqueid, idofprod, (prix_unitaire = prodr.tarifpromo ? prodr.tarifpromo : prodr.price), count, fraislivrai)}
            >
              Acheter
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
  };
};
export default connect(mapStateToProps, { commanderfromsection, setAlert })(ModalSection);
