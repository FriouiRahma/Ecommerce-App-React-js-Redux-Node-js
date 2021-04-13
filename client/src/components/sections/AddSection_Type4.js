import React, { useState } from "react";
import { connect } from "react-redux";
import AdminLayout from "../layout/AdminLayout";
import { addsection4 } from "../../actions/sectiontype4";
import Modal from "react-modal";
import ImageCrop from "../helpers/ImageCrop";
import { Redirect } from "react-router-dom";
import screen from "../../images/screens/04.png";

export const AddSection_Type4 = ({ addsection4, isAuthenticated, loading, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    titre: "",
    liensite: "",
    image: "",
    etat: "",
  });
  const { name, titre, liensite, image, etat } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    setFormData({ ...formData, image: ex });
  };

  if (!isAuthenticated) {
    if (!loading) return <Redirect to='/login' />;
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    addsection4({ name, titre, liensite, image, history });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to='/login' />;
  }
  return (
    <div>
      <AdminLayout>
        <div className='add-section4-admin'>
          <h1>Ajouter section type4</h1>

          <figure className=''>
            <div className='mb-10'>
              <b>Screenshot</b>
            </div>
            <img src={screen} alt='' />
          </figure>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label htmlFor=''>Nom section</label>
              <input type='text' name='name' onChange={(e) => onChange(e)} value={name} />
            </div>
            <div className='form-group'>
              <label htmlFor=''>Titre section</label>
              <input type='text' name='titre' onChange={(e) => onChange(e)} value={titre} />
            </div>
            <div className='form-group'>
              <label htmlFor=''>Lien de site</label>
              <input type='text' name='liensite' onChange={(e) => onChange(e)} value={liensite} />
            </div>
            <div>
              {/* Open Model Here */}
              <div className='photo-pub'>
                <div>
                  <button onClick={openModal} className='button-add-pub mb-15'>
                    Ajouter photo
                    <br />
                    (1175*250)
                  </button>
                  <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel='Example Modal'>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                    <form>
                      <ImageCrop onExport={onExport} imgWidth='1175' imgHeight='250' />
                    </form>
                    <button onClick={closeModal}>Ajouter photo</button>
                  </Modal>
                  <div className='img-pub'>{etat === true && <img src={image} alt='' />}</div>
                </div>
              </div>
            </div>
            <input type='submit' className='btn btn-primary mt-20' value='Ajouter Section' />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
});

export default connect(mapStateToProps, { addsection4 })(AddSection_Type4);
