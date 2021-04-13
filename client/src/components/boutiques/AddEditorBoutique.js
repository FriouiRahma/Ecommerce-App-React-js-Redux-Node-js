import React, { useState } from "react";
import { connect } from "react-redux";
import { addcommecial, removecommerciel } from "../../actions/Boutiques";
import close from "../../icons/close (2).svg";
const AddEditorBoutique = ({ addcommecial, removecommerciel, editors, idboutique }) => {
  const blankproduct = null;
  const [commercielState, setCommercielState] = useState([blankproduct]);
  const addInput = () => {
    setCommercielState([...commercielState, blankproduct]);
  };
  const handleCommerChange = (e) => {
    const updatedCommercial = [...commercielState];
    updatedCommercial[e.target.dataset.idx] = e.target.value;
    setCommercielState(updatedCommercial);
  };
  const deleteelement = (idx) => {
    setCommercielState(commercielState.filter((el, id) => id !== idx));
  };
  const onSubmitcommercial = (e) => {
    e.preventDefault(e);
    const add = addcommecial({
      id: idboutique,
      editors: commercielState,
    });
    if (add) {
      setCommercielState([blankproduct]);
    }
  };

  return (
    <div>
      <table className="table-commercial">
        <thead>
          <tr>
            <th>Nom/Prénom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {editors &&
            editors.length !== 0 &&
            editors.map((Ed, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{Ed.editor && Ed.editor !== null && Ed.editor.firstname}</td>
                    <td>{Ed.editor && Ed.editor !== null && Ed.editor.email}</td>
                    <td>
                      <img
                        src={close}
                        alt=""
                        className="close-icon"
                        onClick={() => {
                          removecommerciel({
                            id: idboutique,
                            idediteur: Ed.editor._id,
                          });
                          console.log("datatoremove", Ed.editor._id);
                        }}
                        alt=""
                      />
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
      {/* add commercial**************************************************************************************** */}
      <div>
        <input type="button" value="+" className="btn" onClick={addInput} />
        {commercielState &&
          commercielState.length !== 0 &&
          commercielState.map((val, idx) => {
            const commerId = `commercial-${idx}`;
            return (
              <div key={idx} style={{ display: "flex", alignItems: "flex-end" }}>
                <div>
                  <label style={{ fontFamily: "serif", fontSize: "20px" }} htmlFor="">
                    Commercial ID
                  </label>
                  <input   value={val || ""} type="text" name="commercial" data-idx={idx} id={commerId} onChange={handleCommerChange} />
                </div>
                {commercielState[idx] !== null && <img src={close} className="close-icon" onClick={() => deleteelement(idx)} />}
              </div>
            );
          })}
        <button className="btn btn-primary mt-20" onClick={(e) => onSubmitcommercial(e)}>
          Ajouter Commercial
        </button>
        {/* end add commercial**************************************************************************************** */}
      </div>
    </div>
  );
};

export default connect(null, { addcommecial, removecommerciel })(AddEditorBoutique);
