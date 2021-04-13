import React from "react";
import Modal from "react-modal";
import ImageCrop from "../helpers/ImageCrop";

const ModalModif = () => {
  /******************19/11/2020****************************************************/
  // @update-picture/   Model Starts Here
  /***************************l*******************************************/
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
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement("#root");
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
    setFormData({ ...formData, etat: true });
  }
  const onExport = (ex) => {
    setFormData(ex);
  };
  return (
    <div>
      <div>
        <button onClick={openModal}>Modifer photo</button>
        <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
          <form>
            <ImageCrop onExport={onExport} imgWidth="720" imgHeight="275" />
          </form>
          <button onClick={closeModal}>Modifier photo</button>
        </Modal>
      </div>
    </div>
  );
};

export default ModalModif;
