import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSectiontype6 } from "../../actions/sectiontype6";
import data from "../../utils/default.json";
const Section_Type6 = ({ sectionlist6, loadSectiontype6, id }) => {
  useEffect(() => {
    loadSectiontype6();
  }, [loadSectiontype6]);

  //console.log('sectionlist4',sectionlist4)

  const filtersectiont6 = sectionlist6 && sectionlist6.length !== 0 && sectionlist6.filter((el) => el._id === id);

  return (
    <div className="section-home-section6">
      {filtersectiont6 &&
        filtersectiont6.length !== 0 &&
        filtersectiont6.map((el) => (
          <div key={el._id} className="home-sec-type6">
            <div className="container">
              <div className="display-bet-image row">
                <div className="col-md-6">
                  <div className="box-text">
                    <img src={`${data.backUrl}/uploads/${el.image1}`} alt="" />
                    <div className="title">{el.name1}</div>
                    <p>{el.paragraphe1}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="box-text">
                    <img src={`${data.backUrl}/uploads/${el.image2}`} alt="" />
                    <div className="title">{el.name2}</div>
                    <p>{el.paragraphe2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionlist6: state.sectiontype6.listsectype6,
  };
};

export default connect(mapStateToProps, { loadSectiontype6 })(Section_Type6);
