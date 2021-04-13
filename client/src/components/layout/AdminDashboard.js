import React from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
//add (1).svg
import addicon from "../../icons/add (2).svg";
import listicon from "../../icons/list.svg";
const AdminDashboard = () => {
  return (
    <div className="container">
      {/* <AdminLayout></AdminLayout> */}
      <div className="admin-layout">
        <div className="row">
          <div className="col-md-3">
            <div className="single-element">
              <div className="item">
                <Link to="/sliderlistadmin">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Sliders</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/addslider">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider"> Ajouter Slider</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className=" single-element">
              <div className="item">
                <Link to="/user-list">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Utilisateurs</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/add-user">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider"> Ajouter Utilisateur</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="single-element  ">
              <div className="item">
                <Link to="/boutique-list">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Boutiques</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/add-boutique">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Boutique</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="single-element  ">
              <div className="item">
                <Link to="/category-list-admin">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Catégories</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/add-category">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Catégorie</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="single-element  ">
              <Link to="/sections-list">
                <img src={listicon} className="icon-add" alt="" />
                <span className="link-slider">Liste des Sections</span>
              </Link>
            </div>
          </div>
          <div className="col-md-3">
            <div className="single-element ">
              <div className="item">
                <Link to="/sectionlistadmin">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Sections 1</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/addsection1">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Section 1</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className=" single-element    ">
              <div className="item">
                <Link to="/sectionlist2">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Sections 2</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/addsection2">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Section 2</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="single-element ">
              <div className="item">
                <Link to="/sectionlist3">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Sections 3</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/addsection3">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Section 3</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className=" single-element  ">
              <div className="item">
                <Link to="/sectionlist4">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Sections 4</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/addsection4">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Section 4</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="single-element   ">
              <div className="item">
                <Link to="/sectionlist5">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Sections 5</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/addsection5">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Section 5</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="single-element ">
              <div className="item">
                <Link to="/sectionlist6">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Sections 6</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/addsection6">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Section 6</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className=" single-element ">
              <div className="item">
                <Link to="/Status-List-Admin">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Status</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/add-status-admin">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Status</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="single-element ">
              <div className="item">
                <Link to="/settinglist">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste des Settings</span>
                </Link>
              </div>
              <div className="item">
                <Link to="/filessettinges">
                  <img src={listicon} className="icon-add" alt="" />
                  <span className="link-slider">Liste de fichiers settings</span>
                </Link>
              </div>
              {/* <div className="item">
                <Link to="/addsetting">
                  <img src={addicon} className="icon-add" alt="" />
                  <span className="link-slider">Ajouter Setting</span>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
