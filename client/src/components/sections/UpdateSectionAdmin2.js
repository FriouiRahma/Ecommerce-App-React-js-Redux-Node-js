import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateSectionType2 } from "../../actions/sectiontype2";
import screen from "../../images/screens/02.png";
import { Redirect } from "react-router-dom";
import close from "../../icons/close (2).svg";
import AdminLayout from "../layout/AdminLayout";
const UpdateSectionAdmin2 = ({ sectionlist2, match, updateSectionType2, isAuthenticated, loading, history }) => {
  const currentsection = sectionlist2.filter((el) => el._id === match.params.id);
  const currsection = currentsection[0];
  const verifyproduct = currsection && currsection !== null && currsection.productID && currsection.productID.length !== 0;
  //console.log("verify product", verifyproduct);
  const blankproduct = "";

  const [formData, setFormData] = useState({
    titre: "",
    name: "",
    productID: [],
    video: "",
  });
  useEffect(() => {
    if (currsection) {
      //console.log("currsection", currsection);

      setFormData((prevItems) => {
        return {
          ...prevItems,
          titre: currsection.titre,
          name: currsection.name,
          productID: verifyproduct ? currsection.productID.map((el) => el._id) : productID,
          video: currsection.video,
          id: currsection._id,
        };
      });
    }
  }, [currsection, verifyproduct]);
  const { titre, name, productID, video } = formData;
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updateSectionType2(formData, history);
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <AdminLayout>
        <div className="add-section2-admin">
          <h1> Modifier section</h1>

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
            <div>
              <label>Nom section</label>
              <input type="text" placeholder="name" name="name" value={name} onChange={(e) => onChangetitre(e)} />
            </div>
            <div>
              <label>Titre video</label>
              <input type="text" placeholder="video" name="video" value={video} onChange={(e) => onChangetitre(e)} />
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
    sectionlist2: state.sectiontype2.listsectype2,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { updateSectionType2 })(UpdateSectionAdmin2);
