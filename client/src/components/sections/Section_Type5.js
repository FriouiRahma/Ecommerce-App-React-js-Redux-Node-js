import React, { useEffect  } from "react";
import { connect } from "react-redux";
import { loadSectiontype5 } from "../../actions/sectiontype5";
import data from "../../utils/default.json";
import {Link} from 'react-router-dom'
const Section_Type5= ({ sectionlist5, loadSectiontype5,id }) => {
  
  useEffect(() => {
   
    loadSectiontype5();
  }, [loadSectiontype5]);

//console.log('sectionlist4',sectionlist4)
 
  const filtersectiont5=sectionlist5&&sectionlist5.length!==0&&sectionlist5.filter(el=>el._id===id)

  return (
    <div className='section-home-section5'>
      <div className="container">
      {filtersectiont5 &&
        filtersectiont5.length !== 0 &&
        filtersectiont5.map((el) => (
          <div  className='home-sec-type5' >
          <div key={el._id} >
            <div className='title'  >
              <span className='line-head'></span>
              <h2>{el.titre}</h2>
              <span className='line-head'></span>
              </div>
            <div className='row'>   
              <div className='col-lg-4' >
             <div  className='section-type5' >  
             <a  href={`${el.liensite1}`}  target="_blank" rel="noopener noreferrer" ><img src={`${data.backUrl}/uploads/${el.publicite1}`} alt='' /></a> 
            </div>
            </div>
            <div className='col-lg-4'>
             <div  className='section-type5' >  
             <a  href={`${el.liensite2}`}  target="_blank" rel="noopener noreferrer" ><img src={`${data.backUrl}/uploads/${el.publicite2}`} alt='' /></a> 
            </div>
            </div>
            <div className='col-lg-4'>
             <div  className='section-type5' >  
              <a href={`${el.liensite3}`}   target="_blank" rel="noopener noreferrer"  ><img src={`${data.backUrl}/uploads/${el.publicite3}`} alt='' /></a>
            </div>
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
    sectionlist5:state.sectiontype5.listsectype5,
  };
};

export default connect(mapStateToProps, { loadSectiontype5 })(Section_Type5);
