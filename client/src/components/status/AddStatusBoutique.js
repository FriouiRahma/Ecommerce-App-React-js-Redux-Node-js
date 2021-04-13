import React, { useState } from "react";
import { connect } from "react-redux";
import { addstatusboutique } from "../../actions/status";
const AddStatusBoutique = ({ addstatusboutique, idboutique }) => {
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
  const onSubmitstatus = async (e) => {
    e.preventDefault();
    addstatusboutique({ name, couleur, id_boutique: idboutique });
    setFormData({
      name: "",
      couleur: "",
    });
  };
  return (
    <div>
      <div className="status-boutique">
        <div className='add-status-boutique'>Ajouter status</div>
        <div className="form-group">
          <label htmlFor="name">Nom status</label>
          <input id="name" type="text" name="name" onChange={(e) => onChange(e)} value={name} />
        </div>
        <div className="form-group">
          <div>
            <label htmlFor="favcolor">Couleur status</label>
          </div>
          <div className="input-groupe">
            <input className="prem-input" type="color" id="favcolor" name="couleur" onChange={(e) => onChange(e)} value={couleur} />
            <input className="deux-input" type="text" name="couleur" value={couleur} onChange={(e) => onChange(e)} />
          </div>
        </div>
        <button className="btn" onClick={(e) => onSubmitstatus(e)}>
          Ajouter Status
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.users.loading,
    isAuthenticated: state.users.isAuthenticated,
  };
};

export default connect(mapStateToProps, { addstatusboutique })(AddStatusBoutique);
