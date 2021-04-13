import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { setAlert } from "../../actions/alert";
const Profile = ({ myProfile, isAuthenticated, userId, setAlert }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    gender: "",
    birth: new Date("01/01/2000"),
    telephone: "",
    line: "",
    region: "",
    city: "",
    zipcode: "",
  });
  const { company, website, gender, birth, telephone, line, region, city, zipcode } = formData;
  //console.log("userId", userId.user._id);
  useEffect(() => {
    if (myProfile) {
      setFormData((prevItems) => {
        return {
          ...prevItems,
          company: myProfile.company,
          website: myProfile.website,
          birth: new Date(myProfile.birth),
          gender: myProfile.gender,
          telephone: myProfile.telephone,
          line: myProfile.address.line,
          region: myProfile.address.region,
          city: myProfile.address.city,
          zipcode: myProfile.address.zipcode,
        };
      });
    }
  }, [myProfile]);

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='container'>
      <div className='infos-list'>
        <div className='row'>
          <div className='col-3'>
            <h1 className='title'>Profile</h1>
          </div>
          <div className='col-3 pt-30 text-right'>
            <Link className='btn' to='/update-profile'>
              Modifier Profile
            </Link>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <div className='item'>
              <div className='label'>Votre ID</div>
              <div className='value'>
                {userId && userId !== null && userId.user._id}
                <CopyToClipboard text={userId.user._id} className='ml-20'>
                  <button
                    onClick={() => {
                      setAlert("copied", "success");
                    }}
                  >
                    Cliquez pour copier
                  </button>
                </CopyToClipboard>
              </div>
            </div>

            <div className='item'>
              <div className='label'>Entreprise</div>
              <div className='value'>{company}</div>
            </div>
            <div className='item'>
              <div className='label'>Site-Web</div>
              <div className='value'>{website}</div>
            </div>
            <div className='item'>
              <div className='label'>Genre</div>
              <div className='value'>{gender === "F" ? "Female" : gender === "M" ? "Male" : ""}</div>
            </div>
            <div className='item'>
              <div className='label'>Date de naissance</div>
              <div className='value'>
                <Moment format='DD/MM/YYYY' date={birth}></Moment>
              </div>
            </div>
            <div className='item'>
              <div className='label'>Téléphone</div>
              <div className='value'>{telephone}</div>
            </div>
            <div className='item'>
              <div className='label'>Ligne</div>
              <div className='value'>{line}</div>
            </div>
            <div className='item'>
              <div className='label'>Région</div>
              <div className='value'>{region}</div>
            </div>
            <div className='item'>
              <div className='label'>Ville</div>
              <div className='value'>{city}</div>
            </div>
            <div className='item'>
              <div className='label'>Code postal</div>
              <div className='value'>{zipcode}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  myProfile: state.users.profile,
  isAuthenticated: state.users.isAuthenticated,
  userId: state.users,
});

export default connect(mapStateToProps, { setAlert })(Profile);
