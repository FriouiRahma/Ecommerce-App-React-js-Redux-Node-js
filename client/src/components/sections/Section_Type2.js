import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { loadSectiontype2 } from "../../actions/sectiontype2";
import ProductBox from "../helpers/ProductBox";
const Section_Type2 = ({ sectionlist2, loadSectiontype2, id, isAuthenticated, users }) => {
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
    loadSectiontype2();
  }, [loadSectiontype2]);

  //console.log('sectionlist2',sectionlist2)
  const verifyproduct = sectionlist2.map((el) => el.productID);
  //console.log("verifyproduct", verifyproduct);

  const filtersectiont2 = sectionlist2 && sectionlist2.length !== 0 && sectionlist2.filter((el) => el._id === id);

  let array = [];
  const product =
    filtersectiont2 &&
    filtersectiont2.length !== 0 &&
    filtersectiont2.map((el, index) =>
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
 
  // el.photo[0]
  // const producttt = product && product.length !== 0 && product[0];

  const prod1 = array[0];
  const prod2 = array[1];
  const prod3 = array[2];
  const prod4 = array[3];
  const prod5 = array[4];
  const prod6 = array[5];
  const prod7 = array[6];
  const prod8 = array[7];

  return (
    <div className="section-home2">
      {filtersectiont2 &&
        filtersectiont2.length !== 0 &&
        filtersectiont2.map((el) => (
          <div className=" container section2" key={el._id}>
            <div className="container">
              <div className="title">
                <span className="line-head"></span>
                <h2>{el.titre}</h2>
                <span className="line-head"></span>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-lg-6 sect-part2 hover15 ">
                      <ProductBox element={prod1} idprod={prod1.id} idofboutique={prod1.boutique} idofuser={userid} fraislivrairr={prod1.fraislivraison} />
                    </div>
                    <div className="col-lg-6 sect-part2 hover15  ">
                      <ProductBox element={prod2} idprod={prod2.id} idofboutique={prod2.boutique} idofuser={userid} fraislivrairr={prod1.fraislivraison} />
                    </div>
                    <div className="col-lg-6 sect-part2 hover15  ">
                      <ProductBox
                        element={prod3}
                        idprod={prod3 && prod3 !== null && prod3.id}
                        idofboutique={prod3.boutique}
                        idofuser={userid}
                        fraislivrairr={prod3.fraislivraison}
                      />
                    </div>
                    <div className="col-lg-6 sect-part2 hover15 ">
                      <ProductBox
                        element={prod4}
                        idprod={prod4 && prod4 !== null && prod4.id}
                        idofboutique={prod4 && prod4 !== null && prod4.boutique}
                        idofuser={userid}
                        fraislivrairr={prod4 && prod4 !== null && prod4.fraislivraison}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="video-outer">
                    <video
                      style={{ objectFit: "cover", height: "545px", maxWidth: "100%", width: "100%" }}
                      //playsInline
                      loop
                      muted
                      autoPlay
                      // controls
                      alt="All the devices"
                      //src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                      src={el.video}
                      ref={videoEl}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-lg-6 sect-part2 hover15">
                      <ProductBox
                        element={prod5}
                        idprod={prod5 && prod5 !== null && prod5.id}
                        idofboutique={prod5 && prod5 !== null && prod5.boutique}
                        idofuser={userid}
                        fraislivrairr={prod5 && prod5 !== null && prod5.fraislivraison}
                      />
                    </div>
                    <div className="col-lg-6 sect-part2 hover15">
                      <ProductBox
                        element={prod6}
                        idprod={prod6 && prod6 !== null && prod6.id}
                        idofboutique={prod6 && prod6 !== null && prod6.boutique}
                        idofuser={userid}
                        fraislivrairr={prod6 && prod6 !== null && prod6.fraislivraison}
                      />
                    </div>
                    <div className="col-lg-6 sect-part2 hover15 ">
                      <ProductBox
                        element={prod7}
                        idprod={prod7 && prod7 !== null && prod7.id}
                        idofboutique={prod7 && prod7 !== null && prod7.boutique}
                        idofuser={userid}
                        fraislivrairr={prod7 && prod7 !== null && prod7.fraislivraison}
                      />
                    </div>
                    <div className="col-lg-6 sect-part2 hover15">
                      <ProductBox
                        element={prod8}
                        idprod={prod8 && prod8 !== null && prod8.id}
                        idofboutique={prod8 && prod8 !== null && prod8.boutique}
                        idofuser={userid}
                        fraislivrairr={prod8 && prod8 !== null && prod8.fraislivraison}
                      />
                    </div>
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
    sectionlist2: state.sectiontype2.listsectype2,

    isAuthenticated: state.users.isAuthenticated,

    users: state.users,
  };
};

export default connect(mapStateToProps, { loadSectiontype2 })(Section_Type2);
