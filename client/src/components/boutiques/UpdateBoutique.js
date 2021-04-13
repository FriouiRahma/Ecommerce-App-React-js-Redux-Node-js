import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateboutique } from "../../actions/Boutiques";
import UserLayout from "../layout/UserLayout";
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
import data from "../../utils/default.json";
import AddStatusBoutique from "../status/AddStatusBoutique";
import AddEditorBoutique from "./AddEditorBoutique";
import StatusListeBoutique from "../status/StatusListeBoutique";
import ModalImage from "./ModalImage";
import ModalImageCouveture from "./ModalImageCouveture";
const UpdateBoutique = ({ currentBoutiqueUser, isAuthenticated, history, updateboutique, loading }) => {
  const currentBoutique = currentBoutiqueUser && currentBoutiqueUser.length !== 0 && currentBoutiqueUser[0];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    telephone: "",
    fraislivraison: "",
    photo: "",
    photoUpdated: "",
    photoUpdatedcouverture: "",
    etat: false,
    Editors: [],
  });

  /******** radio button */
  const [type, SetType] = useState();
  /******************22/09/2020****************************************************/
  // @update-picture/   Model Starts Here
  /***************************l*******************************************/

  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement("#root");

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

  function closeModal() {
    setIsOpen(false);
    setFormData({ ...formData, etat: true });
  }
  function closeModal1() {
    setIsOpen1(false);
    setFormData({ ...formData, etat: true });
  }

  useEffect(() => {
    if (currentBoutiqueUser) {
      setFormData((prevItems) => {
        return {
          ...prevItems,
          name: currentBoutique.name,
          description: currentBoutique.description,
          website: currentBoutique.website,
          telephone: currentBoutique.telephone,
          fraislivraison: currentBoutique.fraislivraison,
          Editors:
            currentBoutique &&
            currentBoutique !== null &&
            currentBoutique.editors &&
            currentBoutique.editors.length !== 0 &&
            currentBoutique.editors.map((el) => {
              return el;
            }),
          //photo: currentBoutique.photo,
          id: currentBoutique._id,
        };
      });
      SetType(currentBoutique.type);
      //setCommercielState(currentBoutique.editors && currentBoutique.editors.length !== 0 && currentBoutique.editors.map((el) => el.editor._id));
    }
  }, [currentBoutiqueUser, currentBoutique]);

  const { name, description, website, telephone, fraislivraison, photoUpdated, photoUpdatedcouverture, Editors, etat } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updateboutique({ ...formData, type }, history);
    setFormData({ ...formData, etat: false });
  };
  const onRadioChange = (e) => {
    SetType(e.target.value);
    // console.log("type", type);
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  const onExport = (ex) => {
    setFormData({ ...formData, photoUpdated: ex });
  };
  const onExport1 = (ex) => {
    setFormData({ ...formData, photoUpdatedcouverture: ex });
  };
  return (
    <div>
      <UserLayout>
        <div className="container">
          <div className="modif-boutique">
            <h1> Modifier Boutique </h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="row">
                <div className="col-lg-6  separator left-part">
                  <div className="form-group">
                    <label>Nom boutique</label>
                    <input type="text" placeholder="name" name="name" onChange={(e) => onChange(e)} value={name} />
                  </div>
                  <ul className="vente-detail-gros">
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
                  {/* <div className="form-group">
                    <input type="text" placeholder="name" name="name" onChange={(e) => onChange(e)} value={currentBoutique.type === "0" ? "Detail" : "gros"} />
                  </div> */}

                  <div className="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="description" name="description" onChange={(e) => onChange(e)} value={description} />
                  </div>
                  <div className="form-group">
                    <label>Frais de livraison</label>
                    <input type="text" placeholder="frais livraison" name="fraislivraison" onChange={(e) => onChange(e)} value={fraislivraison} />
                  </div>
                  <div className="form-group">
                    <label>Site internet</label>
                    <input type="text" placeholder="website" name="website" onChange={(e) => onChange(e)} value={website} />
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input type="text" placeholder="telephone" name="telephone" onChange={(e) => onChange(e)} value={telephone} />
                  </div>
                  <input type="submit" className="btn btn-primary" value="Update boutique" />
                </div>
                <div className="col-lg-6 right-part">
                  <div className="photo-button-group">
                    <ModalImage onExport={onExport} closeModal={closeModal} openModal={openModal} modalIsOpen={modalIsOpen} />
                    {currentBoutique && currentBoutique !== null && (
                      <div className="photo-boutique-update">
                        <figure>
                          <img src={`${data.backUrl}/uploads/${currentBoutique.photo}`} alt="" />
                        </figure>
                      </div>
                    )}
                    <div className="photo-boutique-update">{etat === true && <img src={photoUpdated} alt="" />}</div>
                  </div>
                  <div className="photo-button-group">
                    <ModalImageCouveture onExport1={onExport1} closeModal1={closeModal1} openModal1={openModal1} modalIsOpen1={modalIsOpen1} />
                    {currentBoutique && currentBoutique !== null && (
                      <div className="photo-boutique-update">
                        <figure>
                          <img src={`${data.backUrl}/uploads/${currentBoutique.photocouverture}`} alt="" />
                        </figure>
                      </div>
                    )}
                    <div className="photo-boutique-update">{etat === true && <img src={photoUpdatedcouverture} alt="" />}</div>
                  </div>
                  <AddEditorBoutique editors={Editors} idboutique={currentBoutique && currentBoutique !== null && currentBoutique._id} />
                  <StatusListeBoutique idboutique={currentBoutique && currentBoutique !== null && currentBoutique._id} />
                  <AddStatusBoutique idboutique={currentBoutique && currentBoutique !== null && currentBoutique._id} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
  currentBoutiqueUser: state.boutiques.boutiqueuser,
});
export default connect(mapStateToProps, { updateboutique })(UpdateBoutique);
