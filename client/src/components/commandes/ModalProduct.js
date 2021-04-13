import React from "react";
import Modal from "react-modal";
import data from "../../utils/default.json";
const ModalProduct = ({ oneproduct }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "80vh",
    },
  };
  Modal.setAppElement("#root");
  const [modalIsOpenproduit, setIsOpenprod] = React.useState(false);
  function openModalprod(e) {
    e.preventDefault();
    setIsOpenprod(true);
    // setPrixfinal(valeur)
  }
  function closeModalprod(e) {
    setIsOpenprod(false);
  }

  return (
    <div>
      {oneproduct.products.map((prod, index) => {
        //total = oneproduct.frais_livraison + total + prod.quantite * prod.prix_unitaire;
        return (
          <React.Fragment key={index}>
            <ul>
              <li className="product-inner">
                <div className="name-prod">
                  <div className="button-open" onClick={(e) => openModalprod(e)} data-id={prod._id}>
                    {prod.id_prod && prod.id_prod !== null && prod.id_prod.name}
                  </div>
                  <Modal id={prod._id} isOpen={modalIsOpenproduit} onRequestClose={closeModalprod} style={customStyles}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="modal-product">
                          <h2>Product info</h2>
                          <figure>
                            <img src={`${data.backUrl}/uploads/${prod.id_prod && prod.id_prod !== null && prod.id_prod.photo[0]}`} alt="" />
                          </figure>
                          <form>
                            <div className="coor-produit">
                              <div className="coor-pro-info">
                                Nom <div className="coor-pro-right">{prod.id_prod && prod.id_prod !== null && prod.id_prod.name}</div>{" "}
                              </div>
                              <div className="coor-pro-info">
                                Référence <div className="coor-pro-right">{prod.id_prod && prod.id_prod !== null && prod.id_prod.codeabarre}</div>
                              </div>
                              <div className="coor-pro-info">
                                quantitestock <div className="coor-pro-right">{prod.id_prod && prod.id_prod !== null && prod.id_prod.quantitestock}</div>
                              </div>
                              <div className="coor-pro-info">
                                price <div className="coor-pro-right">{prod.id_prod && prod.id_prod !== null && prod.id_prod.price} DT </div>
                              </div>
                              <div className="coor-pro-info">
                                Tarifpromo <div className="coor-pro-right">{prod.id_prod && prod.id_prod !== null && prod.id_prod.tarifpromo} DT </div>{" "}
                              </div>
                              {/* <li>Net A Payer:{el.netapayer}DT</li> */}
                            </div>
                          </form>
                          <div className="btn-prod">
                            <button onClick={closeModalprod}>Fermer</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
                {/* produit:{prod.id_prod&&prod.id_prod!==null&& prod.id_prod.name}  */}
                <div className="qte-prod"> *{prod.quantite}</div>
                {/* <div className='prix-prod'>{prod.prix_unitaire} DT</div>{" "} */}
              </li>
            </ul>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ModalProduct;
