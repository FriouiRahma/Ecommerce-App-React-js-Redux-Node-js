import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateSectionType3 } from "../../actions/sectiontype3";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import data from "../../utils/default.json";
import AdminLayout from "../layout/AdminLayout";
import screen from "../../images/screens/03.png";
import { Redirect } from "react-router-dom";

const UpdateSectionAdmin3 = ({ sectionlist3, match, updateSectionType3, isAuthenticated, loading, history }) => {
  const currentsection = sectionlist3.filter((el) => el._id === match.params.id);
  const currsection = currentsection[0];
  const verifyproduct = currsection && currsection !== null && currsection.productID && currsection.productID.length !== 0;
  //console.log("verify product", verifyproduct);
  const blankproduct = "";

  const [formData, setFormData] = useState({
    titre: "",
    name: "",
    productID: [],
    video: "",
    liensite1: "",
    publicite1: "",
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
          productID: verifyproduct ? currsection.productID.map((el) => el._id) : productID,
          video: currsection.video,
          id: currsection._id,
        };
      });
    }
  }, [currsection, verifyproduct]);
  const { titre, name, productID, liensite1, video, publicite1, etat } = formData;
  const addProduct = () => {
    setFormData({ ...formData, productID: [...productID, blankproduct] });
  };

  const onChange = (e, i) => {
    setFormData({
      ...formData,
      //find the input updated
      productID: productID.map((el, j) => {
        if (i === j) {
          return e.target.value;
        } else {
          return el;
        }
      }),
    });
  };
  const onChangetitre = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updateSectionType3(formData, history);
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
    setFormData({ ...formData, publicite1: ex1 });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }

  return (
    <div>
      <AdminLayout>
        <div className="add-section3-admin">
          <h1> Modifier section </h1>

          <figure className="">
            <div className="mb-10">
              <b>Screenshot</b>
            </div>
            <img src={screen} alt="" />
          </figure>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Titre section</label>
              <input type="text" placeholder="titre" name="titre" value={titre} onChange={(e) => onChangetitre(e)} />
            </div>
            <div className="form-group">
              <label>Nom section</label>
              <input type="text" placeholder="name" name="name" value={name} onChange={(e) => onChangetitre(e)} />
            </div>
            <div className="form-group">
              <label>Nom vidéo</label>
              <input type="text" placeholder="video" name="video" value={video} onChange={(e) => onChangetitre(e)} />
            </div>
            <div className="form-group">
              <label>Lien site1</label>
              <input type="text" placeholder="liensite1" name="liensite1" value={liensite1} onChange={(e) => onChangetitre(e)} />
            </div>
            <input type="button" value="+" className="btn" onClick={addProduct} />
            {productID &&
              productID.length !== 0 &&
              productID.map((el, i) => (
                <div className="form-group" key={i}>
                  <input type="text" placeholder="productID" name={`productID${i}`} value={el} data={i} onChange={(e) => onChange(e, i)} />
                </div>
              ))}

            {currsection && currsection !== null && (
              <figure>
                <img src={`${data.backUrl}/uploads/${currsection.publicite1}`} alt="" />
              </figure>
            )}
            <div className="photo-pub mb-20">
              <button onClick={openModal} className="button-add-pub">
                Ajouter photo publicité 1
                <br /> (382 * 164)
              </button>
              <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                <form>
                  <ImageCrop onExport={onExport} imgWidth="382" imgHeight="164" />
                </form>
                <button className="btn mt-20" onClick={closeModal}>
                  Ajouter photo publicité1
                </button>
              </Modal>
              <div className="img-pub">{etat && <img src={publicite1} className="img-product" alt="" />}</div>
            </div>
            <input type="submit" className="btn btn-primary" value="Modifier section" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionlist3: state.sectiontype3.listsectype3,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { updateSectionType3 })(UpdateSectionAdmin3);
