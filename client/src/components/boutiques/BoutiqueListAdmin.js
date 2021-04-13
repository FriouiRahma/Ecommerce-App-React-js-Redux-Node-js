import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import noteIcon from "../../icons/note.svg";
import deleteIcon from "../../icons/dustbin.svg";
import AdminLayout from "../layout/AdminLayout";
import { confirmAlert } from "react-confirm-alert";
import { allboutwithuser, removeBoutique, activateboutique, desactivateboutique } from "../../actions/Boutiques";

const BoutiqueListAdmin = ({ boutuserList, allboutwithuser, removeBoutique, activateboutique, desactivateboutique }) => {
  useEffect(() => {
    allboutwithuser();
  }, [allboutwithuser]);

  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => removeBoutique(id),
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
        <div className="boutique-lis-admin">
          
          <h1>Liste des boutiques</h1>
          <div className="bout-group">
            <div className="item-bout">boutique</div>
            <div className="item-bout">propriétaire</div>
            <div className="item-bout"></div>
            <div className="item-bout"></div>
            <div className="item-bout"></div>
          </div>
          {boutuserList &&
            boutuserList.length !== 0 &&
            boutuserList.map((bout) => (
              <div key={bout._id}>
                <div className="bout-group">
                  <div className="item-bout"> {bout.name} </div>
                  <div className="item-bout"> {bout.user !== null && bout.user.firstname}</div>
                  <div className="item-bout">
                    <Link to={`/update-boutique/${bout._id}`}>
                      <img title="Edite" src={noteIcon} alt="" className="icon" />
                    </Link>
                  </div>
                  <div className="item-bout">
                    <img
                      src={deleteIcon}
                      title="Delete"
                      alt=""
                      className="icon delete "
                      onClick={() => {
                        submit(bout._id);
                      }}
                    />
                  </div>
                  <div className="item-bout">
                    {" "}
                    <button
                      className="boutblock "
                      onClick={() => {
                        if (bout.status === "0") {
                          activateboutique(bout._id);
                        } else {
                          desactivateboutique(bout._id);
                        }
                      }}
                    >
                      {bout.status === "0" ? <div title="block" className="blockIcon activate "></div> : <div title="unblock" className="blockIcon  "></div>}
                    </button>
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
    boutuserList: state.boutiques.boutuseradm,
  };
};

export default connect(mapStateToProps, {
  allboutwithuser,
  removeBoutique,
  activateboutique,
  desactivateboutique,
})(BoutiqueListAdmin);
