import React, { useState } from "react";
import { addBoutique } from "../../actions/Boutiques";
import { connect } from "react-redux";
import Modal from "react-modal";
import { Redirect } from "react-router-dom";
import ImageCrop from "../helpers/ImageCrop";

const AddBoutique = ({ addBoutique, isAuthenticated, loading, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    telephone: "",
    address: "",
    region: "",
    city: "",
    photo: "",
    photocouverture: "",
    fraislivraison: "",
    etat: "",
  });
  //recupèrer data from state
  const { name, description, website, telephone, address, region, city, photo, photocouverture, fraislivraison, etat } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    const add = await addBoutique({
      name,
      description,
      website,
      telephone,
      address,
      region,
      city,
      photo,
      photocouverture,
      type,
      fraislivraison,
      history,
    });
    if (add) {
      setFormData({
        name: "",
        description: "",
        website: "",
        telephone: "",
        address: "",
        region: "",
        city: "",
        photo: "",
        photocouverture: "",
      });
    }
  };
  /******** radio button */
  const [type, SetType] = useState("0");

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
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
    setFormData({ ...formData, etat: false });
  }
  function openModal1(e) {
    e.preventDefault();
    setIsOpen1(true);
    setFormData({ ...formData, etat: false });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function afterOpenModal1() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
    setFormData({ ...formData, etat: true });
  }
  function closeModal1() {
    setIsOpen1(false);
    setFormData({ ...formData, etat: true });
  }

  const onExport = (ex) => {
    setFormData({ ...formData, photo: ex });
  };
  const onExport1 = (ex) => {
    setFormData({ ...formData, photocouverture: ex });
  };

  const onRadioChange = (e) => {
    SetType(e.target.value);
    console.log("type", type);
  };

  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div className="ce-form">
      <div className="container">
        <div className="add-boutique">
          <h1>Ajouter boutique</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row">
              <div className="col-md-6 separator pr-65">
                <div className="form-group">
                  <label htmlFor="">Boutique Name</label>
                  <input type="text" name="name" onChange={(e) => onChange(e)} value={name} />
                </div>
                <ul>
                  <li>
                    <label>
                      <input type="radio" value="0" checked={type === "0"} onChange={onRadioChange} />
                      <span>Detail</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" value="1" checked={type === "1"} onChange={onRadioChange} />
                      <span>gros</span>
                    </label>
                  </li>
                </ul>
                <div className="form-group">
                  <label htmlFor="">Frais de livraison</label>
                  <input type="text" name="fraislivraison" onChange={(e) => onChange(e)} value={fraislivraison} />
                </div>
                <div className="form-group">
                  <label htmlFor="">Description boutique</label>
                  <input type="text" name="description" onChange={(e) => onChange(e)} value={description} />
                </div>
                <div className="form-group">
                  <label htmlFor="">WebSite</label>
                  <input type="text" name="website" onChange={(e) => onChange(e)} value={website} />
                </div>
                <div className="form-group">
                  <label htmlFor="">Telephone</label>
                  <input type="text" name="telephone" onChange={(e) => onChange(e)} value={telephone} />
                </div>
                <div className="form-group">
                  <label htmlFor="">address</label>
                  <input type="text" name="address" onChange={(e) => onChange(e)} value={address} />
                </div>
                <div className="form-group">
                  <label htmlFor="">region</label>
                  <input type="text" name="region" onChange={(e) => onChange(e)} value={region} />
                </div>
                <div className="form-group">
                  <label htmlFor="">city</label>
                  <input type="text" name="city" onChange={(e) => onChange(e)} value={city} />
                </div>
                <input type="submit" className="btn btn-primary" value="Ajouter boutique" />
              </div>

              <div className="col-md-6 pl-65">
                {/* Open Model Here */}
                <div className="image-button-group">
                  <div>
                    <button onClick={openModal} className="button-add-boutique">
                      Ajouter photo
                    </button>
                    <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>hello</h2>
                      <form>
                        <ImageCrop onExport={onExport} imgWidth="700" imgHeight="700" />
                      </form>
                      <button onClick={closeModal}>Ajouter photo</button>
                    </Modal>
                  </div>
                  <div>
                    <button onClick={openModal1} className="button-add-boutique">
                      Ajouter photo couverture
                    </button>
                    <Modal isOpen={modalIsOpen1} onAfterOpen={afterOpenModal1} onRequestClose={closeModal1} style={customStyles} contentLabel="Example Modal">
                      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>hello</h2>
                      <form>
                        <ImageCrop onExport={onExport1} imgWidth="750" imgHeight="300" />
                      </form>
                      <button onClick={closeModal1}>Ajouter photo</button>
                    </Modal>
                  </div>

                  <div className="image-produit">{etat === true && <img src={photo} alt="" />}</div>
                  <div className="image-produit">{etat === true && <img src={photocouverture} alt="" />}</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,

});

export default connect(mapStateToProps, { addBoutique })(AddBoutique);
