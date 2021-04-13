import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadSectiontype4 } from "../../actions/sectiontype4";
import data from "../../utils/default.json";
const Section_Type4 = ({ sectionlist4, loadSectiontype4, id }) => {
  useEffect(() => {
    loadSectiontype4();
  }, [loadSectiontype4]);

  //console.log('sectionlist4',sectionlist4)

  const filtersectiont4 = sectionlist4 && sectionlist4.length !== 0 && sectionlist4.filter((el) => el._id === id);

  return (
    <div className="section-home-section4">
      <div className="container">
        {filtersectiont4 &&
          filtersectiont4.length !== 0 &&
          filtersectiont4.map((el) => (
            <div key={el._id}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-type4">
                    <a href={`${el.liensite}`} target="_blank" rel="noopener noreferrer">
                      <img src={`${data.backUrl}/uploads/${el.image}`} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionlist4: state.sectiontype4.listsectype4,
  };
};

export default connect(mapStateToProps, { loadSectiontype4 })(Section_Type4);
