import React from "react";
import { FacebookProvider, Login } from "react-facebook";
import { connectFb } from "../../actions/users";
import { connect } from "react-redux";
import data from "../../utils/default.json";

const FbConnect = ({ connectFb }) => {
  const responseFacebook = (response) => {
    try {
      const { email, first_name, last_name } = response.profile;
      if (email && first_name && last_name) {
        connectFb(email, first_name, last_name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <FacebookProvider appId={data.facebookId}>
        {/* 619851311922947 */}
        {/* 614768735811339 */}
        {/* <LoginButton scope='email' onCompleted={responseFacebook} onError={responseFacebook}>
          <span>Connect with Facebook</span>
        </LoginButton> */}

        <Login scope='email' onCompleted={responseFacebook} onError={responseFacebook}>
          {({ loading, handleClick, error, data }) => (
            <button className='fb connect' onClick={handleClick}>
              Connect with Facebook
            </button>
          )}
        </Login>
      </FacebookProvider>
    </div>
  );
};

export default connect(null, { connectFb })(FbConnect);
