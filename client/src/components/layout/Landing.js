import React, { useEffect } from "react";
import Section_Type1 from "../sections/Section_Type1";
import SliderList from "../sliders/SliderList";
import { connect } from "react-redux";
import Section_Type2 from "../sections/Section_Type2";
import Section_Type3 from "../sections/Section_Type3";
import Section_Type4 from "../sections/Section_Type4";
import Section_Type5 from "../sections/Section_Type5";
import Section_Type6 from "../sections/Section_Type6";
import { trackWindowScroll } from "react-lazy-load-image-component";

import { getallsectionsglobal } from "../../actions/globalsections";
const Landing = ({ getallsectionsglobal, allglobalsections }) => {
  //console.log("allglobalsections",allglobalsections)
  useEffect(() => {
    getallsectionsglobal();
  }, []);
  return (
    <div className='home'>
      <SliderList />

      {/* <Section_Type1 /> */}
      {allglobalsections &&
        allglobalsections.length !== 0 &&
        allglobalsections.map((el, index) => {
          if (el.Type_section == 1)
            return (
              <div key={index}>
                <Section_Type1 id={el.id_sections_type} />
              </div>
            );
          if (el.Type_section == 2)
            return (
              <div key={index}>
                <Section_Type2 id={el.id_sections_type} />
              </div>
            );
          if (el.Type_section == 3)
            return (
              <div key={index}>
                <Section_Type3 id={el.id_sections_type} />
              </div>
            );
          if (el.Type_section == 4)
            return (
              <div key={index}>
                <Section_Type4 id={el.id_sections_type} />
              </div>
            );
          if (el.Type_section == 5)
            return (
              <div key={index}>
                <Section_Type5 id={el.id_sections_type} />
              </div>
            );
          if (el.Type_section == 6)
            return (
              <div key={index}>
                <Section_Type6 id={el.id_sections_type} />
              </div>
            );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allglobalsections: state.globalsections.globalSection,
  };
};

export default connect(mapStateToProps, { getallsectionsglobal })(trackWindowScroll(Landing));
