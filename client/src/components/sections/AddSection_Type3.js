import React, { useState } from "react";
import { connect } from "react-redux";
import { addsection3 } from "../../actions/sectiontype3";
import AdminLayout from "../layout/AdminLayout";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import screen from "../../images/screens/03.png";
const AddSection_Type3 = ({ addsection3, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    titre: "",
    video: "",
    phototoadd: "",
    photo: "",
    liensite1: "",
    publicite1: "",
    liensite2: "",
    publicite2: "",
    etat: "",
  });

  // Add dynamic input item
  const blankproduct = null;
  const [productState, setProductState] = useState([blankproduct]);
  const productID = productState;
  //const verifyproductID=productID.map()
  const addProduct = () => {
    setProductState([...productState, blankproduct]);
  };
  const handleProdChange = (e) => {
    const updatedProducts = [...productState];
    updatedProducts[e.target.dataset.idx] = e.target.value;
    setProductState(updatedProducts);
  };

  const { name, titre, video, liensite1, publicite1, liensite2, publicite2, etat } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();

    addsection3({
      name,
      titre,
      productID,
      video,
      liensite1,
      publicite1,
      liensite2,
      publicite2,
      history,
    });
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
  const onExport2 = (ex) => {
    setFormData({ ...formData, publicite2: ex });
  };

  return (
    <div>
      <AdminLayout>
        <div className="add-section3-admin">
          <h1>Ajouter section type3</h1>

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
              <label htmlFor="">Ajouter vidéo</label>
              <input type="text" name="video" onChange={(e) => onChange(e)} value={video} />
            </div>
            {/* modal1 start here */}

            <div className="form-group">
              <label htmlFor="">Lien pub1</label>
              <input type="text" name="liensite1" onChange={(e) => onChange(e)} value={liensite1} />
            </div>
            <div className="photo-pub">
              <div className="">
                <button onClick={openModal} className="button-add-pub">
                  Ajouter photo publicité
                  <br /> (382 * 164)
                </button>
                <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter photo publicité 1</h2>
                  <form>
                    <ImageCrop onExport={onExport} imgWidth="382" imgHeight="164" />
                  </form>
                  <button className="btn mt-20" onClick={closeModal}>
                    Ajouter photo publicité 1
                  </button>
                </Modal>
              </div>
              <div className="img-pub">{etat && <img src={publicite1} alt="" />}</div>
            </div>
            <input type="button" value="+" className="btn" onClick={addProduct} />
            {productState.map((val, idx) => {
              const prodId = `product-${idx}`;
              return (
                <div key={idx}>
                  <label htmlFor="">ID Produit</label>
                  <input type="text" name="product" data-idx={idx} id={prodId} className="product" onChange={handleProdChange} />
                </div>
              );
            })}
            <input type="submit" className="btn btn-primary mt-20" value="Add Section" />
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

export default connect(mapStateToProps, { addsection3 })(AddSection_Type3);
