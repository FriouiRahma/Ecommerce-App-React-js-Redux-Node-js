import React, { useState } from "react";
import { addNewtracking } from "../../actions/commande";
import { connect } from "react-redux";
import okMark from "../../icons/okmark.svg";
import cancel from "../../icons/cancel.svg";
const AddTracking = ({ addNewtracking, oneelement }) => {
  /*******tracking field  start*/
  const [statemode, SetStatemode] = useState({
    valeur: "",
    isInEditmode: false,
  });
  const { valeur, isInEditmode } = statemode;
  const changeEditMode = (e, argument) => {
    SetStatemode({ ...statemode, isInEditmode: true, valeur: argument });
    console.log("you should go to Edit mode now ", statemode);
  };
  const onChangemode = () => {
    SetStatemode({ ...statemode, isInEditmode: false });
  };
  let textInput = React.createRef();
  const handleClick = (e, idcomm) => {
    addNewtracking({ id: idcomm, newntacking: textInput.current.value });
    SetStatemode({ ...statemode, valeur: textInput.current.value, isInEditmode: false });
  };
  /*******tracking filed end */

  return (
    <div>
      {isInEditmode === true ? (
        <div style={{ display: "flex" }}>
          <input ref={textInput} type="text" defaultValue={valeur} />
          <img title="valider" src={cancel} alt="" className="cancel-icon" onClick={onChangemode} />
          <img title="valider" src={okMark} alt="" className="ok-icon" onClick={(e) => handleClick(e, oneelement._id)} />
        </div>



      ) : (
        <div onDoubleClick={(e) => changeEditMode(e, oneelement.tracking)}>{oneelement.tracking && oneelement.tracking !== null ? oneelement.tracking : "-"}</div>
      )}
    </div>
  );
};

export default connect(null, { addNewtracking })(AddTracking);
