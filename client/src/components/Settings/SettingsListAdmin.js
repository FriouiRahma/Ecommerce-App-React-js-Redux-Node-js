import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadsettings, deletesetting } from "../../actions/settings";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import data from "../../utils/default.json";
import deleteIcon from "../../icons/dustbin.svg";
import noteIcon from "../../icons/note.svg";
const SettingsListAdmin = ({ deletesetting, loadsettings, settinglist, isAuthenticated, loading }) => {
  useEffect(() => {
    loadsettings();
  }, [loadsettings]);
  //console.log("settinglist", settinglist);
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deletesetting(id),
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
        <div className="slider-list-admin">
          <h1 className="title">Liste de settings</h1>
          <table className="table-slider">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Nom</th>
                <th style={{ width: "30%" }}>Valeur</th>
                <th style={{ width: "20%" }}>Action</th>
                <th style={{ width: "20%" }}>Valeur</th>
              </tr>
            </thead>
            <tbody>
              {settinglist &&
                settinglist.length !== 0 &&
                settinglist.map((el) => (
                  <React.Fragment key={el._id}>
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.value}</td>

                      <td>
                        <Link to={`/updatesettingsadmin/${el._id}`}>
                          <img className="icon-edit" src={noteIcon} />
                        </Link>
                      </td>
                      <td>
                        <img onClick={() => submit(el._id)} src={deleteIcon} alt="" className="icon-delete" title="Delete" />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    settinglist: state.settings.listsettings,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { loadsettings, deletesetting })(SettingsListAdmin);
