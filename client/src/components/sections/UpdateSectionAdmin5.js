import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateSectionType5 } from "../../actions/sectiontype5";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import data from "../../utils/default.json";
import AdminLayout from "../layout/AdminLayout";
import screen from "../../images/screens/05.png";
import { Redirect } from "react-router-dom";
const UpdateSectionAdmin5 = ({ sectionlist5, updateSectionType5, match, isAuthenticated, loading, history }) => {
  const currentsection = sectionlist5.filter((el) => el._id === match.params.id);
  const currsection = currentsection[0];
  console.log("currsection", currsection);
  const [formData, setFormData] = useState({
    titre: "",
    name: "",
    liensite1: "",
    publicite1: "",
    liensite2: "",
    publicite2: "",
    liensite3: "",
    publicite3: "",
    image: "",
    etat: "",
  });
  useEffect(() => {
    if (currsection) {
      //console.log("currsection", currsection);

      setFormData((prevItems) => {
        return {
          ...prevItems,
          titre: currsection.titre,
          name: currsection.name,
          liensite1: currsection.liensite1,
          liensite2: currsection.liensite2,
          liensite3: currsection.liensite3,
          id: currsection._id,
        };
      });
    }
  }, [currsection]);
  const { titre, name, liensite1, publicite1, liensite2, publicite2, liensite3, publicite3, etat } = formData;

  const onChangetitre = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updateSectionType5(formData, history);
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
  const [modalIsOpen3, setIsOpen3] = React.useState(false);
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
  function openModal3(e) {
    e.preventDefault();
    setIsOpen3(true);
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
  function closeModal2() {
    setIsOpen2(false);
    setFormData({ ...formData, etat: true });
  }
  function closeModal3() {
    setIsOpen3(false);
    setFormData({ ...formData, etat: true });
  }

  const onExport = (ex1) => {
    setFormData({ ...formData, publicite1: ex1 });
  };
  const onExport2 = (ex2) => {
    setFormData({ ...formData, publicite2: ex2 });
  };
  const onExport3 = (ex3) => {
    setFormData({ ...formData, publicite3: ex3 });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <AdminLayout>
        <div className="add-section5-admin">
          <h1> Modifier section</h1>

          <figure className="">
            <div className="mb-10">
              <b>Screenshot</b>
            </div>
            <img src={screen} alt="" />
          </figure>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Titre section</label>
              <input type="text" placeholder="titre" name="titre" value={titre || ""} onChange={(e) => onChangetitre(e)} />
            </div>
            <div className="form-group">
              <label>Nom section</label>
              <input type="text" placeholder="name" name="name" value={name || ""} onChange={(e) => onChangetitre(e)} />
            </div>

            <div>
              <div className="form-group">
                <label>Lien pub1</label>
                <input type="text" placeholder="lien-site1" name="liensite1" value={liensite1 || ""} onChange={(e) => onChangetitre(e)} />
              </div>
              <div className="update-image">
                <div className="photo-pub">
                  <button onClick={openModal} className="button-add-pub">
                    Update photo publicité1
                    <br />
                    (400*400)
                  </button>
                  <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                    <form>
                      <ImageCrop onExport={onExport} imgWidth="400" imgHeight="400" />
                    </form>
                    <button onClick={closeModal}>Update photo publicité2</button>
                  </Modal>
                  <div className="img-pub">{etat && <img src={publicite1} alt="" />}</div>
                </div>
                <figure>{currsection && currsection !== null && <img style={{ width: "150px" }} src={`${data.backUrl}/uploads/${currsection.publicite1}`} alt="" />}</figure>
              </div>

              <div className="form-group">
                <label>Lien pub2</label>
                <input type="text" placeholder="lien-site2" name="liensite2" value={liensite2 || ""} onChange={(e) => onChangetitre(e)} />
              </div>
              <div className="update-image">
                <div className="photo-pub">
                  <button onClick={openModal2} className="button-add-pub">
                    Update photo publicité3
                    <br/>
                    (400*400)
                  </button>
                  <Modal isOpen={modalIsOpen2} onAfterOpen={afterOpenModal} onRequestClose={closeModal2} style={customStyles} contentLabel="Example Modal">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                    <form>
                      <ImageCrop onExport={onExport2} imgWidth="400" imgHeight="400" />
                    </form>
                    <button onClick={closeModal2}>Ajouter photo publicité1</button>
                  </Modal>
                  <div className="img-pub">{etat && <img src={publicite2} alt="" />}</div>
                </div>
                <figure>{currsection && currsection !== null && <img style={{ width: "150px" }} src={`${data.backUrl}/uploads/${currsection.publicite2}`} alt="" />}</figure>
              </div>
              <div className="form-group">
                <label>Lien Pub3</label>
                <input type="text" placeholder="lien-site3" name="liensite3" value={liensite3 || ""} onChange={(e) => onChangetitre(e)} />
              </div>
              <div className="update-image">
                <div className="photo-pub">
                  <button onClick={openModal3} className="button-add-pub">
                    Ajouter photo publicité3
                    <br/>
                    (400*400)
                  </button>
                  <Modal isOpen={modalIsOpen3} onAfterOpen={afterOpenModal} onRequestClose={closeModal3} style={customStyles} contentLabel="Example Modal">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                    <form>
                      <ImageCrop onExport={onExport3} imgWidth="400" imgHeight="400" />
                    </form>
                    <button onClick={closeModal3}>Ajouter photo publicité1</button>
                  </Modal>
                  <div className="img-pub">{etat && <img src={publicite3} alt="" />}</div>
                </div>
                <figure>{currsection && currsection !== null && <img style={{ width: "150px" }} src={`${data.backUrl}/uploads/${currsection.publicite3}`} alt="" />}</figure>
              </div>
            </div>

            <input type="submit" className="btn btn-primary" value="Update section" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionlist5: state.sectiontype5.listsectype5,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { updateSectionType5 })(UpdateSectionAdmin5);
