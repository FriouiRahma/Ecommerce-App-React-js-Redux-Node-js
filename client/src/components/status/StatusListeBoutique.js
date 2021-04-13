import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import noteIcon from "../../icons/note (2).svg";
import deleteIcon from "../../icons/close (2).svg";
import { loadstatus, removeStatus } from "../../actions/status";
import { confirmAlert } from "react-confirm-alert";
const StatusListeBoutique = ({ statuslist, loadstatus, removeStatus, idboutique }) => {
  const statuslistboutique = statuslist && statuslist.filter((st) => st.id_boutique === idboutique);
  console.log("statuslistadmin", statuslistboutique);
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
    <div className="status-list-boutique">
      <div style={{ fontFamily: "serif", fontSize: "20px", margin: "4px" }}>Liste des status</div>
      <table className="table-list-boutique">
        {statuslistboutique && statuslistboutique.length !== 0 && (
          <thead>
            <tr>
              <th> Nom status</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
        )}
        <tbody>
          {statuslistboutique &&
            statuslistboutique.length !== 0 &&
            statuslistboutique.map((el) => (
              <React.Fragment key={el._id}>
                <tr>
                  <td>{el.name}</td>
                  <td>
                    <Link to={`/UpdateStatusBoutique/${el._id}`}>
                      <img title="Edite" src={noteIcon} alt="" className="icon" />
                    </Link>
                  </td>
                  <td>
                    <img
                      title="Delete"
                      src={deleteIcon}
                      alt=""
                      className="icon"
                      onClick={() => {
                        submit(el._id);
                      }}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
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
})(StatusListeBoutique);
