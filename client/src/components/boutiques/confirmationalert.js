import React from "react";
import { confirmAlert } from "react-confirm-alert";
import closeIcon from "../../icons/close-icon.svg";
function confirmationalert({ id, remove }) {
  const submit = (id) => {
    confirmAlert({
      message: "Voulez-vous supprimez ce produit?",
      buttons: [
        {
          label: "Yes",
          onClick: () => remove(id),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  return (
    <div >
      <img
        src={closeIcon}
        alt=""
        style={{ height: "25px", width: "25px" }}
        onClick={() => {
          submit(id);
        }}
      />
    </div>
  );
}

export default confirmationalert;
