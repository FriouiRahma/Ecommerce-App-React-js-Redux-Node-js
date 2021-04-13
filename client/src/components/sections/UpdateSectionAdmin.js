import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updatesection } from "../../actions/sections";
import AdminLayout from "../layout/AdminLayout";
import screen from "../../images/screens/01.png";
import { Redirect } from "react-router-dom";
import close from "../../icons/close (2).svg";

const UpdateSectionAdmin = ({ sectionlist, match, updatesection, isAuthenticated, loading, history }) => {
  const currentsection = sectionlist.filter((el) => el._id === match.params.id);
  const currsection = currentsection[0];
  const verifyproduct = currsection && currsection !== null && currsection.productID && currsection.productID.length !== 0;
  //console.log("verify product", verifyproduct);
  const blankproduct = "";

  const [formData, setFormData] = useState({
    titre: "",
    productID: [],
  });
  useEffect(() => {
    if (currsection) {
      //console.log("currsection", currsection);
      setFormData((prevItems) => {
        return {
          ...prevItems,
          titre: currsection.titre,
          productID: verifyproduct ? currsection.productID.map((el) => el._id) : productID,
          id: currsection._id,
        };
      });
    }
  }, [currsection, verifyproduct]);
  const { titre, productID } = formData;
  const addProduct = () => {
    setFormData({ ...formData, productID: [...productID, blankproduct] });
  };
  const deleteelement = (id) => {
    setFormData({ ...formData, productID: productID.filter((el, index) => index !== id) });
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
    setFormData({ ...formData, titre: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updatesection(formData, history);
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <AdminLayout>
        <div className="add-section1-admin">
          <h1> Modifier section </h1>

          <figure className="">
            <div className="mb-10">
              <b>Screenshot</b>
            </div>
            <img src={screen} alt="" />
          </figure>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label>Titre</label>
              <input type="text" placeholder="titre" name="titre" value={titre} onChange={(e) => onChangetitre(e)} />
            </div>
            <input type="button" value="+" className="btn" onClick={addProduct} />
            {productID &&
              productID.length !== 0 &&
              productID.map((el, i) => (
                <div className="form-group" key={i}>
                  <div style={{ display: "flex" }}>
                    <input type="text" placeholder="productID" name={`productID${i}`} value={el} data={i} onChange={(e) => onChange(e, i)} />
                    <img
                      src={close}
                      alt=""
                      className="close-icon"
                      onClick={() => {
                        deleteelement(i);
                      }}
                    />
                  </div>
                </div>
              ))}

            <input type="submit" className="btn btn-primary" value="Update section" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionlist: state.sections.listsection,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { updatesection })(UpdateSectionAdmin);
