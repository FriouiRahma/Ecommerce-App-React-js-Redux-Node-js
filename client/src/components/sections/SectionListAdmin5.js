import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSectiontype5 } from "../../actions/sectiontype5";
import { removeSectionType5 } from "../../actions/sectiontype5";
import { Link } from "react-router-dom";
import { removeSectionGlobType } from "../../actions/globalsections";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import AdminLayout from "../layout/AdminLayout";
import { confirmAlert } from "react-confirm-alert";
const SectionListAdmin5 = ({ sectionlist5, loadSectiontype5, removeSectionType5, removeSectionGlobType }) => {
  useEffect(() => {
    loadSectiontype5();
  }, [loadSectiontype5]);
  const removesection = (id) => {
    removeSectionType5(id);
    removeSectionGlobType(id);
  };
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removesection(id),
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
        <div className="sectionlist5-admin">
          <h1>Liste des sections type5</h1>
          {sectionlist5 && sectionlist5.length !== 0 && (
            <div className="section-goupe5">
              <div className="item5-section"> Titre de la section</div>
              <div className="item5-section"></div>
              <div className="item5-section"></div>
            </div>
          )}
          {sectionlist5 &&
            sectionlist5.length !== 0 &&
            sectionlist5.map((el) => (
              <div key={el._id}>
                <div className="section-goupe5">
                  <div className="item5-section">{el.titre}</div>
                  <div className="item5-section">{el.name}</div>
                  <div className="item5-section">
                    <Link to={`/updatesectionadmin5/${el._id}`}>
                      <img title="Edite" src={noteIcon} alt="" className="editicon" />
                    </Link>
                  </div>
                  <div className="item5-section">
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
    sectionlist5: state.sectiontype5.listsectype5,
  };
};

export default connect(mapStateToProps, {
  loadSectiontype5,
  removeSectionType5,
  removeSectionGlobType,
})(SectionListAdmin5);
