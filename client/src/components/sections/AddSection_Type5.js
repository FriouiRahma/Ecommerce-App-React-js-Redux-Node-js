import React, { useState } from "react";
import { connect } from "react-redux";
import { addsection5 } from "../../actions/sectiontype5";
import AdminLayout from "../layout/AdminLayout";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import screen from "../../images/screens/05.png";
import { Redirect } from "react-router-dom";
const AddSection_Type5 = ({ addsection5, listproduit, isAuthenticated, loading, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    titre: "",
    liensite1: "",
    publicite1: "",
    liensite2: "",
    publicite2: "",
    liensite3: "",
    publicite3: "",
    etat: "",
  });

  const { name, titre, liensite1, publicite1, liensite2, publicite2, liensite3, publicite3, etat } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();

    addsection5({ name, titre, liensite1, publicite1, liensite2, publicite2, liensite3, publicite3, history });
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
  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function afterOpenModal3() {
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
  const onExport2 = (ex) => {
    setFormData({ ...formData, publicite2: ex });
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
          <h1>Ajouter section type5</h1>

          <figure className="">
            <div className="mb-10">
              <b>Screenshot</b>
            </div>
            <img src={screen} alt="" />
          </figure>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="">Nom section</label>
              <input type="text" name="name" onChange={(e) => onChange(e)} value={name} />
            </div>
            <div className="form-group">
              <label htmlFor="">Titre section</label>
              <input type="text" name="titre" onChange={(e) => onChange(e)} value={titre} />
            </div>
            {/* modal1 start here */}

            <div className="form-group">
              <label htmlFor="">Lien pub1</label>
              <input type="text" name="liensite1" onChange={(e) => onChange(e)} value={liensite1} />
            </div>
            <div className="photo-pub">
              <div>
                <button onClick={openModal} className="button-add-pub">
                  Ajouter photo publicité1
                  <br />
                  (400*400)
                </button>
                <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                  <form>
                    <ImageCrop onExport={onExport} imgWidth="400" imgHeight="400" />
                  </form>
                  <button onClick={closeModal}>Ajouter photo publicité1</button>
                </Modal>
              </div>
              <div className="img-pub">{etat && <img src={publicite1} alt="" />}</div>
            </div>
            {/* modal2 start here */}
            <div className="form-group">
              <label htmlFor="">Lien pub2</label>
              <input type="text" name="liensite2" onChange={(e) => onChange(e)} value={liensite2} />
            </div>
            <div className="photo-pub">
              <div>
                <button onClick={openModal2} className="button-add-pub">
                  Ajouter photo publicité2
                  <br />
                  (400*400)
                </button>
                <Modal isOpen={modalIsOpen2} onAfterOpen={afterOpenModal2} onRequestClose={closeModal2} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>ajouter pub3</h2>
                  <form>
                    <ImageCrop onExport={onExport2} imgWidth="400" imgHeight="400" />
                  </form>
                  <button onClick={closeModal2}>Ajouter photo publicité2</button>
                </Modal>
              </div>
              <div className="img-pub">{etat && <img src={publicite2} alt="" />}</div>
            </div>
            {/* model3 starts here */}
            <div className="form-group">
              <label htmlFor="">Lien pub3</label>
              <input type="text" name="liensite3" onChange={(e) => onChange(e)} value={liensite3} />
            </div>
            <div>
              <div className="photo-pub">
                <div>
                  <button onClick={openModal3} className="button-add-pub">
                    Ajouter photo publicité3
                    <br />
                    (400*400)
                  </button>
                  <Modal isOpen={modalIsOpen3} onAfterOpen={afterOpenModal3} onRequestClose={closeModal3} style={customStyles} contentLabel="Example Modal">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>ajouter pub3</h2>
                    <form>
                      <ImageCrop onExport={onExport3} imgWidth="400" imgHeight="400" />
                    </form>
                    <button onClick={closeModal3}>Ajouter photo publicité3</button>
                  </Modal>
                </div>
                <div className="img-pub">{etat && <img src={publicite3} alt="" />}</div>
              </div>
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

export default connect(mapStateToProps, { addsection5 })(AddSection_Type5);
