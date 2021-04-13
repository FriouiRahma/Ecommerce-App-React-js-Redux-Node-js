import React from "react";
import { connect } from "react-redux";
import { getfilessettings } from "../../actions/settings";
import AdminLayout from "../layout/AdminLayout";
import ReactCopyclipboard from "./ReactCopyclipboard";
import data from "../../utils/default.json";

const settingsfiles = ({ getfilessettings, filessettinges }) => {
  //   useEffect(() => {
  //     getfilessettings();
  //   }, []);

  //console.log("filessettinges", filessettinges);

  return (
    <div>
      <AdminLayout>
        <div className="settings">
          <h1 className="title">Liste de fichiers settings</h1>
          <input type="file" />
          {filessettinges &&
            filessettinges.length !== 0 &&
            filessettinges[0].map((el, index) => (
              <div key={index}>
                <div style={{ display: "flex" }}>
                  <figure>
                    <img style={{ width: "40%" }} src={`${data.backUrl}/uploads/settings/${el}`} alt="" />
                  </figure>
                  <ReactCopyclipboard onelement={`${data.backUrl}/uploads/settings/${el}`}/>
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
    filessettinges: state.settings.filessettinges,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { getfilessettings })(settingsfiles);
