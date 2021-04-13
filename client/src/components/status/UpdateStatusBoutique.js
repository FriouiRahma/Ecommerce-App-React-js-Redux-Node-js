import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updatestatusboutique } from "../../actions/status";
import { Redirect } from "react-router-dom";
import close from "../../icons/close (2).svg";
import Select from "react-select";

const UpdateStatusBoutique = ({ currentBoutiqueUser, statuslist, match, updatestatusboutique, isAuthenticated, loading, history }) => {
  const currentstatus = statuslist.filter((el) => el._id === match.params.id);
  const currstatus = currentstatus[0];

  const currentBoutique = currentBoutiqueUser && currentBoutiqueUser.length !== 0 && currentBoutiqueUser[0];
  const idboutique = currentBoutique && currentBoutique !== null && currentBoutique._id;
  const statuslistboutique = statuslist && statuslist.filter((st) => st.id_boutique === idboutique);
  const statusflistboutique = statuslistboutique && statuslistboutique.filter((ft) => ft._id !== match.params.id);

  // let statusopt = [];
  // statusopt = statuslistboutique.map((el) => {
  //   return { value: el._id, label: el.name };
  // });
  const [statusoptions, SetStatusoptions] = useState([]);
  // statuslistboutique.map((el) => (statusopt = [...statusopt, { value: el._id, label: el.name }]));

  const [formData, setFormData] = useState({
    name: "",
    couleur: "",
  });
  const [disabledopt, SetDisabledopt] = useState([]);

  const [selectedOption, SetSelectedOption] = useState(null);

  const [namenextstatus, SetNamenextstatus] = useState([]);

  const handleChange = (selectedOption) => {
    SetSelectedOption(selectedOption);
    SetStatusoptions(statusoptions.map((el) => (el.value === selectedOption.value ? { ...el, isdisabled: true } : el)));
    SetNamenextstatus([...namenextstatus, selectedOption.value]);
  };

  const nextStatusName = (id) => {
    let stat = statuslist.filter((st) => st._id === id);
    return stat.map((el, idx) => (
      <tr key={idx}>
        <td>{el.name}</td>
        <td>
          <img src={close} style={{ width: "18px" }} onClick={() => deleteelement(el._id)} alt="" />
        </td>
      </tr>
    ));
  };
  let stat = [];
  const sss = (sl) => {
    let ttt = currstatus.next_status.map((nst) => (nst === sl.value ? { ...sl, isdisabled: true } : sl));
    stat = [...stat, ttt[0]];
    console.log("stat", stat);
  };

  const assss = async () => {
    const tt = await statusoptions.map(async (sl) => {
      const apt = await sss(sl);
      SetDisabledopt(stat);
    });
  };

  const deleteelement = (idnxtele) => {
    SetNamenextstatus(namenextstatus.filter((nt) => nt !== idnxtele));
    SetStatusoptions(statusoptions.map((el) => (el.value === idnxtele ? { ...el, isdisabled: false } : el)));
  };

  useEffect(() => {
    if (statusflistboutique) {
      SetStatusoptions(
        statusflistboutique.map((el) => {
          return { value: el._id, label: el.name };
        })
      );
    }

    if (currstatus) {
      SetNamenextstatus(currstatus.next_status);
      setFormData((prevItems) => {
        return {
          ...prevItems,
          name: currstatus.name,
          couleur: currstatus.couleur,
          id: currstatus._id,
        };
      });
    }
  }, [currstatus]);
  const { name, couleur } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    updatestatusboutique({ ...formData, next_status: namenextstatus }, history);
  };

  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div>
      <div className="container update-status-boutique">
        <h1> Modifier status </h1>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Nom status</label>
            <input id="name" type="text" placeholder="name" name="name" value={name} onChange={(e) => onChange(e)} />
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="favcolor">Couleur status</label>
            </div>
            <div className="input-groupe">
              <input className="prem-input" type="color" id="favcolor" name="couleur" value={couleur} onChange={(e) => onChange(e)} />
              <input className="deux-input" type="text" name="couleur" value={couleur} onChange={(e) => onChange(e)} />
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{namenextstatus && namenextstatus !== null && namenextstatus.map((nt) => nextStatusName(nt))}</tbody>
            </table>
          </div>
          <div>
            <div style={{ width: "50%", marginBottom: "15px", marginTop: "15px" }}>
              <Select isOptionDisabled={(option) => option.isdisabled} value={selectedOption} onChange={handleChange} options={statusoptions} />
            </div>
          </div>

          <input type="submit" className="btn btn-primary" value="Update status" />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    statuslist: state.status.liststatus,
    isAuthenticated: state.users.isAuthenticated,
    currentBoutiqueUser: state.boutiques.boutiqueuser,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, { updatestatusboutique })(UpdateStatusBoutique);
