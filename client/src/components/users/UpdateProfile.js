import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateProfile } from "../../actions/users";
const UpdateProfile = ({ myProfile, updateProfile, history, isAuthenticated }) => {
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
  useEffect(() => {
    if (myProfile) {
      console.log(myProfile);

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

  const { company, website, gender, birth, telephone, line, region, city, zipcode } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData, history);
  };
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div className="container profile-user">
        <h1 className="title">Modifier Votre Profile</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => onChange(e)} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Website" name="website" value={website} onChange={(e) => onChange(e)} />
          </div>
          <div className="form-group">
            <DatePicker placeholder="Birth date" name="birth" selected={birth} dateFormat="dd/MM/yyyy" onChange={(date) => setFormData({ ...formData, birth: date })} />
          </div>
          <div className="form-group">
            <select name="gender" value={gender} onChange={(e) => onChange(e)}>
              <option value="">Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Telephone" name="telephone" value={telephone} onChange={(e) => onChange(e)} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Line" name="line" value={line} onChange={(e) => onChange(e)} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Region" name="region" value={region} onChange={(e) => onChange(e)} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="City" name="city" value={city} onChange={(e) => onChange(e)} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Zipcode" name="zipcode" value={zipcode} onChange={(e) => onChange(e)} />
          </div>
          <input type="submit" className="btn btn-primary" value="Modifier Profile" />
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  myProfile: state.users.profile,
  isAuthenticated: state.users.isAuthenticated,
});

export default connect(mapStateToProps, { updateProfile })(withRouter(UpdateProfile));
