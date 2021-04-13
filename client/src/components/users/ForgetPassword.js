import React, { useState } from "react";
import { connect } from "react-redux";
import { forgetPassword } from "../../actions/users";
import { Link, Redirect } from "react-router-dom";
import FbConnect from "./FbConnect";
const ForgetPassword = ({ forgetPassword, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    forgetPassword(email);
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='container'>
      <div className='ce-forget ce-form'>
        <h1 className='title'>Mode de passe oublié</h1>
        <div className='row'>
          <div className='col-md-6 pr-65 or-sep'>
            <h2>Réinitialiser mot de passe</h2>
            <p>Saisissez l'adresse e-mail associée à votre compte. Cliquez sur Soumettre pour recevoir un lien de réinitialisation du mot de passe par e-mail.</p>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input type='email' placeholder='Email Address' name='email' value={email} onChange={(e) => onChange(e)} />
              </div>

              <input type='submit' className='btn btn-primary' value='Forget password' />
            </form>
          </div>
          <div className='col-md-6 pl-65'>
            <h2>Déjà client</h2>
            <div className='d-inline-block'>
              <p>
                Si vous avez déjà un compte chez nous, veuillez vous connecter à la{" "}
                <Link to='/login'>
                  <span style={{ whiteSpace: "nowrap" }}>page de connexion</span>
                </Link>
              </p>
              <FbConnect />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
});

export default connect(mapStateToProps, { forgetPassword })(ForgetPassword);
