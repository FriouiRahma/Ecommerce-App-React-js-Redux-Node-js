import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updatesetting, getfilessettings } from "../../actions/settings";
import AdminLayout from "../layout/AdminLayout";

const UpdateSettingsAdmin = ({ settinglist, updatesetting, match, getfilessettings, history }) => {
  const currentsetting = settinglist.filter((el) => el._id === match.params.id);
  const currsetting = currentsetting[0];

  const [formData, setFormData] = useState({
    name: "",
    value: "",
  });
  useEffect(() => {
    getfilessettings();

    if (currsetting) {
      setFormData((prevItems) => {
        return {
          ...prevItems,
          name: currsetting.name,
          value: currsetting.value,
          id: currsetting._id,
        };
      });
    }
  }, [currsetting]);
  const { name, value } = formData;

  const onChangelienright = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updatesetting(formData, history);
  };

  return (
    <div>
      <AdminLayout>
        <div className="add-section6-admin">
          <h1> Modifier Setting </h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="lien">Nom</label>
              <input id="lien" type="text" placeholder="name" name="name" value={name || ""} onChange={(e) => onChangelienright(e)} />
            </div>
            <div className="form-group">
              <label htmlFor="lien1">Valeur</label>
              <input id="lien1" type="text" placeholder="value" name="value" value={value || ""} onChange={(e) => onChangelienright(e)} />
            </div>
            <input type="submit" className="btn btn-primary" value="Modifier setting" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    settinglist: state.settings.listsettings,
    // isAuthenticated: state.users.isAuthenticated,
    // loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { updatesetting, getfilessettings })(UpdateSettingsAdmin);
