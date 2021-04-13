import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AdminLayout = (props) => {
  return (
    <div className="container">
      <div className="admin-layout">
        <div className="nav-admin">
          <ul>
            <li>
              <Link to="/sliderlistadmin">Liste des Slider </Link>
            </li>
            <li>
              <Link to="/addslider"> Ajouter Slider</Link>
            </li>
            <li>
              <Link to="/user-list">Liste des utilisateurs</Link>
            </li>
            <li>
              <Link to="/add-user"> Ajouter Utilisateur</Link>
            </li>
            <li>
              <Link to="/boutique-list"> Liste des boutiques</Link>
            </li>
            <li>
              <Link to="/add-boutique"> Ajouter Boutique</Link>
            </li>
            <li>
              <Link to="/category-list-admin"> Liste des catégories</Link>
            </li>
            <li>
              <Link to="/add-category"> Ajouter Catégorie</Link>
            </li>

            <li>
              <Link to="/sections-list"> Liste des sections</Link>
            </li>
            <li>
              <Link to="/sectionlistadmin">Section List 1</Link>
            </li>
            <li>
              <Link to="/addsection1"> Ajouter Section Type 1</Link>
            </li>
            <li>
              <Link to="/sectionlist2">Section List2</Link>
            </li>
            <li>
              <Link to="/addsection2"> Ajouter Section Type 2</Link>
            </li>
            <li>
              <Link to="/sectionlist3">Section List3</Link>
            </li>
            <li>
              <Link to="/addsection3"> Ajouter Section Type3</Link>
            </li>
            <li>
              <Link to="/sectionlist4">Section List4</Link>
            </li>
            <li>
              <Link to="/addsection4"> Ajouter Section Type4</Link>
            </li>
            <li>
              <Link to="/sectionlist5">Section List5</Link>
            </li>
            <li>
              <Link to="/addsection5"> Ajouter Section Type5</Link>
            </li>
            <li>
              <Link to="/sectionlist6">Section List6</Link>
            </li>
            <li>
              <Link to="/addsection6"> Ajouter Section Type6</Link>
            </li>
          </ul>
        </div>
        <div className="content-admin">{props.children}</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  loading: state.users.loading,
});

export default connect(mapStateToProps)(AdminLayout);
