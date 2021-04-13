import React from "react";
import Modal from "react-modal";
import adressnote from "../../icons/pin.svg";
const ModalClient = ({ oneclient }) => {
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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }
  function closeModal(e) {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="button-open" onClick={(e) => openModal(e)} data-id={oneclient._id}>
        {oneclient.nom}
      </div>
      <Modal id={oneclient._id} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="row">
          <div className="col-lg-12">
            <div className="modal-client">
              <h2>Client info</h2>
              <img src={adressnote} className="address-icon" />
              <form>
                <b>Coordonnée :</b>
                <ul>
                  <li>{oneclient.user && oneclient.user !== null && oneclient.user.email}</li>
                  <li>{oneclient.user && oneclient.user !== null && oneclient.user.firstname} </li>
                  <li>{oneclient.user && oneclient.user !== null && oneclient.user.lastname} </li>
                </ul>
                <b>Facturation:</b>
                <ul>
                  <li>{oneclient.nom}</li>
                  <li>{oneclient.telephone}</li>
                  <li>{oneclient.adresse}</li>
                </ul>
              </form>
              <div className="btn-client">
                <button onClick={closeModal}>Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalClient;
