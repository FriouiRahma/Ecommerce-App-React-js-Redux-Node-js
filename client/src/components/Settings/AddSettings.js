import React, { useState } from "react";
import { connect } from "react-redux";
import { addsetting } from "../../actions/settings";
import AdminLayout from "../layout/AdminLayout";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
const AddSettings = ({ addsetting, isAuthenticated, loading, history }) => {
  const [formData, setFormData] = useState({
    image1: "",
    image2: "",
    lienright: "",
    etat: false,
  });

  const { image1, image2, etat, lienright } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    addsetting({ image1, image2, lienright, history });
  };

  /******************22/09/2020****************************************************/
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
  const [modalIsOpen2, setIsOpen2] = React.useState(false);

  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
    setFormData({ ...formData, etat: false });
  }
  function openModal2(e) {
    e.preventDefault();
    setIsOpen2(true);
    setFormData({ ...formData, etat: false });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);

    setFormData({ ...formData, etat: true });
  }
  function closeModal2() {
    setIsOpen2(false);
    setFormData({ ...formData, etat: true });
  }

  const onExport = (ex1) => {
    setFormData({ ...formData, image1: ex1 });
  };
  const onExport2 = (ex) => {
    setFormData({ ...formData, image2: ex });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <AdminLayout>
        <div className="add-settings">
          <h1>Ajouter Settings </h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="lienright">Lien GIF/Vidéo</label>
              <input id="lienright" type="text" name="lienright" onChange={(e) => onChange(e)} value={lienright} />
            </div>

            <div className="photo-acceuil">
              <div>
                <button onClick={openModal} className="button-add-pub">
                  Ajouter photo Acceuil
                </button>
                <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                  <form>
                    <ImageCrop onExport={onExport} imgWidth="337" imgHeight="164" />
                  </form>
                  <button onClick={closeModal}>Ajouter photo Acceuil</button>
                </Modal>
              </div>
              <div className="img-pub">{etat && <img src={image1} alt="" />}</div>
            </div>
            <div className="photo-annonce">
              <div>
                <button onClick={openModal2} className="button-add-pub">
                  Ajouter photo annonce
                </button>
                <Modal isOpen={modalIsOpen2} onAfterOpen={afterOpenModal2} onRequestClose={closeModal2} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                  <form>
                    <ImageCrop onExport={onExport2} imgWidth="337" imgHeight="164" />
                  </form>
                  <button onClick={closeModal2}>Ajouter photo annonce</button>
                </Modal>
              </div>
              <div className="img-pub">{etat && <img src={image2} alt="" />}</div>
            </div>

            <input type="submit" className="btn btn-primary mt-20" value="Ajouter Setting" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { addsetting })(AddSettings);
