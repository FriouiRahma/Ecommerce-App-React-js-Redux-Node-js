import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import closeIcon from "../../icons/close-icon.svg";

export const EditorBoutique = ({
  connecteduser,
  boutiquesList,
  loading,
  isAuthenticated,
  commandelist,
  boutiqueu
}) => {
  let iduser = null;
  /**id user begin here */
  if (isAuthenticated) {      

    iduser = connecteduser._id;
    console.log("iduser", iduser);
  }
  /**id user End here */

  let BoutiqueEditor = [];
  if (boutiquesList && boutiquesList.length !== 0) {
    boutiquesList.map((el) => {
      el.editors.map((Ed) => {
        if (Ed.editor === iduser) {
          BoutiqueEditor = [...BoutiqueEditor, el];
        }
      });
    });
  }

  console.log("BoutiqueEditor", BoutiqueEditor);
  // const btouiqueidcommande=

  return (
    
      <div className='boutique-editors'>
        <div  className='info-editors-bout'>
        {BoutiqueEditor &&
          BoutiqueEditor.length !== 0 &&
          BoutiqueEditor.map((el, index) => (
            <div key={index}>
              <Link to={`/commande-boutique/${el._id}`}>{el.name}</Link>
            </div>
          ))}
          </div>
      </div>
   
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
    connecteduser: state.users.user,
    boutiquesList: state.boutiques.list,
    commandelist: state.commandes.allcommand,
    boutiqueu: state.boutiques.boutiqueuser,
  };
};

export default connect(mapStateToProps)(EditorBoutique);
