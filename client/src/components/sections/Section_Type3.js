import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { loadSectiontype3 } from "../../actions/sectiontype3";
import data from "../../utils/default.json";
import ProductBox from "../helpers/ProductBox";
const Section_Type3 = ({ sectionlist3, loadSectiontype3, id, isAuthenticated, users }) => {
  let userid = null;
  if (isAuthenticated && users.user) {
    userid = users.user._id;
  }

  const videoEl = useRef(null);
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };
  useEffect(() => {
    attemptPlay();
    loadSectiontype3();
  }, [loadSectiontype3]);


  // const verifyproduct = sectionlist3.map((el) => el.productID);
  
  let array = [];
  const filtersectiont3 = sectionlist3 && sectionlist3.length !== 0 && sectionlist3.filter((el) => el._id === id);
  const product =
    filtersectiont3 &&
    filtersectiont3.length !== 0 &&
    filtersectiont3.map((el, index) =>
      el.productID.map(
        (el) =>
          (array = [
            ...array,
            {
              id: el._id,
              photo: el.photo,
              name: el.name,
              price: el.price,
              boutique: el.boutique && el.boutique !== null && el.boutique._id,
              tarifpromo: el.tarifpromo,
              fraislivraison: el.boutique && el.boutique !== null && el.boutique.fraislivraison,
            },
          ])
      )
    );
  // console.log("arraysection type 3", array);
  //el.photo[0]))
  // const producttt = product && product.length !== 0 && product[0];
  const prod1 = array[0];
  const prod2 = array[1];
  // const prod3 = array[2];
  // const prod4 = array[3];

  return (
    <div className="section-home-type3">
      <div className="container">
        {filtersectiont3 &&
          filtersectiont3.length !== 0 &&
          filtersectiont3.map((el) => (
            <div className="section3" key={el._id}>
              <div className="title">
                <span className="line-head"></span>
                <h2>{el.titre}</h2>
                <span className="line-head"></span>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="video-outer">
                    <video
                      fluid={false}
                      style={{
                        objectFit: "cover",
                        width: "100%",

                        maxWidth: "100%",
                        height: "100%",
                      }}
                      //playsInline
                      loop
                      muted
                      autoPlay
                      //controls
                      alt="All the devices"
                      //src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                      src={el.video}
                      ref={videoEl}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-6">
                      <ProductBox element={prod1} idprod={prod1.id} idofboutique={prod1.boutique} idofuser={userid} fraislivrairr={prod1.fraislivraison} />
                    </div>
                    <div className="col-md-6">
                      <ProductBox element={prod2} idprod={prod2.id} idofboutique={prod2.boutique} idofuser={userid} fraislivrairr={prod2.fraislivraison} />
                    </div>
                    <div className="col-md-12">
                      <a href={`${el.liensite2}`} target="_blank" rel="noopener">
                        <img className="pub" src={`${data.backUrl}/uploads/${el.publicite1}`} alt="" />
                      </a>
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
    sectionlist3: state.sectiontype3.listsectype3,
    isAuthenticated: state.users.isAuthenticated,
    users: state.users,
  };
};

export default connect(mapStateToProps, { loadSectiontype3 })(Section_Type3);
