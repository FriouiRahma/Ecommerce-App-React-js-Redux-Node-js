import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeSection } from "../../actions/sections";
import AdminLayout from "../layout/AdminLayout";
import { loadSections } from "../../actions/sections";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import { confirmAlert } from "react-confirm-alert";
const SectionsListAdmin = ({ sectionlist, removeSection, loadSections }) => {
  useEffect(() => {
    loadSections();
  }, [loadSections]);
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeSection(id),
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
        <div className="sectionlist1-admin">
          <h1>Liste sections type1</h1>
          {sectionlist && sectionlist.length !== 0 && (
            <div className="section-goupe1">
              <div className="item1-section"> Titre de la section</div>
              <div className="item1-section"></div>
              <div className="item1-section"></div>
            </div>
          )}
          {sectionlist &&
            sectionlist.length !== 0 &&
            sectionlist.map((el) => (
              <div key={el._id}>
                <div className="section-goupe1">
                  <div className="item1-section">{el.titre}</div>
                  <div className="item1-section">
                    <Link to={`/updatesectionadmin/${el._id}`}>
                      <img title="Edite" src={noteIcon} alt="" className="editicon" />
                    </Link>
                  </div>
                  <div className="item1-section">
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
    sectionlist: state.sections.listsection,
  };
};

export default connect(mapStateToProps, { removeSection, loadSections })(SectionsListAdmin);
