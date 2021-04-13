import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateSectionType6 } from "../../actions/sectiontype6";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import data from "../../utils/default.json";
import AdminLayout from "../layout/AdminLayout";
import screen from "../../images/screens/06.png";
import { Redirect } from "react-router-dom";
const UpdateSectionAdmin6 = ({ sectionlist6, updateSectionType6, match, isAuthenticated, loading, history }) => {
  const currentsection = sectionlist6.filter((el) => el._id === match.params.id);
  const currsection = currentsection[0];
  console.log("currsection", currsection);
  const [formData, setFormData] = useState({
    titre: "",
    name: "",
    name1: "",
    paragraphe1: "",
    image1: "",
    name2: "",
    paragraphe2: "",
    image2: "",
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
          name1: currsection.name1,
          paragraphe1: currsection.paragraphe1,
          name2: currsection.name2,
          paragraphe2: currsection.paragraphe2,
          id: currsection._id,
        };
      });
    }
  }, [currsection]);
  const { titre, name, name1, paragraphe1, image1, name2, paragraphe2, image2, etat } = formData;

  const onChangetitre = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updateSectionType6(formData, history);
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
  const onExport2 = (ex2) => {
    setFormData({ ...formData, image2: ex2 });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <AdminLayout>
        <div className="add-section6-admin">
          <h1> Modifier section </h1>

          <figure className="">
            <div className="mb-10">
              <b>Screenshot</b>
            </div>
            <img src={screen} alt="" />
          </figure>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Titre de la section</label>
              <input type="text" placeholder="titre" name="titre" value={titre || ""} onChange={(e) => onChangetitre(e)} />
            </div>
            <div className="form-group">
              <label>Nom des la section</label>
              <input type="text" placeholder="name" name="name" value={name || ""} onChange={(e) => onChangetitre(e)} />
            </div>
            <div className="form-group">
              <label>Titre pub1</label>
              <input type="text" placeholder="name1" name="name1" value={name1 || ""} onChange={(e) => onChangetitre(e)} />
            </div>
            <div className="form-group">
              <label>Paragraphe pub1</label>
              <input type="text" placeholder="paragraphe1" name="paragraphe1" value={paragraphe1 || ""} onChange={(e) => onChangetitre(e)} />
            </div>
            {currsection && currsection !== null && (
              <figure>
                <img src={`${data.backUrl}/uploads/${currsection.image1}`} alt="" />
              </figure>
            )}
            <div>
              <div className="photo-pub">
                <button onClick={openModal} className="button-add-pub">
                  Update photo publicité1
                  <br />
                  (550*250)
                </button>
                <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                  <form>
                    <ImageCrop onExport={onExport} imgWidth="550" imgHeight="250" />
                  </form>
                  <button onClick={closeModal}>Update photo publicité2</button>
                </Modal>

                <div className="img-pub">
                  {etat && (
                    <div>
                      <img src={image1} alt="" />{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Titre pub2</label>
              <input type="text" placeholder="name2" name="name2" value={name2 || ""} onChange={(e) => onChangetitre(e)} />
            </div>
            <div className="form-group">
              <label>Paragraphe pub2</label>
              <input type="text" placeholder="paragraphe2" name="paragraphe2" value={paragraphe2 || ""} onChange={(e) => onChangetitre(e)} />
            </div>
            <div>
              {currsection && currsection !== null && (
                <figure>
                  <img src={`${data.backUrl}/uploads/${currsection.image2}`} alt="" />
                </figure>
              )}
              <div className="photo-pub">
                <button onClick={openModal2} className="button-add-pub">
                  Update photo publicité3
                  <br />
                  (550*250)
                </button>
                <Modal isOpen={modalIsOpen2} onAfterOpen={afterOpenModal} onRequestClose={closeModal2} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                  <form>
                    <ImageCrop onExport={onExport2} imgWidth="550" imgHeight="250" />
                  </form>
                  <button onClick={closeModal2}>Ajouter photo publicité1</button>
                </Modal>
                <div className="img-pub">{etat && <img src={image2} className="img-product" alt="" />}</div>
              </div>
            </div>

            {/* {etat && <div><img src={image1} className='img-product' alt='' />
                               <img src={image2} className='img-product' alt='' /> 
                                   
                </div>} */}

            <input type="submit" className="btn btn-primary" value="Modifier section" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionlist6: state.sectiontype6.listsectype6,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { updateSectionType6 })(UpdateSectionAdmin6);
