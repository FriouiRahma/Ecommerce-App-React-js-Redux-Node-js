import React, { useState } from "react";
import { register } from "../../actions/users";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import AdminLayout from "../layout/AdminLayout";
import { Redirect } from "react-router-dom";

const AddUserAdmin = ({ register, setAlert, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstname, lastname, email, password, password2 } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ firstname, lastname, email, password });
      setAlert("User added", "success");
    }
  };

  if (!isAuthenticated) {
    if (!loading) return <Redirect to='/login' />;
  }

  return (
    <div className='ce-register ce-form'>
      <AdminLayout>
       
        <div className='row add-new-user '>
          <div className='col-md-12 pr-65 '>
            <h1>Ajouter un nouveau utilisateur</h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <label htmlFor=''>Prénom</label>
                <input
                  type='text'
                  name='firstname'
                  value={firstname}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Nom</label>
                <input type='text' name='lastname' value={lastname} onChange={(e) => onChange(e)} />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Email </label>
                <input type='email' name='email' value={email} onChange={(e) => onChange(e)} />
              </div>

              <div className='form-group'>
                <label htmlFor=''>Mot de passe</label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  autoComplete='off'
                />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Confirmer Mot de passe</label>
                <input
                  type='password'
                  name='password2'
                  value={password2}
                  onChange={(e) => onChange(e)}
                  autoComplete='off'
                />
              </div>
              <input type='submit' className='btn btn-primary' value='Register' />
            </form>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(AddUserAdmin);
