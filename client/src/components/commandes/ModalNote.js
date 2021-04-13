import React from "react";
import Modal from "react-modal";
import Noteicon from "../../icons/information.svg";
import noteIcon from "../../icons/sticky-notes (1).svg";
import Moment from "react-moment";
const ModalNote = ({ onenote }) => {
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

  const [modalIsOpennte, setIsOpennote] = React.useState(false);

  function openModalNote(e) {
    e.preventDefault();
    setIsOpennote(true);
  }
  function closeModalNote(e) {
    setIsOpennote(false);
  }

  return (
    <div>
      <div>
        {/* Model contenu Note */}
        <div className="info-note-outer">
          <div className="info-note">
            <img onClick={(e) => openModalNote(e)} src={Noteicon} alt="" className="noteicon" />
            <Modal isOpen={modalIsOpennte} onRequestClose={closeModalNote} style={customStyles}>
              <div className="row">
                <div className="col-lg-12 modal-note ">
                  <h2>Note info</h2>
                  <img src={noteIcon} className="icon-of-note" />
                  <form>
                    {onenote.privatenote.map((Not, index) => (
                      <div className={index}>
                        <div style={{ color: "#929eaa" }}>
                          <Moment format="YYYY-MM-DD" date={Not.date}></Moment>
                        </div>
                        <div className="petit-info-notuser">
                          <div className="info-user">{Not.id_user && Not.id_user !== null && Not.id_user.firstname}</div>
                          <div className="detail-note">:{Not.note}</div>
                        </div>
                      </div>
                    ))}
                  </form>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="fermer-button-note" onClick={closeModalNote}>
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
            <div className="number-note">{onenote.privatenote.length} </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNote;
