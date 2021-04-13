import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateSectionType4 } from "../../actions/sectiontype4";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import data from "../../utils/default.json";
import AdminLayout from "../layout/AdminLayout";
import screen from "../../images/screens/04.png";
import { Redirect } from "react-router-dom";

const UpdateSectionAdmin4 = ({ sectionlist4, match, updateSectionType4, isAuthenticated, loading, history }) => {
  const currentsection = sectionlist4.filter((el) => el._id === match.params.id);
  const currsection = currentsection[0];
  const [formData, setFormData] = useState({
    titre: "",
    name: "",
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
          id: currsection._id,
        };
      });
    }
  }, [currsection]);
  const { titre, name, image, etat } = formData;

  const onChangetitre = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updateSectionType4(formData, history);
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

  const onExport = (ex1) => {
    setFormData({ ...formData, image: ex1 });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to='/login' />;
  }
  return (
    <div>
      <AdminLayout>
        <div className='add-section4-admin'>
          <h1> Modifier section </h1>

          <figure className=''>
            <div className='mb-10'>
              <b>Screenshot</b>
            </div>
            <img src={screen} alt='' />
          </figure>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label>Titre de la sectioon </label>
              <input type='text' placeholder='titre' name='titre' value={titre} onChange={(e) => onChangetitre(e)} />
            </div>
            <div className='form-group'>
              <label>Nom de la section</label>
              <input type='text' placeholder='name' name='name' value={name} onChange={(e) => onChangetitre(e)} />
            </div>

            {currsection && currsection !== null && (
              <figure>
                <img src={`${data.backUrl}/uploads/${currsection.image}`} alt='' />
              </figure>
            )}

            <div>
              <div className='photo-pub'>
                <div>
                  <button onClick={openModal} className='button-add-pub mb-15'>
                    Ajouter photo publicité1
                    <br />
                    (1175*250)
                  </button>
                  <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel='Example Modal'>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                    <form>
                      <ImageCrop onExport={onExport} imgWidth='1175' imgHeight='250' />
                    </form>
                    <button onClick={closeModal}>Ajouter photo publicité1</button>
                  </Modal>
                  <div className='img-pub'>{etat && <img src={image} alt='' />}</div>
                </div>
              </div>
            </div>

            <input type='submit' className='btn btn-primary' value='Modifier section' />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionlist4: state.sectiontype4.listsectype4,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { updateSectionType4 })(UpdateSectionAdmin4);
