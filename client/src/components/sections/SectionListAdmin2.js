import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSectiontype2 } from "../../actions/sectiontype2";
import { removeSectionType2 } from "../../actions/sectiontype2";
import { removeSectionGlobType } from "../../actions/globalsections";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { confirmAlert } from "react-confirm-alert";

const SectionListAdmin2 = ({ sectionlist2, loadSectiontype2, id, removeSectionType2, removeSectionGlobType }) => {
  useEffect(() => {
    loadSectiontype2();
  }, [loadSectiontype2]);
  const reemovesection = (id) => {
    removeSectionType2(id);
    removeSectionGlobType(id);
  };

  //console.log('sectionlist2',sectionlist2)
  const verifyproduct = sectionlist2.map((el) => el.productID);
  //console.log("verifyproduct", verifyproduct);

  const filtersectiont2 = sectionlist2 && sectionlist2.length !== 0 && sectionlist2.filter((el) => el._id === id);
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => reemovesection(id),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  return (
    <div>
      <AdminLayout>
        <div className="sectionlist2-admin">
          <h1>Liste des sections type2 </h1>
          {sectionlist2 && sectionlist2.length !== 0 && (
            <div className="section-goupe2">
              <div className="item2-section"> Titre de la section</div>
              <div className="item2-section"></div>
              <div className="item2-section"></div>
            </div>
          )}
          {sectionlist2 &&
            sectionlist2.length !== 0 &&
            sectionlist2.map((el) => (
              <div key={el._id}>
                <div className="section-goupe2">
                  <div className="item2-section"> {el.titre}</div>
                  <div className="item2-section"> {el.name}</div>
                  <div className="item2-section">
                    <Link to={`/updatesectionadmin2/${el._id}`}>
                      <img title="Edite" src={noteIcon} alt="" className="editicon" />
                    </Link>
                  </div>
                  <div className="item2-section">
                    <img
                      title="Delete"
                      src={deleteIcon}
                      alt=""
                      className="deleteicon"
                      onClick={() => {
                        submit(el._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionlist2: state.sectiontype2.listsectype2,
  };
};

export default connect(mapStateToProps, { loadSectiontype2, removeSectionType2, removeSectionGlobType })(SectionListAdmin2);
