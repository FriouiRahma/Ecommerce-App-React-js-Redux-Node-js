import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/users";
import { Link, Redirect } from "react-router-dom";
import FbConnect from "./FbConnect";
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="ce-login ce-form">
      <div className="container">
        <h1 className="title">Me Connecter</h1>
        <div className="row">
          <div className="col-md-6 pr-65 or-sep">
            <h2>Déjà client</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label htmlFor="">E-mail</label>
                <input type="email" name="email" value={email} onChange={(e) => onChange(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="">Mot de passe</label>
                <input type="password" name="password" value={password} onChange={(e) => onChange(e)} autoComplete="off" />
              </div>
              <input type="submit" className="btn btn-primary" value="Connecter" />
              <Link to="/forget-password" className="ml-20">
                Mot de passe oublié
              </Link>
            </form>
          </div>

          <div className="col-md-6 pl-65">
            <h2>Nouveau client</h2>
            <div className="d-inline-block">
              <p className="mb-10">
                En créant un compte, vous pourrez faire vos achats plus rapidement, être à jour sur une commande statut, et gardez une trace des commandes que vous avez déjà
                passées.
              </p>
              <div>
                <Link to="/register">Inscription</Link>
              </div>
            </div>
            <div className="text-center">
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

export default connect(mapStateToProps, { login })(Login);
