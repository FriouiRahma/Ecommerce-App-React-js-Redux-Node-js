import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/users";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import FbConnect from "./FbConnect";
const Register = ({ register, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstname: "",

    email: "",
    password: "",
    password2: "",
  });

  const { firstname, email, password, password2 } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ firstname, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='ce-register ce-form'>
      <div className='container'>
        <h1 className='title'>Nouveau sur BigMall ? Bienvenue !</h1>

        <div className='row'>
          <div className='col-md-6 pr-65 or-sep'>
            <h2>Nouveau client</h2>
            <p>
              En créant un compte, vous pourrez faire vos achats plus rapidement, être à jour sur une commande statut, et gardez une trace des commandes que vous avez déjà passées.
            </p>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <label htmlFor=''>Nom Prénom</label>
                <input type='text' name='firstname' value={firstname} onChange={(e) => onChange(e)} />
              </div>

              <div className='form-group'>
                <label htmlFor=''>E-mail </label>
                <input type='email' name='email' value={email} onChange={(e) => onChange(e)} />
              </div>

              <div className='form-group'>
                <label htmlFor=''>Mot de passe</label>
                <input type='password' name='password' value={password} onChange={(e) => onChange(e)} autoComplete='off' />
              </div>
              <div className='form-group'>
                <label htmlFor=''>Confirmer mot de passe</label>
                <input type='password' name='password2' value={password2} onChange={(e) => onChange(e)} autoComplete='off' />
              </div>
              <input type='submit' className='btn btn-primary' value='Inscrire' />
            </form>
          </div>
          <div className='col-md-6 pl-65'>
            <h2>Déjà Client</h2>
            <div className='d-inline-block'>
              <p>
                Déja client sur BIG MALL? connectez vous <Link to='/login'>Continuer</Link>
              </p>
              <div className='mb-20'>
                <FbConnect />
              </div>
              Vous pouvez utiliser le bouton de connexion ci dessus pour créer automatiquement un compte sur notre boutique.
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

export default connect(mapStateToProps, { register, setAlert })(Register);
