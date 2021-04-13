import React, { useState } from "react";
import { connect } from "react-redux";
import { addstatus } from "../../actions/status";
import AdminLayout from "../layout/AdminLayout";
const AddStatusAdmin = ({ addstatus, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    couleur: "",
  });
  const { name, couleur } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    const add = await addstatus({ name, couleur });
    console.log("add", add);
    if (add) {
      setFormData({
        name: "",
        couleur: "",
      });
    }
  };
  //   if (!isAuthenticated) {
  //     if (!loading) return <Redirect to="/login" />;
  //   }
  return (
    <div>
      <AdminLayout>
        <div className="status-admin">
          <h1>Ajouter status</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label for="name">Nom status</label>
              <input id="name" type="text" name="name" onChange={(e) => onChange(e)} value={name} />
            </div>
            <div className="form-group">
              <div>
                <label for="favcolor">Couleur status</label>
              </div>
              <div className="input-groupe">
                <input className="prem-input" type="color" id="favcolor" name="couleur" onChange={(e) => onChange(e)} value={couleur} />
                <input className="deux-input" type="text" name="couleur" value={couleur} onChange={(e) => onChange(e)} />
              </div>
            </div>
            <input type="submit" className="btn btn-primary mt-20" value="Ajouter status" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.users.loading,
    isAuthenticated: state.users.isAuthenticated,
  };
};

export default connect(mapStateToProps, { addstatus })(AddStatusAdmin);
