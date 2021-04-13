import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import { loadstatus, removeStatus } from "../../actions/status";
import AdminLayout from "../layout/AdminLayout";
import { confirmAlert } from "react-confirm-alert";
const StatusListAdmin = ({ statuslist, loadstatus, removeStatus }) => {
  const statuslistadmin = statuslist&& statuslist.filter((st) => st.id_boutique === "0");
  console.log("statuslistadmin", statuslistadmin);
  useEffect(() => {
    loadstatus();
  }, [loadstatus]);
  const removesection = (id) => {
    removeStatus(id);
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
          <h1>Liste des status</h1>
          {statuslistadmin && statuslistadmin.length !== 0 && (
            <div className="section-goupe5">
              <div className="item5-section"> Nom status</div>
              <div className="item5-section"></div>
              <div className="item5-section"></div>
            </div>
          )}
          {statuslistadmin &&
            statuslistadmin.length !== 0 &&
            statuslistadmin.map((el) => (
              <div key={el._id}>
                <div className="section-goupe5">
                  <div className="item5-section">{el.name}</div>
                  <div className="item5-section">
                    <Link to={`/updatestatus/${el._id}`}>
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
    statuslist: state.status.liststatus,
  };
};

export default connect(mapStateToProps, {
  loadstatus,
  removeStatus,
})(StatusListAdmin);
