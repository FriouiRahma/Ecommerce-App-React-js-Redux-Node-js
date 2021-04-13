import React, { useState, useEffect } from "react";
import { updateproduit, convertTobase64 } from "../../actions/Produit";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ImageCrop from "../helpers/ImageCrop";
import data from "../../utils/default.json";
import Modal from "react-modal";
import closeIcon from "../../icons/close-icon.svg";
import { Accordion, Card, Button } from "react-bootstrap";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import UserLayout from "../layout/UserLayout";
import axios from "axios";

const UpdateProduit = ({ product, isAuthenticated, loading, history, updateproduit, convertTobase64, prodimagebase64, categoriess, match }) => {
  const parentCategorie = categoriess && categoriess.length !== 0 && categoriess.filter((el) => el.parent === "0");
  /*******checkboox start here  */
  const Checkbox = ({ type = "checkbox", id, name, checked = false, onChange }) => {
    return <input type={type} value={id} id={id} name={name} checked={checked} onChange={onChange} />;
  };

  const SortableItem = SortableElement(({ value, sortIndex, key }) => (
    <div className="col-lg-4">
      {" "}
      {etat && (
        <div className="productItem">
          <img src={closeIcon} alt="" className="closeIcon" onClick={(e) => deletepicture(e, sortIndex)} />
          <img src={value} />
        </div>
      )}
    </div>
  ));
  const SortableList = SortableContainer(({ imageBase64 }) => {
    return (
      <ul className="row">
        {imageBase64.map((value, index) => {
          return <SortableItem sortIndex={index} key={`item-${index}`} index={index} value={value} />;
        })}
      </ul>
    );
  });
  const [checkedItems, setCheckedItems] = useState({});
  const [options] = useState({
    tabid: [],
  });
  const [category, Setcategory] = useState([]);
  const { tabid } = options;

  let ffffff = [];
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
      ffffff = tabid.concat(tabcategorie);
      Setcategory(ffffff);
      
    } else {
      const index = tabid.indexOf(event.target.id);
      //tabid.splice(index, 1)
    
      const index1 = category.indexOf(event.target.id);
     
      category.splice(index1, 1);
    }
   
  };
 
  const [formData, setFormData] = useState({
    caracteristique: [{ libelle: "", value: [""] }],
    name: "",
    description: "",
    price: "",
    photo: [],
    photoUpdated: "",
    etat: true,
  });
  const [imagesChanged, setImagesChanged] = React.useState(false);
  const [imageBase64, setImageBase64] = useState([]);
  const { name, caracteristique, description, price, photoUpdated, photo, etat } = formData;
  const currentProductttt = product.filter((el) => el._id === match.params.id);
  const currentProduct = currentProductttt[0];
  const image = currentProduct && currentProduct !== null && currentProduct.photo.map((el) => el);

  const emptyGroup = { libelle: "", value: [""] };
  //const [caractItems, setCaractItems] = useState([]);
  const addCaractGroup = () => {
    setFormData({ ...formData, caracteristique: [...caracteristique, emptyGroup] });
  };
  const addCaractValueItem = (e) => {
    e.preventDefault();
    const updatedCaract = [...caracteristique];
    updatedCaract[e.target.dataset.idxb]["value"].push("");
    
    setFormData({ ...formData, caracteristique: updatedCaract });
  };
  const handleCaractChange = (e) => {
    const updatedCaract = [...caracteristique];
    if (e.target.dataset.type === "libelle") updatedCaract[e.target.dataset.idx]["libelle"] = e.target.value;
    if (e.target.dataset.type === "value") updatedCaract[e.target.dataset.idx]["value"][e.target.dataset.id] = e.target.value;

    setFormData({ ...formData, caracteristique: updatedCaract });
  };



  const convertImageFromApi = async (img) => {
    const data2 = await axios.post("/api/helpers/base64-encode", {
      image: ` ${data.backUrl}/uploads/${img}`,
    });
    return data2.data;
  };

  const fetchdata = async () => {
    try {
      let imagebase64Temp = [];
      if (image) {
        if (image.length !== 0) {
          const ff = await image.map(async (img) => {
            const bb = await convertImageFromApi(img);
            imagebase64Temp = await [...imagebase64Temp, bb];
            setImageBase64(imagebase64Temp);
            return imagebase64Temp;
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  let tabcategorie = currentProduct && currentProduct !== null && currentProduct.categories.map((el) => el && el !== null && el._id);
  

  useEffect(() => {
    if (currentProduct) {
      setFormData((prevItems) => {
        return {
          ...prevItems,
          caracteristique: currentProduct.caracteristique.map((el) => el),
          name: currentProduct.name,
          description: currentProduct.description,
          price: currentProduct.price,
          //photoUpdated: currentProduct.photo,

          id: currentProduct._id,
        };
      });
    }
    

    fetchdata();
    let arr = {};
    let arr2 = [];

    currentProduct &&
      currentProduct !== null &&
      currentProduct.categories.map((el) => {
        if (el) {
          if (el !== null) {
            arr = { ...arr, [el._id]: el._id };
            arr2.push(el._id);
          }
        }
      });
    setCheckedItems(arr);
    Setcategory(arr2);
  }, [currentProduct]);

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
    setFormData({ ...formData, photoUpdated: "", etat: false });
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setImagesChanged(true);
  
    setIsOpen(false);
    
    setFormData({ ...formData, etat: true });
    photoUpdated &&
      photoUpdated !== "" &&
      setFormData({
        ...formData,
        photo: [...photo, photoUpdated],
        etat: true,
      });

    photoUpdated && photoUpdated !== "" && setImageBase64([...imageBase64, photoUpdated]);
  }
  function deletepicture(e, index) {
    e.preventDefault();
    setImageBase64(imageBase64.filter((el, id) => id !== index));
    setImagesChanged(true);
  }

  
  /**********************************************************************/
  // @update-product/   Model End Here
  /**********************************************************************/

  /**********************************************************************/
  // @EVENTS/   Event of Input And BUTTON
  /**********************************************************************/
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onExport = (ex) => {
    setFormData({ ...formData, photoUpdated: ex });
  };
 
  /**update product */
  const onSortEnd = ({ oldIndex, newIndex }) => setImageBase64(arrayMove(imageBase64, oldIndex, newIndex));

  const onSubmit = async (e) => {
    e.preventDefault();
    updateproduit({ ...formData, imageBase64, categories: category }, history);
    setFormData({
      ...formData,
      photo: [],
    });
   
  };

  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }

  return (
    <div>
      <UserLayout>
        <div className="container">
          <div className="add-product-boutique">
            <h1>Modifier produit </h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input type="text" placeholder="name" name="name" onChange={(e) => onChange(e)} value={name} />
                  </div>
                  <div className="form-group">
                    <textarea type="text" rows="5" placeholder="description" name="description" onChange={(e) => onChange(e)} value={description} />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="price" name="price" onChange={(e) => onChange(e)} value={price} />
                  </div>
                  <input type="button" value="Ajouter Caractéristiques" className="btn mb-20" onClick={addCaractGroup} />
                  <div className="row">
                    {caracteristique &&
                      caracteristique.map((val, idx) => {
                        const cvalue = val.value;
                        return (
                          <div key={idx} className="col-md-6">
                            <div className="group-items">
                              <label htmlFor="">Libelle</label>
                              <input type="text" name="libelle" data-idx={idx} data-type="libelle" value={val.libelle} onChange={handleCaractChange} />

                              {cvalue &&
                                cvalue.map((el, id) => {
                                  return (
                                    <div key={`val-${idx}-${id}`} className="pl-20">
                                      <label htmlFor="">Val</label>
                                      <input type="text" name="val" data-type="value" data-idx={idx} data-id={id} value={el} onChange={handleCaractChange} />
                                    </div>
                                  );
                                })}

                              <button className="btn mt-10" data-idxb={idx} onClick={addCaractValueItem}>
                                Ajouter valeur
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="col-lg-6">
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
                  {/* Open Model Here  To update */}
                  <div className="photos-produit">
                    <div>
                      <SortableList axis="x" distance={1} imageBase64={imageBase64} onSortEnd={onSortEnd} />
                    </div>
                    <button onClick={openModal} className="button-add-photo">
                      Ajouter photo
                    </button>
                    <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter photo</h2>
                      <button onClick={closeModal}>Ajouter photo</button>
                      <form>
                        <ImageCrop onExport={onExport} imgWidth="700" imgHeight="700" />
                      </form>
                    </Modal>
                  </div>
                </div>
                <input type="submit" className="btn btn-primary" value="Update Product" />
              </div>
            </form>
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.produits.listprod,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
    prodimagebase64: state.produits.imageconverted,
    categoriess: state.categories.list,
  };
};

export default connect(mapStateToProps, { updateproduit, convertTobase64 })(UpdateProduit);
