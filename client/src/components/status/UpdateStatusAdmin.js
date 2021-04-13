import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updatestatus } from "../../actions/status";
import AdminLayout from "../layout/AdminLayout";
import { Redirect } from "react-router-dom";

const UpdateStatusAdmin = ({ statuslist, match, updatestatus, isAuthenticated, loading, history }) => {
  const currentstatus = statuslist.filter((el) => el._id === match.params.id);
  const currstatus = currentstatus[0];
  const [formData, setFormData] = useState({
    name: "",
    couleur: "",
  });
  useEffect(() => {
    if (currstatus) {
      //console.log("currsection", currsection);

      setFormData((prevItems) => {
        return {
          ...prevItems,
          name: currstatus.name,
          couleur: currstatus.couleur,
          id: currstatus._id,
        };
      });
    }
  }, [currstatus]);
  const { name, couleur } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updatestatus(formData, history);
  };
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <AdminLayout>
        <div className="status-admin">
          <h1> Modifier status </h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="name">Nom status</label>
              <input id="name" type="text" placeholder="name" name="name" value={name} onChange={(e) => onChange(e)} />
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="favcolor">Couleur status</label>
              </div>
              <div className="input-groupe">
                <input className="prem-input" type="color" id="favcolor" name="couleur" value={couleur} onChange={(e) => onChange(e)} />
                <input className="deux-input" type="text"  name="couleur" value={couleur} onChange={(e) => onChange(e)} />
              </div>
            </div>
            <input type="submit" className="btn btn-primary" value="Update status" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    statuslist: state.status.liststatus,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { updatestatus })(UpdateStatusAdmin);
