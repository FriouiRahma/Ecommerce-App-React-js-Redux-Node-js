import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { resetPassword } from "../../actions/users";
const ResetPassword = ({ isAuthenticated, resetPassword }) => {
  const [formData, setFormData] = useState({
    password: "",
  });

  const { password } = formData;

  const { token } = useParams();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    resetPassword(password, token);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='ce-form'>
      <h1 className='title'>Reset Password</h1>
      <div className='row'>
        <div className='col-md-6'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                autoComplete='off'
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Reset' />
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
