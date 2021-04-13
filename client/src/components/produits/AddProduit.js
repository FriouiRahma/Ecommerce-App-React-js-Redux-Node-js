import React, { useState, useEffect } from "react";
import { addProduit } from "../../actions/Produit";
import { loadCategories } from "../../actions/categories";
import { connect } from "react-redux";
import ImageCrop from "../helpers/ImageCrop";
import Modal from "react-modal";
import closeIcon from "../../icons/close-icon.svg";
import UserLayout from "../layout/UserLayout";
import { Accordion, Card, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const AddProduit = ({ addProduit, isAuthenticated, loading, categoriess, boutiqueu, history }) => {
  const parentCategorie = categoriess && categoriess.length !== 0 && categoriess.filter((el) => el.parent === "0");

  /** Modal start */
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

    photo && photo !== "" && setFormData({ ...formData, phototoadd: [...phototoadd, photo], etat: true });
    //setFormData({ ...formData, etat: true });
  }

  /*** end Modal  */

  useEffect(() => {
    //dispatch action loadBoutiques to the back
    loadCategories();
    //console.log("caractItems", caractItems);
  }, [boutiqueu, categoriess]);

  const Checkbox = ({ type = "checkbox", id, name, checked = false, onChange }) => {
    return <input type={type} value={id} id={id} name={name} checked={checked} onChange={onChange} />;
  };

  const onExport = (ex) => {
    setFormData({ ...formData, photo: ex });
  };

  const [checkedItems, setCheckedItems] = useState({});
  const [options] = useState({
    tabid: [],
  });
  const { tabid } = options;
  //console.log("tabid", tabid);
  const handleChange = (event) => {
    // const updatedCheked = [...checkedItems];
    // updatedCheked[event.target.dataset.id] = event.target.checked;
    // setCheckedItems(updatedCheked);

    setCheckedItems({
      ...checkedItems,
      [event.target.id]: event.target.checked,
    });
    if (event.target.checked) {
      tabid.push(event.target.value);
    } else {
      const index = tabid.indexOf(event.target.id);
      tabid.splice(index, 1);
    }
    console.log("checkedItemscategorie: ", checkedItems);
  };

  // const deletedefaultpic = () => {
  //   setFormData({ ...formData, imageproduit: "" });
  // };

  const deletepicture = (index) => {
    setFormData({ ...formData, phototoadd: phototoadd.filter((el, id) => id !== index) });
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tarifpromo: "",
    codeabarre: "",
    quantitestock: "",
    phototoadd: [],
    photo: "",
    etat: false,
  });

  const { name, description, price, tarifpromo, codeabarre, quantitestock, imageproduit, phototoadd, photo, etat } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  //caracteristique

  const emptyGroup = { libelle: "", value: [""] };
  const [caractItems, setCaractItems] = useState([]);
  const addCaractGroup = () => {
    setCaractItems([...caractItems, emptyGroup]);
  };

  const addCaractValueItem = (e) => {
    e.preventDefault();
    const updatedCaract = [...caractItems];
    updatedCaract[e.target.dataset.idxb]["value"].push("");
    console.log("e.target.dataset.idx", e.target.dataset.idx);
    setCaractItems(updatedCaract);
  };

  const handleCaractChange = (e) => {
    const updatedCaract = [...caractItems];
    if (e.target.dataset.type === "libelle") updatedCaract[e.target.dataset.idx]["libelle"] = e.target.value;
    if (e.target.dataset.type === "value") updatedCaract[e.target.dataset.idx]["value"][e.target.dataset.id] = e.target.value;

    setCaractItems(updatedCaract);
  };
  // console.log("caractItems", caractItems);

  const onSubmit = async (e) => {
    e.preventDefault();
    //here is the default
    //console.log(boutiqueu[0]._id);
    const boutique = boutiqueu && boutiqueu.length !== 0 && boutiqueu[0]._id;
    addProduit(
      {
        boutique,
        name,
        description,
        price,
        tarifpromo,
        codeabarre,
        quantitestock,
        categories: tabid,
        caracteristique: caractItems,
        imageproduit,
        photo: phototoadd,
      },
      history
    );
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <UserLayout>
        <div className="container">
          <div className="add-product-boutique">
            <h1>Ajouter produit</h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="row">
                <div className="col-md-6  part-left">
                  <div className="form-group">
                    <label htmlFor="">Nom du produit:</label>
                    <input type="text" name="name" onChange={(e) => onChange(e)} value={name} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Description:</label>
                    <textarea type="text" rows="5" name="description" onChange={(e) => onChange(e)} value={description} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Prix:</label>
                    <input type="text" name="price" onChange={(e) => onChange(e)} value={price} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Tarif Promo</label>
                    <input type="text" name="tarifpromo" onChange={(e) => onChange(e)} value={tarifpromo} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Référence</label>
                    <input type="text" name="codeabarre" onChange={(e) => onChange(e)} value={codeabarre} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Quantité en stock</label>
                    <input type="text" name="quantitestock" onChange={(e) => onChange(e)} value={quantitestock} />
                  </div>

                  <input type="button" value="Ajouter Caractéristiques" className="btn mb-20" onClick={addCaractGroup} />
                  <div className="row">
                    {caractItems &&
                      caractItems.map((val, idx) => {
                        const cvalue = val.value;
                        return (
                          <div key={idx} className="col-md-6">
                            <div className="group-items">
                              <label htmlFor="">Libelle</label>
                              <input type="text" name="libelle" data-idx={idx} data-type="libelle" onChange={handleCaractChange} />

                              {cvalue &&
                                cvalue.map((el, id) => {
                                  return (
                                    <div key={`val-${idx}-${id}`} className="pl-20">
                                      <label htmlFor="">Val</label>
                                      <input type="text" name="val" data-type="value" data-idx={idx} data-id={id} onChange={handleCaractChange} />
                                    </div>
                                  );
                                })}
                              <button className="btn mt-10" data-idxb={idx} onClick={addCaractValueItem}>
                                Add Val
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="">Categories</label>
                  <div className="categories-acc">
                    <Accordion>
                      {parentCategorie &&
                        parentCategorie.length !== 0 &&
                        parentCategorie.map((item, index) => {
                          const souscat = categoriess.filter((el) => el.parent === item._id);
                          return (
                            <Card key={index}>
                              <Card.Header>
                                <div className="check-group">
                                  <Checkbox name={item.name} checked={checkedItems[item._id]} onChange={handleChange} id={item._id} />
                                  <label htmlFor={item._id}>{item.name}</label>
                                </div>

                                <Accordion.Toggle as={Button} variant="link" eventKey={`acc_${index}`}></Accordion.Toggle>
                              </Card.Header>
                              <Accordion.Collapse eventKey={`acc_${index}`}>
                                <Card.Body>
                                  <Accordion>
                                    {souscat &&
                                      souscat.length !== 0 &&
                                      souscat.map((sucat, index) => {
                                        const sussouscat = categoriess.filter((susucat) => susucat.parent === sucat._id);
                                        return (
                                          <Card key={index}>
                                            <Card.Header>
                                              <div className="check-group">
                                                <Checkbox name={sucat.name} checked={checkedItems[sucat._id]} onChange={handleChange} id={sucat._id} />
                                                <label htmlFor={sucat._id}>{sucat.name}</label>
                                              </div>
                                              <Accordion.Toggle as={Button} variant="link" eventKey={`subacc_${index}`}></Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={`subacc_${index}`}>
                                              <Card.Body>
                                                {sussouscat &&
                                                  sussouscat.length !== 0 &&
                                                  sussouscat.map((el) => {
                                                    return (
                                                      <div key={el._id} className="card-header">
                                                        <div className="check-group">
                                                          <Checkbox name={el.name} checked={checkedItems[el._id]} onChange={handleChange} id={el._id} />
                                                          <label htmlFor={el._id}>{el.name}</label>
                                                        </div>
                                                      </div>
                                                    );
                                                  })}
                                              </Card.Body>
                                            </Accordion.Collapse>
                                          </Card>
                                        );
                                      })}
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          );
                        })}
                    </Accordion>
                  </div>

                  {/* Open Model Here */}
                  <div className="photos-produit">
                    <button onClick={openModal} className="button-add-photo">
                      Ajouter photo
                    </button>
                    <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>

                      <form>
                        <ImageCrop onExport={onExport} imgWidth="700" imgHeight="700" />
                      </form>
                      <button onClick={closeModal}>Ajouter photo</button>
                    </Modal>

                    {etat &&
                      phototoadd &&
                      phototoadd !== 0 &&
                      phototoadd.map((el, index) => (
                        <div className="productItem" key={index}>
                          <img src={closeIcon} alt="" className="closeIcon" onClick={() => deletepicture(index)} />
                          <img src={el} className="img-product" alt="" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <input type="submit" className="btn btn-primary" value="Ajouter produit" />
            </form>
            {/* {etat && imageproduit !== "" && (
        <div className='productItem'>
          <img src={closeIcon} alt='' className='closeIcon' onClick={deletedefaultpic} />
          <img src={imageproduit} alt='' />
        </div>
      )} */}
          </div>
        </div>
      </UserLayout>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
  boutiqueu: state.boutiques.boutiqueuser,
  categoriess: state.categories.list,
});

export default connect(mapStateToProps, { addProduit, loadCategories })(AddProduit);
