import React, { useState } from "react";
import { connect } from "react-redux";
import { addslider } from "../../actions/sliders";
import ImageCrop from "../helpers/ImageCrop";
import AdminLayout from "../layout/AdminLayout";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";

const AddSliderAdmin = ({ addslider, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    titre: "",
    photo: "",
    description: "",
    lien: "",
    etat: "",
  });
  const { titre, photo, description, lien, etat } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    const add = await addslider({ titre, photo, description,lien });
    if (add) {
      setFormData({
        titre: "",
        photo: "",
        description: "",
        lien: "",
      });
    }
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
  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
    setFormData({ ...formData, etat: false });
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
    setFormData({ ...formData, photo: ex });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }

  return (
    <div className="ce-form">
      <AdminLayout>
        <div className="new-slider">
          <h1>Ajouter un nouveau slider</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor=""> Titre Slider </label>
              <input type="text" name="titre" onChange={(e) => onChange(e)} value={titre} />
            </div>

            {/* Open Model Here */}
            <div>
              <div>
                <button onClick={openModal} className="btn-add-photo">
                  Ajouter photo
                </button>
                <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                  <form>
                    <ImageCrop onExport={onExport} imgWidth="750" imgHeight="300" />
                  </form>
                  <button onClick={closeModal}>Ajouter photo</button>
                </Modal>
              </div>
              <div className="photo-slider">{etat === true && <img src={photo} alt="" />}</div>
            </div>

            {/* <div className='form-group'>
                <label htmlFor=''>Photo</label>
                <ImageCrop onExport={onExport} imgWidth='750' imgHeight='300' />
              </div> */}
            <div className="form-group">
              <label htmlFor="">description</label>
              <input type="text" name="description" onChange={(e) => onChange(e)} value={description} />
            </div>
            <div className="form-group">
              <label htmlFor="">lien</label>
              <input type="text" name="lien" onChange={(e) => onChange(e)} value={lien} />
            </div>

            <input type="submit" className="btn btn-primary" value="Ajouter slider" />
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

export default connect(mapStateToProps, { addslider })(AddSliderAdmin);
