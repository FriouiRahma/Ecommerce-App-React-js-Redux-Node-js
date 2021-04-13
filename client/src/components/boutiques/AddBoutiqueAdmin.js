import React, { useState } from "react";
import { addboutadmin } from "../../actions/Boutiques";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import AdminLayout from "../layout/AdminLayout";

const AddBoutiqueAdmin = ({ addboutadmin, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    user: "",
    name: "",
    website: "",
    telephone: "",
    address: "",
    region: "",
    city: "",
    photo: "",
    etat:""
  });

  const { user, name, website, telephone, address, region, city, photo ,etat} = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    const add = await addboutadmin({
      user,
      name,
      website,
      telephone,
      address,
      region,
      city,
      photo,
      history,
    });
    if (add) {
      setFormData({
        user: "",
        name: "",
        website: "",
        telephone: "",
        address: "",
        region: "",
        city: "",
        photo: "",
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
    return <Redirect to='/login' />;
  }
  return (
    <div className='ce-form'>
      <AdminLayout>
        <div className='add-new-boutique'>
        <h1 >Ajouter un nouveau boutique</h1>
        <form onSubmit={(e) => onSubmit(e)}>
         
              <div className='form-group'>
                <label htmlFor=''>User ID</label>
                <input type='text' name='user' onChange={(e) => onChange(e)} value={user} />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Boutique Name</label>
                <input type='text' name='name' onChange={(e) => onChange(e)} value={name} />
              </div>
              <div className='form-group'>
                <label htmlFor=''>WebSite</label>
                <input type='text' name='website' onChange={(e) => onChange(e)} value={website} />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Telephone</label>
                <input
                  type='text'
                  name='telephone'
                  onChange={(e) => onChange(e)}
                  value={telephone}
                />
              </div>
              <div className='form-group'>
                <label htmlFor=''>address</label>
                <input type='text' name='address' onChange={(e) => onChange(e)} value={address} />
              </div>
              <div className='form-group'>
                <label htmlFor=''>region</label>
                <input type='text' name='region' onChange={(e) => onChange(e)} value={region} />
              </div>
              <div className='form-group'>
                <label htmlFor=''>city</label>
                <input type='text' name='city' onChange={(e) => onChange(e)} value={city} />
              </div>
                {/* Open Model Here */}
             <div className='disp-photo'   >
            
            <div>
              <button onClick={openModal} className='btn-add-photo'   >Ajouter photo</button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Example Modal'
              >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                <form>
                  <ImageCrop onExport={onExport} imgWidth='700' imgHeight='700' />
                </form>
                <button onClick={closeModal}>Ajouter photo</button>
              </Modal>
            </div>
            <div className='photo-boutique' >
             {etat === true && <img src={photo} alt='' />}
             </div>
            </div>
              <input type='submit' className='btn btn-primary' value='Add boutique' />


            {/* <div className='col-md-6 pl-65'>
              <ImageCrop onExport={onExport} imgWidth='700' imgHeight='700' />
            </div> */}
          
        </form>
        </div>
      </AdminLayout>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
});

export default connect(mapStateToProps, { addboutadmin })(AddBoutiqueAdmin);
