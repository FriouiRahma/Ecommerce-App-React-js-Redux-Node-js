import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import data from "../../utils/default.json";

// import image1 from "../../images/giphy (4).gif";
// import image2 from "../../images/02.webp";
// import image3 from "../../images/03.webp";
// import image4 from "../../images/giphy (3).gif";
// import image5 from "../../images/05.webp";
// import image6 from "../../images/06.webp";
// import image7 from "../../images/giphy (6).gif";

import image1gif from "../../images/02.gif";

import imageAccueil from "../../images/accueil.JPEG";
import imageAnnonce from "../../images/annonce.JPEG";

const settings = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  touchThreshold: 100,
  autoplaySpeed: 10000,
};
const SliderList = ({ sliderlist, categories, settinglist }) => {
  console.log("settinglist", settinglist);
  const catParent = categories && categories.length !== 0 && categories.filter((cat) => cat.parent === "0");
  let acceuil = "";
  let annonce = "";
  let partgif = "";
  if (settinglist && settinglist.length !== 0) {
    settinglist.map((el) => {
      if (el.name === "img_acceuil") {
        acceuil = el.value;
      }
    });
  }

  if (settinglist && settinglist.length !== 0) {
    settinglist.map((el) => {
      if (el.name === "img_annonce") {
        annonce = el.value;
      }
    });
  }
  if (settinglist && settinglist.length !== 0) {
    settinglist.map((el) => {
      if (el.name === "partgif") {
        partgif = el.value;
      }
    });
  }

  return (
    <div className="top-slider-section">
      <div className="container">
        <div className="top-slider">
          <div className="categories">
            <ul>
              {catParent &&
                catParent.length !== 0 &&
                catParent.map((cat) => {
                  let subCat = categories.filter((scat) => scat.parent === cat._id);
                  let ret = (
                    <li key={cat._id}>
                      <span>
                        <Link to={`/product-category/${cat._id}`}>{cat.name}</Link>
                      </span>
                    </li>
                  );
                  if (subCat.length !== 0) {
                    ret = (
                      <li key={cat._id} className={`has-child cat-${cat.slug}`}>
                        <span>
                          <Link to={`/product-category/${cat._id}`}>{cat.name}</Link>
                        </span>
                        <div className="infos-category-parent">
                          <div className="infos-category-parent-inner">
                            {subCat.map((scat) => {
                              let subsubCat = categories.filter((subsubCat) => subsubCat.parent === scat._id);

                              if (subsubCat.length !== 0) {
                                return (
                                  <div key={scat._id} className="sub">
                                    <Link to={`/product-category/${scat._id}`}>{scat.name}</Link>
                                    <ul className="subsub">
                                      {subsubCat.map((sscat) => {
                                        return (
                                          <li key={sscat._id} className="subsub">
                                            <Link to={`/product-category/${sscat._id}`}>{sscat.name}</Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={scat._id} className="sub">
                                    <Link to={`/product-category/${scat._id}`}>{scat.name}</Link>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      </li>
                    );
                  }
                  return ret;
                })}
            </ul>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {sliderlist &&
                sliderlist.length !== 0 &&
                sliderlist.map((el) => (
                  <div key={el._id}>
                    <a target="_blank" rel="noopener noreferrer" href={el.lien}>
                      <div
                        className="item"
                        style={{
                          backgroundImage: `url(${data.backUrl}/uploads/sliders/${el.photo})`,
                        }}
                      >
                        <div className="item-title">{el.titre}</div>
                        <div className="item-description">{el.description}</div>
                      </div>
                    </a>
                  </div>
                ))}
            </Slider>
            <div className="bottoms-item">
              {/* <div className="accueil">
                <figure>
                  <img src={imageAccueil} alt="" />
                </figure>
              </div> */}
              <div className="accueil">
                <figure>
                  <img src={acceuil} alt="" />
                </figure>
              </div>
              {/* <div className="annonces">
                <figure>
                  <img src={imageAnnonce} alt="" />
                </figure>
              </div> */}
              <div className="annonces">
                <figure>
                  <img src={annonce} alt="" />
                </figure>
              </div>
            </div>

            {/* <div className='bottom-images'>
              <img src={image1} alt='' />
              <img src={image2} alt='' />
              <img src={image3} alt='' />
              <img src={image4} alt='' />
              <img src={image5} alt='' />
              <img src={image6} alt='' />
              <img src={image7} alt='' />
            </div> */}
          </div>
          <div className="right-infos">
            <div className="btnr espace-gros">
              {" "}
              <Link to="/boutiquesgros">ESPACE GROS</Link>{" "}
            </div>
            <div className="btnr boutiques">
              <Link to="/boutiquesdetail">BOUTIQUES</Link>{" "}
            </div>
            <div className="btnr pages">PAGES</div>
            <div className="bottom-right">
              <figure>
                <img src={partgif} alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sliderlist: state.sliders.listslider,
    categories: state.categories.list,
    settinglist: state.settings.listsettings,
  };
};

export default connect(mapStateToProps)(SliderList);
