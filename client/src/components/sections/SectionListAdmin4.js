import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSectiontype4 } from "../../actions/sectiontype4";
import { removeSectionType4 } from "../../actions/sectiontype4";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { removeSectionGlobType } from "../../actions/globalsections";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import { confirmAlert } from "react-confirm-alert";
const SectionListAdmin4 = ({ sectionlist4, loadSectiontype4, id, removeSectionType4, removeSectionGlobType }) => {
  useEffect(() => {
    loadSectiontype4();
  }, [loadSectiontype4]);

  // const filtersectiont4 = sectionlist4 && sectionlist4.length !== 0 && sectionlist4.filter((el) => el._id === id);
  const removesections = (id) => {
    removeSectionType4(id);
    removeSectionGlobType(id);
  };
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removesections(id),
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
        <div className="sectionlist4-admin">
          <h1> Liste des sections type4 </h1>
          {sectionlist4 && sectionlist4.length !== 0 && (
            <div className="section-goupe4">
              <div className="item4-section"> Titre de la section</div>
              <div className="item4-section"></div>
              <div className="item4-section"></div>
            </div>
          )}
          {sectionlist4 &&
            sectionlist4.length !== 0 &&
            sectionlist4.map((el) => (
              <div key={el._id}>
                <div className="section-goupe4">
                  <div className="item4-section">{el.titre}</div>
                  <div className="item4-section">{el.name}</div>
                  <div className="item4-section">
                    {" "}
                    <Link to={`/updatesectionadmin4/${el._id}`}>
                      <img title="Edite" src={noteIcon} alt="" className="editicon" />
                    </Link>
                  </div>
                  <div className="item4-section">
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
    sectionlist4: state.sectiontype4.listsectype4,
  };
};

export default connect(mapStateToProps, { loadSectiontype4, removeSectionType4, removeSectionGlobType })(SectionListAdmin4);
