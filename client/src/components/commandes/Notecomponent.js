import React,{useState} from "react";
import { connect } from "react-redux";
import {addNewNote}  from "../../actions/commande";
const Notecomponent = ({note,iduser,addNewNote}) => {
    const [contenu, setContenu] = useState("");
    const onChangenote = (e) => setContenu(e.target.value );
    const addnote = async ( idcommande) => {
        contenu!== undefined &&
          contenu !== "" &&
          addNewNote(
            {
              id: idcommande,
              newnote: contenu,
              id_user: iduser,
            },
            setContenu("")
          );
      };
   
  return (
    <div>
      <textarea type="text" name={contenu} onChange={(e) => onChangenote(e)} value={contenu} />
      <button className="bouton-envoyer" onClick={() => addnote(note._id)}>
        Ajouter
      </button>
    </div>
  );
};

export default connect(null,{addNewNote})(Notecomponent);
