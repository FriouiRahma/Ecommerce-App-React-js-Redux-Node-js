import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSectiontype6 } from "../../actions/sectiontype6";
import { removeSectionType6 } from "../../actions/sectiontype6";
import { Link } from "react-router-dom";
import { removeSectionGlobType } from "../../actions/globalsections";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import AdminLayout from "../layout/AdminLayout";
import { confirmAlert } from "react-confirm-alert";
const SectionListeAdmin6 = ({ sectionlist6, loadSectiontype6, removeSectionType6, removeSectionGlobType }) => {
  useEffect(() => {
    loadSectiontype6();
  }, [loadSectiontype6]);
  const removesection = (id) => {
    removeSectionType6(id);
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
        <div className="sectionlist6-admin">
          <h1>Liste des sections type6</h1>
          {sectionlist6 && sectionlist6.length !== 0 && (
            <div className="section-goupe6">
              <div className="item6-section"> Titre de la section</div>
              <div className="item6-section"></div>
              <div className="item6-section"></div>
            </div>
          )}
          {sectionlist6 &&
            sectionlist6.length !== 0 &&
            sectionlist6.map((el) => (
              <div key={el._id}>
                <div className="section-goupe6">
                  <div className="item6-section">{el.titre}</div>
                  <div className="item6-section">{el.name}</div>
                  <div className="item6-section">
                    <Link to={`/updatesectionadmin6/${el._id}`}>
                      <img title="Edite" src={noteIcon} alt="" className="icon" />
                    </Link>
                  </div>
                  <div className="item6-section">
                    <img
                      title="Delete"
                      src={deleteIcon}
                      alt=""
                      className="icon delete  "
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
    sectionlist6: state.sectiontype6.listsectype6,
  };
};

export default connect(mapStateToProps, { loadSectiontype6, removeSectionType6, removeSectionGlobType })(SectionListeAdmin6);
