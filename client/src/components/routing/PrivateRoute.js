import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.users,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
