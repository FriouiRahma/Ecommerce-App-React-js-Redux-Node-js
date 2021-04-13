import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateslider } from "../../actions/sliders";
import ImageCrop from "../helpers/ImageCrop";
import { Redirect } from "react-router-dom";
import data from "../../utils/default.json";
import AdminLayout from "../layout/AdminLayout";
import Modal from "react-modal";
const UpdateSliderAdmin = ({ sliderlist, updateslider, match, isAuthenticated, loading }) => {
  const currentslider = sliderlist.filter((el) => el._id === match.params.id);
  const currslider = currentslider[0];
  //console.log("currslider", currslider);
  const [formData, setFormData] = useState({
    titre: "",
    //photo: "",
    photoUpdated: "",
    description: "",
    etat: false,
  });
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

  useEffect(() => {
    if (currslider) {
      //console.log("currslider", currslider);

      setFormData((prevItems) => {
        return {
          ...prevItems,
          titre: currslider.titre,
          // photo: currslider.photo,
          description: currslider.description,
          id: currslider._id,
        };
      });
    }
  }, [currslider]);
  const { titre, description, etat, photoUpdated } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updateslider(formData);
  };
  const onExport = (ex) => {
    setFormData({ ...formData, photoUpdated: ex });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <AdminLayout>
        <div className="modifier-slider">
          <h1> Modifier Slider </h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Titre slider</label>
              <input type="text" placeholder="titre" name="titre" onChange={(e) => onChange(e)} value={titre} />
            </div>
            <div className="form-group">
              {currslider && currslider !== null && (
                <figure>
                  <img src={`${data.backUrl}/uploads/sliders/${currslider.photo}`} alt="" />
                </figure>
              )}
              <div className="photo-boutique-update">{etat === true && <img src={photoUpdated} alt="" />}</div>
              <div className="photo-button-group">
                {/* Open Model Here */}
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Modifier Image</h2>
                <button onClick={openModal} className="modif-button-photo">
                  modifier photo
                </button>
                <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                  <form>
                    <ImageCrop onExport={onExport} imgWidth="750" imgHeight="300" />
                  </form>
                  <button onClick={closeModal}>modifier photo</button>
                </Modal>
              </div>
            </div>
            <div className="form-group">
              <label>Description slider</label>
              <input type="text" placeholder="description" name="description" onChange={(e) => onChange(e)} value={description} />
            </div>
            <input type="submit" className="btn btn-primary" value="Modifier slider" />
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
    sliderlist: state.sliders.listslider,
  };
};

export default connect(mapStateToProps, { updateslider })(UpdateSliderAdmin);
