import React from "react";
import Modal from "react-modal";
import ImageCrop from "../helpers/ImageCrop";
const ModalImage = ({ onExport, closeModal, openModal, modalIsOpen }) => {
  /******************22/09/2020****************************************************/
  // @update-picture/   Model Starts Here
  /***************************l*******************************************/

  return (
    <div>
      <button onClick={openModal} className="modif-button-photo">
        Ajouter photo
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal">
        <form>
          <ImageCrop onExport={onExport} imgWidth="700" imgHeight="700" />
        </form>
        <button onClick={closeModal}>Ajouter photo</button>
      </Modal>
    </div>
  );
};

export default ModalImage;
