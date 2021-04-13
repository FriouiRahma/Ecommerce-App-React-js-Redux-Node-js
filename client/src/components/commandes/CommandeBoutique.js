import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { allcommande, cammandewithstatus } from "../../actions/commande";
import { modifgroupstatus } from "../../actions/commande";
import UserLayout from "../layout/UserLayout";
import Pagination from "react-js-pagination";
import Select from "react-select";
import OneCommandeBoutique from "./OneCommandeBoutique";

export const BoutiqueCommande = ({ boutique, commandelist, allcommande, match, statuslist, cammandewithstatus, commandefiltred, users, modifgroupstatus }) => {
  let userid = "";
  const { isAuthenticated } = users;
  if (isAuthenticated && users.user) {
    userid = users.user._id;
  }
  let idboutique = "";
  idboutique = boutique && boutique.length !== 0 && boutique[0]._id;

  let boutiqueofcommande = null;
  if (boutique && boutique.length !== 0) {
    boutiqueofcommande = boutique[0];
  }
  /********status appartient à ce boutique */
  let statusofboutique = [];
  statusofboutique = statuslist.filter((el) => el.id_boutique === idboutique);
  let defaultstatus = statuslist.filter((el) => el.id_boutique === "0");
  statusofboutique = [...statusofboutique, { _id: "0", name: "En Attente", couleur: "#5d7584" }, ...defaultstatus];
  /********status appartient à ce boutique */
  //statuslist = [...statuslist, { _id: "0", name: "En Attente" }];
  // let statusoptions = [];
  // statusofboutique.map((el) => (statusoptions = [...statusoptions, { value: el._id, label: el.name }]));
  // console.log("statusoptions", statusoptions);
  /******chekbox */
  const Checkbox = ({ type = "checkbox", id, name, checked = false, onChange }) => {
    return <input type={type} value={id} id={id} name={name} checked={checked} onChange={onChange} />;
  };
  const Checkbox1 = ({ type = "checkbox", id, name, checked = false, onChange }) => {
    return <input type={type} value={id} id={id} name={name} checked={checked} onChange={onChange} />;
  };
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedItem, setCheckedItem] = useState({ checked: false });
  const [options] = useState({
    tabid: [],
  });
  const { tabid } = options;
  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.id]: event.target.checked,
    });
    if (event.target.checked) {
      tabid.push(event.target.value);
    } else {
      const index = tabid.indexOf(event.target.id);
      tabid.splice(index, 1);
    }
    console.log("checkedItemscategorie: ", checkedItems);
  };
  console.log("tabid", tabid);
  const secstatus = [...statuslist, { _id: "0", name: "En attente" }];
  const { checked } = checkedItem;

  let multchek = {};
  const handleMultipleChange = () => {
    setCheckedItem({
      ...checkedItem,
      checked: !checked,
    });
    if (!checked) {
      currentTodos &&
        currentTodos !== null &&
        currentTodos.map((el) => {
          if (el) {
            if (el !== null) {
              multchek = { ...multchek, [el._id]: el._id };
              tabid.push(el._id);
            }
          }
        });
      setCheckedItems(multchek);
    } else {
      setCheckedItems({});
    }
  };

  /*******  changement status commande*******/
  const [status, setStatus] = useState();
  const handelChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const changerstatus = () => {
    modifgroupstatus({ idcommande: tabid, statuss: status });
    setCheckedItems({});
    setCheckedItem({ checked: false });
  };

  const [lastcommandes, SetLastcommandes] = useState([]);
  const commandeboutique =
    commandelist &&
    commandelist.length !== 0 &&
    commandelist.filter((el) => boutiqueofcommande && boutiqueofcommande !== null && el.boutique && el.boutique !== null && el.boutique._id === boutiqueofcommande._id);

  statuslist = [...statuslist, { _id: "0", name: "En Attente" }];

  /********status appartient à ce commande */
  let statusofcommande = [];
  let statusofcommande2 = [];
  if (commandeboutique && commandeboutique.length !== 0) {
    commandeboutique.map((el, index) => {
      statusofboutique &&
        statusofboutique.length !== 0 &&
        statusofboutique.map((status, id) => {
          if (el.status === status._id) {
            statusofcommande = [...statusofcommande, status];
          }
        });
    });
  }

  statusofcommande2 = statusofcommande.filter(function (item, pos) {
    return statusofcommande.indexOf(item) === pos;
  });
  statusofcommande = [...statusofcommande2];
  /********************************************** */
  /**** GET Filtred commades in the array Lastcommandes*/
  let commandefiltredstatus = [];
  const filterstatus = (xw) => {
    commandefiltredstatus = commandeboutique.filter((el) => el.status === xw);
    SetLastcommandes(commandefiltredstatus);
  };
  /******************************** */
  ///////////////////////////////////////////////////////////////////////////
  /********pagination start here */
  const todosPerPage = 3;
  const [activePage, setCurrentPage] = useState(1);
  // Logic for displaying current todos
  const indexOfLastTodo = activePage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = lastcommandes && lastcommandes.length !== 0 && lastcommandes.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
  };
  /*********pagination end here */
  /***********filter with date start */
  let commandefiltreddate = [];
  /***********filter with date end */
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let lastwantdate = [];
  let wanteddate = 0;
  commandeboutique &&
    commandeboutique.length !== 0 &&
    commandeboutique.map((el, index) => {
      var theDate = new Date(el.createdAt);
      const mont = theDate.getMonth();
      wanteddate = months[mont] + " " + theDate.getFullYear();
      lastwantdate = [...lastwantdate, wanteddate];
    });

  const wantdate = lastwantdate.filter((item, index) => {
    return lastwantdate.indexOf(item) === index;
  });

  lastwantdate = [...wantdate];
  /******date options */
  let date = new Date();
  const mont = date.getMonth();
  const dateStringd = months[mont] + " " + date.getFullYear();

  let dateoptions = lastwantdate.map((el) => {
    return { value: el, label: el };
  });

  const [selectedOption, SetSelectedOption] = useState();
  const handleChanged = (selectedOption) => {
    SetSelectedOption(selectedOption.name);
    let commandefiltreddate = commandeboutique.filter((el) => {
      let theDate = new Date(el.createdAt);
      const mont = theDate.getMonth();
      const dateString = months[mont] + " " + theDate.getFullYear();
      return dateString == selectedOption.value;
    });
    SetLastcommandes(commandefiltreddate);
  };

  /*******date options */
  useEffect(() => {
    if (boutiqueofcommande && boutiqueofcommande.length !== 0) {
      SetLastcommandes(commandeboutique);
    }
  }, [boutiqueofcommande]);

  return (
    <div className="commande-boutique">
      <UserLayout>
        <div className="commandeboutique">
          <h1 className="commande-title">Commande boutique</h1>
          <div className="seclect-button">
            <div className="filtredbutton">
              {commandeboutique && commandeboutique.length !== 0 && (
                <button className="btn" onClick={() => SetLastcommandes(commandeboutique)}>
                  tous les commandes
                </button>
              )}
              {statusofcommande.map((sat, index) => {
                return (
                  <div key={index}>
                    <button style={{ backgroundColor: sat.couleur }} className="btn btn1" onClick={() => filterstatus(sat._id)}>
                      {sat.name}
                    </button>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="select-style">
                <select onChange={handelChangeStatus}>
                  <option>Action</option>
                  {statusofboutique.map((stat, index) => (
                    <React.Fragment key={index}>
                      <option value={stat._id}>{stat.name}</option>
                    </React.Fragment>
                  ))}
                </select>
                <button className="button-appliquer-status" onClick={changerstatus}>
                  Appliquer
                </button>
              </div>
              <div style={{ width: "250px" }}>
                <Select
                  defaultValue={{ value: dateStringd, label: "Toutes les dates" }}
                  label="Single select"
                  options={dateoptions}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: "#dee2e6",
                      primary: "black",
                    },
                  })}
                  value={selectedOption}
                  onChange={handleChanged}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>
                      <Checkbox1 onChange={handleMultipleChange} checked={checked} />
                    </th>
                    <th>ID Commande</th>
                    <th>Client</th>
                    <th>Adresse</th>
                    <th>Produits</th>
                    <th>Total</th>
                    <th>status</th>
                    <th>Date</th>
                    <th width="10%">Tracking</th>
                    {/* <th>coordonnées client</th> */}
                    <th width="10%">Status suivante</th>
                    <th> Note</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTodos &&
                    currentTodos.length !== 0 &&
                    currentTodos.map((el, index) => {
                      let total = 0;
                      const namestatus = statusofboutique.filter((statu) => statu._id === el.status)[0];
                      return (
                        <React.Fragment key={index}>
                          <OneCommandeBoutique
                            onecommande={el}
                            statusofboutique={statusofboutique}
                            handleChange={handleChange}
                            namestatus={namestatus}
                            chekedone={checkedItems[el._id]}
                          />
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div></div>
        <div className="page">
          <Pagination activePage={activePage} itemsCountPerPage={3} totalItemsCount={lastcommandes.length} pageRangeDisplayed={3} onChange={handlePageChange} />
        </div>
      </UserLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boutique: state.boutiques.boutiqueuser,
    commandelist: state.commandes.allcommand,
    commandefiltred: state.commandes.filtredcommandebystatus,
    messagecommande: state.messages.messlist,
    statuslist: state.status.liststatus,
    users: state.users,
  };
};

export default connect(mapStateToProps, { allcommande, cammandewithstatus, modifgroupstatus })(BoutiqueCommande);
