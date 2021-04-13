import React, { useState } from "react";
import { connect } from "react-redux";
import { addsection6 } from "../../actions/sectiontype6";
import AdminLayout from "../layout/AdminLayout";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import screen from "../../images/screens/06.png";
import { Redirect } from "react-router-dom";
const AddSection_Type6 = ({ addsection6, listproduit, isAuthenticated, loading, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    titre: "",
    name1: "",
    paragraphe1: "",
    image1: "",
    name2: "",
    paragraphe2: "",
    image2: "",
    etat: "",
  });

  const { name, titre, name1, paragraphe1, image1, name2, paragraphe2, image2, etat } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();

    addsection6({ name, titre, name1, paragraphe1, image1, name2, paragraphe2, image2, history });
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
        <div className="add-section6-admin">
          <h1>Ajouter section type6</h1>

          <figure className="">
            <div className="mb-10">
              <b>Screenshot</b>
            </div>
            <img src={screen} alt="" />
          </figure>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="">Name section</label>
              <input type="text" name="name" onChange={(e) => onChange(e)} value={name} />
            </div>
            <div className="form-group">
              <label htmlFor="">Title section</label>
              <input type="text" name="titre" onChange={(e) => onChange(e)} value={titre} />
            </div>
            <div className="form-group">
              <label htmlFor="">Title1</label>
              <input type="text" name="name1" onChange={(e) => onChange(e)} value={name1} />
            </div>
            <div className="form-group">
              <label htmlFor="">Paragraphe</label>
              <input type="text" name="paragraphe1" onChange={(e) => onChange(e)} value={paragraphe1} />
            </div>
            <div className="photo-pub">
              <div>
                <button onClick={openModal} className="button-add-pub">
                  Ajouter photo publicité1
                  <br/>
                  (550*250)
                </button>
                <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                  <form>
                    <ImageCrop onExport={onExport} imgWidth="550" imgHeight="250" />
                  </form>
                  <button onClick={closeModal}>Ajouter photo publicité1</button>
                </Modal>
              </div>
              <div className="img-pub">{etat && <img src={image1} alt="" />}</div>
            </div>
            <div className="form-group">
              <label htmlFor="">Title2</label>
              <input type="text" name="name2" onChange={(e) => onChange(e)} value={name2} />
            </div>
            <div className="form-group">
              <label htmlFor="">Paragraphe2</label>
              <input type="text" name="paragraphe2" onChange={(e) => onChange(e)} value={paragraphe2} />
            </div>
            <div className="photo-pub">
              <div>
                <button onClick={openModal2} className="button-add-pub">
                  Ajouter photo publicité2
                  <br/>
                  (550*250)
                </button>
                <Modal isOpen={modalIsOpen2} onAfterOpen={afterOpenModal2} onRequestClose={closeModal2} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter photo publicité2</h2>
                  <form>
                    <ImageCrop onExport={onExport2} imgWidth="550" imgHeight="250" />
                  </form>
                  <button onClick={closeModal2}>Ajouter photo publicité2</button>
                </Modal>
              </div>
              <div className="img-pub">{etat && <img src={image2} alt="" />}</div>
            </div>

            <input type="submit" className="btn btn-primary mt-20" value="Ajouter Section" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listproduit: state.produits.listprod,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { addsection6 })(AddSection_Type6);
