import React from "react";
import Modal from "react-modal";
import ImageCrop from "../helpers/ImageCrop";
const ModalImageCouveture = ({ openModal1, modalIsOpen1, closeModal1, onExport1 }) => {
  var subtitle;
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
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  return (
    <div>
      <button onClick={openModal1} className="modif-button-photo">
        Ajouter photo couverture
      </button>
      <Modal isOpen={modalIsOpen1} onAfterOpen={afterOpenModal} onRequestClose={closeModal1} style={customStyles} contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <form>
          <ImageCrop onExport={onExport1} imgWidth="750" imgHeight="300" />
        </form>
        <button onClick={closeModal1}>Ajouter photo couverture</button>
      </Modal>
    </div>
  );
};

export default ModalImageCouveture;
