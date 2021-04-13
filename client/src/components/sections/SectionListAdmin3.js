import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSectiontype3 } from "../../actions/sectiontype3";
import { removeSectionType3 } from "../../actions/sectiontype3";
import { Link } from "react-router-dom";
import { removeSectionGlobType } from "../../actions/globalsections";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import AdminLayout from "../layout/AdminLayout";
import { confirmAlert } from "react-confirm-alert";
const SectionListAdmin3 = ({ sectionlist3, loadSectiontype3, id, removeSectionType3, removeSectionGlobType }) => {
  useEffect(() => {
    loadSectiontype3();
  }, [loadSectiontype3]);

  //console.log('sectionlist3',sectionlist3)
  //const verifyproduct = sectionlist3.map((el) => el.productID);
  //console.log("verifyproduct", verifyproduct);
  //const filtersectiont3=sectionlist3&&sectionlist3.length!==0&&sectionlist3.filter(el=>el._id===id)
  //const product=filtersectiont3&&filtersectiont3.length!==0 &&  filtersectiont3.map((el,index)=>el.productID.map(el=> el.photo[0]))
  //const producttt=product&&product.length!==0&&   product[0]
  //const prod1=producttt[0]
  //const prod2=producttt[1]
  //const prod3=producttt[2]
  //const prod4=producttt[3]

  //console.log("product111111111",producttt[0])

  const removesection = (id) => {
    removeSectionType3(id);
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
        <div className="sectionlist3-admin">
          <h1>Liste des sections type3</h1>
          {sectionlist3 && sectionlist3.length !== 0 && (
            <div className="section-goupe3">
              <div className="item3-section"> Titre de la section</div>
              <div className="item3-section"></div>
              <div className="item3-section"></div>
            </div>
          )}

          {sectionlist3 &&
            sectionlist3.length !== 0 &&
            sectionlist3.map((el) => (
              <div key={el._id}>
                <div className="section-goupe3">
                  <div className="item3-section">{el.titre}</div>
                  <div className="item3-section">{el.name}</div>
                  <div className="item3-section">
                    <Link to={`/updatesectionadmin3/${el._id}`}>
                      <img title="Edite" src={noteIcon} alt="" className="editicon" />
                    </Link>
                  </div>
                  <div className="item3-section">
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
    sectionlist3: state.sectiontype3.listsectype3,
  };
};

export default connect(mapStateToProps, {
  loadSectiontype3,
  removeSectionType3,
  removeSectionGlobType,
})(SectionListAdmin3);
