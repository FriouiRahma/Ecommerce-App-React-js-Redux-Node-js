import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSections } from "../../actions/sections";
import ProductBox from "../helpers/ProductBox";
const Section_Type1 = ({ sectionlist1, loadSections, id, isAuthenticated, users }) => {
  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const verifyproduct = sectionlist1.map((el) => el.productID);
  
  const filtersectiont1 = sectionlist1 && sectionlist1.length !== 0 && sectionlist1.filter((el) => el._id === id);
  
  let userid = null;
  if (isAuthenticated && users.user) {
    userid = users.user._id;
  }
  return (
    <div className="section-home">
      {filtersectiont1 &&
        filtersectiont1.length !== 0 &&
        filtersectiont1.map((el) => (
          <div key={el._id} className="section-item">
            <div className="container">
              <div className="title">
                <span className="line-head"></span>
                <h2>{el.titre}</h2>
                <span className="line-head"></span>
              </div>
              <div className="row">
                {verifyproduct &&
                  verifyproduct.length !== 0 &&
                  el.productID.map((el, index) => {
                    return (
                      <div className="col-md-2 mb-15" key={el._id + "_" + index}>
                        <ProductBox element={el} idprod={el._id} idofboutique={el.boutique._id} idofuser={userid} fraislivrairr={el.boutique.fraislivraison} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionlist1: state.sections.listsection,
    isAuthenticated: state.users.isAuthenticated,
    users: state.users,
  };
};

export default connect(mapStateToProps, { loadSections })(Section_Type1);
