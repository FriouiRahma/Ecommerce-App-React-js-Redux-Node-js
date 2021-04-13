import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addcommecial } from "../../actions/Boutiques";
import { removecommerciel, getBoutiqueUser } from "../../actions/Boutiques";
import { UserLayout } from "../layout/UserLayout";
import closeIcon from "../../icons/close-icon.svg";

export const EditorListBoutique = ({ isAuthenticated, loading, connecteduser, usersslist, boutique, addcommecial, removecommerciel, getBoutiqueUser }) => {
  let iduser = null;
  /**id user begin here */
  if (isAuthenticated) {
    iduser = connecteduser._id;
  }
  useEffect(() => {
    getBoutiqueUser();
  }, []);

  //const boutiqueuser = boutique[0];
  const blankproduct = null;
  const [commercielState, setCommercielState] = useState([blankproduct]);
  const addProduct = () => {
    setCommercielState([...commercielState, blankproduct]);
  };
  const handleCommerChange = (e) => {
    const updatedCommercial = [...commercielState];
    updatedCommercial[e.target.dataset.idx] = e.target.value;
    setCommercielState(updatedCommercial);
  };

  const boutiqueuser = boutique[0];
  console.log("boutique with editors", boutiqueuser && boutiqueuser !== null && boutiqueuser);
  const onSubmit = async (e) => {
    e.preventDefault();
    addcommecial({
      id: boutiqueuser && boutiqueuser !== null && boutiqueuser._id,
      editors: commercielState,
    });
  };

  return (
    <UserLayout>
      <div className="container">
        <div className="ajout-editeur-boutique">
          <h1> Ajouter editeur </h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <input type="button" value="+" className="btn" onClick={addProduct} />
            {commercielState &&
              commercielState.length !== 0 &&
              commercielState.map((val, idx) => {
                const commerId = `commercial-${idx}`;
                return (
                  <div key={idx}>
                    <label htmlFor="">Commercial ID</label>
                    <input value={val || ""} type="text" name="commercial" data-idx={idx} id={commerId} onChange={handleCommerChange} />
                  </div>
                );
              })}
            <input type="submit" className="btn btn-primary mt-20" value="Ajouter Commercial" />
          </form>
          {boutiqueuser &&
            boutiqueuser !== null &&
            boutiqueuser.editors &&
            boutiqueuser.editors.length !== 0 &&
            boutiqueuser.editors.map((Ed, index) => {
              return (
                <div className="infoEditor" key={index}>
                  <div className="firstname">{Ed.editor && Ed.editor !== null && Ed.editor.firstname}</div>
                  <div className="email">{Ed.editor && Ed.editor !== null && Ed.editor.email}</div>
                  <div className="productItem">
                    <img
                      src={closeIcon}
                      alt=""
                      className="closeIcon"
                      onClick={() => {
                        removecommerciel({
                          id: boutiqueuser && boutiqueuser !== null && boutiqueuser._id,
                          idediteur: Ed.editor._id,
                        });
                        console.log("datatoremove", Ed.editor._id);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </UserLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    boutique: state.boutiques.boutiqueuser,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
    connecteduser: state.users.user,
    //boutiquesList: state.boutiques.list,
    usersslist: state.users.userslist,
  };
};

export default connect(mapStateToProps, { addcommecial, removecommerciel, getBoutiqueUser })(EditorListBoutique);
