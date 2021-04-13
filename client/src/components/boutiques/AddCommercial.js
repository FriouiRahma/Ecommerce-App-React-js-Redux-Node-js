import React, { useState } from "react";
import { connect } from "react-redux";
import { addcommecial } from "../../actions/Boutiques";

const AddCommercial = ({ addcommecial, boutique }) => {
  const boutiqueuser = boutique[0];
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
  const ancientEditor = boutiqueuser && boutiqueuser !== null && boutiqueuser.editors.map((el) => el.editor._id);
  console.log("ancientEditor", ancientEditor);
  // const Editeurs = [
  //   ...(ancientEditor && ancientEditor.length !== 0 && ancientEditor),
  //   commercielState,
  // ];

  const onSubmit = async (e) => {
    e.preventDefault();
    addcommecial({
      id: boutiqueuser && boutiqueuser !== null && boutiqueuser._id,
      editors: commercielState,
    });
  };
  // console.log("commercial sended", {
  //   id: boutiqueuser && boutiqueuser !== null && boutiqueuser._id,
  //   editors: commercielState,
  // });
  // useEffect(() => {
  //   setCommercielState(
  //     boutiqueuser &&
  //       boutiqueuser !== null &&
  //       boutiqueuser.editors &&
  //       boutiqueuser.editors.length !== 0 &&
  //       boutiqueuser.editors.map((el) => el.editor._id)
  //   );
  // }, []);

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="ajout-editeur-boutique">
          <h1>Ajouter Editeur</h1>
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
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boutique: state.boutiques.boutiqueuser,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { addcommecial })(AddCommercial);
