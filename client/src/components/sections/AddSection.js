import React, { useState } from "react";
import { connect } from "react-redux";
import { addsection } from "../../actions/sections";
import AdminLayout from "../layout/AdminLayout";
import screen from "../../images/screens/01.png";
import { Redirect } from "react-router-dom";
const AddSection = ({ addsection, listproduit, isAuthenticated, loading, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    titre: "",
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

  const { name, titre } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();

    addsection({ name, titre, productID, history });
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <AdminLayout>
        <div className="add-section1-admin">
          <h1>Ajouter section type1</h1>

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

export default connect(mapStateToProps, { addsection })(AddSection);
