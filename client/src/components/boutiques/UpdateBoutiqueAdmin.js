import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AdminLayout from "../layout/AdminLayout";
import ImageCrop from "../helpers/ImageCrop";
import { updateboutadmin } from "../../actions/Boutiques";
import { Redirect } from "react-router-dom";
import data from "../../utils/default.json";
import Modal from "react-modal";
const UpdateBoutiqueAdmin = ({ boutiquelist, match, history, updateboutadmin, isAuthenticated, loading }) => {
  const currentboutique = boutiquelist.filter((el) => el._id === match.params.id);
  const currubout = currentboutique[0];
  //console.log("currubout", currubout);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    telephone: "",
    etat: "",
    photoUpdated: "",
    //photo: "",
  });

  useEffect(() => {
    if (currubout) {
      //console.log("curruser", currubout);

      setFormData((prevItems) => {
        return {
          ...prevItems,
          name: currubout.name,
          website: currubout.website,
          telephone: currubout.telephone,
          //photo: currubout.photo,
          id: currubout._id,
        };
      });
    }
  }, [currubout]);
  const { name, website, telephone, etat, photoUpdated } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    updateboutadmin(formData, history);
  };
  // const onExport = (ex) => {
  //   setFormData({ ...formData, photoUpdated: ex });
  // };
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
    setFormData({ ...formData, photoUpdated: ex });
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <AdminLayout>
        <div className="add-new-boutique">
          <h1> Modifier le boutique de l'Utilisateur </h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input type="text" placeholder="name" name="name" onChange={(e) => onChange(e)} value={name} />
            </div>

            <div className="form-group">
              <input type="text" placeholder="website" name="website" onChange={(e) => onChange(e)} value={website} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="telephone" name="telephone" onChange={(e) => onChange(e)} value={telephone} />
            </div>

            <div className="phototoupdate">
              {/* Open Model Here */}
              <div className="disp-photo">
                <div>
                  <button onClick={openModal} className="btn-add-photo">
                    Ajouter photo
                  </button>
                  <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                    <form>
                      <ImageCrop onExport={onExport} imgWidth="700" imgHeight="700" />
                    </form>
                    <button onClick={closeModal}>Ajouter photo</button>
                  </Modal>
                </div>
                <div className="photo-boutique">{etat === true && <img src={photoUpdated} alt="" />}</div>
              </div>
              {currubout && currubout !== null && (
                <figure>
                  <img style={{ width: "150px" }} src={`${data.backUrl}/uploads/${currubout.photo}`} alt="" />
                </figure>
              )}
            </div>

            {/* <ImageCrop onExport={onExport} imgWidth='700' imgHeight='700' /> */}
            <input type="submit" className="btn btn-primary" value="Modifier boutique" />
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
    boutiquelist: state.boutiques.boutuseradm,
  };
};

export default connect(mapStateToProps, { updateboutadmin })(UpdateBoutiqueAdmin);
