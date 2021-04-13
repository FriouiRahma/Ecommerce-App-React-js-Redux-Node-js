import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateuser } from "../../actions/users";
import AdminLayout from "../layout/AdminLayout";

const UpdateUserAdmin = ({ userlist, match, updateuser, history }) => {
  const currentuser = userlist.filter((el) => el._id === match.params.id);
  const curruser = currentuser[0];
  //console.log("curruser", curruser);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    if (curruser) {
      console.log("curruser", curruser);

      setFormData((prevItems) => {
        return {
          ...prevItems,
          firstname: curruser.firstname,
          lastname: curruser.lastname,
          email: curruser.email,
          id: curruser._id,
        };
      });
    }
  }, [curruser]);
  const { firstname, lastname, email } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updateuser(formData, history);
  };

  return (
    <div>
      <AdminLayout>
        <div className="add-new-user">
          <h1> Modifier utilisateur </h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input type="text" placeholder="firstname" name="firstname" onChange={(e) => onChange(e)} value={firstname} />
            </div>

            <div className="form-group">
              <input type="text" placeholder="lastname" name="lastname" onChange={(e) => onChange(e)} value={lastname} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="email" name="email" onChange={(e) => onChange(e)} value={email} />
            </div>

            <input type="submit" className="btn btn-primary" value="Modifier utilisateur" />
          </form>
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userlist: state.users.userslist,
  };
};

export default connect(mapStateToProps, { updateuser })(UpdateUserAdmin);
