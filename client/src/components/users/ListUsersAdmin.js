import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { loadUsersAdmin, removeuser, activateuser, desactivateuser } from "../../actions/users";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import { Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
const ListUsersAdmin = ({ isAuthenticated, loading, userlist, loadUsersAdmin, removeuser, activateuser, desactivateuser }) => {
  useEffect(() => {
    loadUsersAdmin();
  }, [loadUsersAdmin]);

  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeuser(id),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  return (
    <div>
      <AdminLayout>
        <div className="list-useradmin">
          <h1>Liste des utilisateurs</h1>
          {userlist && userlist.length !== 0 && (
            <div className="groupe-user">
              <div className="item-user"> Nom utilisateur</div>
              <div className="item-user"></div>
              <div className="item-user"></div>
              <div className="item-user"></div>
            </div>
          )}
          {userlist &&
            userlist.length !== 0 &&
            userlist.map((el) => (
              <div key={el._id}>
                <div className="groupe-user">
                  <div className="item-user"> {el.firstname} </div>
                  <div className="item-user">
                    <button
                      className="btnblock"
                      onClick={() => {
                        if (el.status === "0") {
                          activateuser(el._id);
                        } else {
                          desactivateuser(el._id);
                        }
                      }}
                    >
                      {el.status === "0" ? <div className="userblock "></div> : <div className="userblock  activate "></div>}
                    </button>
                  </div>
                  <div className="item-user">
                    <Link to={`/update-user/${el._id}`}>
                      <img title="Edite" src={noteIcon} alt="" className="icon" />{" "}
                    </Link>
                  </div>
                  <div className="item-user">
                    <img
                      src={deleteIcon}
                      title="Delete"
                      alt=""
                      className="icon delete"
                      onClick={() => {
                        submit(el._id);
                      }}
                      // onClick={() => removeuser(el._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </AdminLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
    userlist: state.users.userslist,
  };
};

export default connect(mapStateToProps, {
  loadUsersAdmin,
  removeuser,
  activateuser,
  desactivateuser,
})(ListUsersAdmin);
