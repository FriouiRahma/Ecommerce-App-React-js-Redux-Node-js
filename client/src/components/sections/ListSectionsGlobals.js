import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getsectionbytype } from "../../actions/globalsections";
import { addsectionbytype, getallsectionsglobal } from "../../actions/globalsections";
import { deletesectionbytype } from "../../actions/globalsections";
import { loadSectiontype2 } from "../../actions/sectiontype2";
import { loadSectiontype4 } from "../../actions/sectiontype4";
import { loadSectiontype3 } from "../../actions/sectiontype3";
import { loadSectiontype5 } from "../../actions/sectiontype5";
import { loadSectiontype6 } from "../../actions/sectiontype6";
import { loadSections } from "../../actions/sections";
import { modiforder } from "../../actions/globalsections";
import deleteIcon from "../../icons/dustbin.svg";
import okMark from "../../icons/okmark.svg";
import cancel from "../../icons/cancel.svg";
import addIcon from "../../icons/add.svg";
import AdminLayout from "../layout/AdminLayout";
import { Redirect } from "react-router-dom";

const ListSectionsGlobals = ({
  sectionlist6,
  loadSectiontype6,
  loadSectiontype2,
  sectionlist5,
  getallsectionsglobal,
  getsectionbytype,
  globalsectionlist,
  addsectionbytype,
  deletesectionbytype,
  allglobalsections,
  sectionlist1,
  sectionlist2,
  sectionlist3,
  sectionlist4,
  loadSectiontype3,
  loadSections,
  loadSectiontype5,
  modiforder,
  isAuthenticated,
  loading,
}) => {
  let GlobalSections = [];
  const [type, setType] = useState(1);

  useEffect(() => {
    getallsectionsglobal();
    loadSectiontype2();
    loadSectiontype4();
    loadSectiontype3();
    loadSectiontype5();
    loadSectiontype6();
    loadSections();
  }, [loadSectiontype2]);

  if (sectionlist1 && sectionlist1.length !== 0) {
    sectionlist1.map((el) => {
      allglobalsections.map((sect) => {
        if (el._id === sect.id_sections_type) {
          GlobalSections = [...GlobalSections, el];
        }
      });
    });
  }
  if (sectionlist2 && sectionlist2.length !== 0) {
    sectionlist2.map((el) => {
      allglobalsections.map((sect) => {
        if (el._id === sect.id_sections_type) {
          GlobalSections = [...GlobalSections, el];
        }
      });
    });
  }
  if (sectionlist3 && sectionlist3.length !== 0) {
    sectionlist3.map((el) => {
      allglobalsections.map((sect) => {
        if (el._id === sect.id_sections_type) {
          GlobalSections = [...GlobalSections, el];
        }
      });
    });
  }
  if (sectionlist4 && sectionlist4.length !== 0) {
    sectionlist4.map((el) => {
      allglobalsections.map((sect) => {
        if (el._id === sect.id_sections_type) {
          GlobalSections = [...GlobalSections, el];
        }
      });
    });
  }
  if (sectionlist5 && sectionlist5.length !== 0) {
    sectionlist5.map((el) => {
      allglobalsections.map((sect) => {
        if (el._id === sect.id_sections_type) {
          GlobalSections = [...GlobalSections, el];
        }
      });
    });
  }
  if (sectionlist6 && sectionlist6.length !== 0) {
    sectionlist6.map((el) => {
      allglobalsections.map((sect) => {
        if (el._id === sect.id_sections_type) {
          GlobalSections = [...GlobalSections, el];
        }
      });
    });
  }
  console.log("allglobalsectionsrahmmmmmma", GlobalSections);
  const GlobalSections1 = GlobalSections.filter((item, index) => {
    return GlobalSections.indexOf(item) === index;
  });
  let FilterSectionHome = [];

  GlobalSections = [...GlobalSections1];
  console.log("GlobalSections", GlobalSections);

  const handelChangeParent = (e) => setType(e.target.value);
  const getsections = () => {
    getsectionbytype({ type });

    if (globalsectionlist && globalsectionlist.length !== 0) {
      globalsectionlist.map((el) => {
        allglobalsections.map((sect) => {
          if (el._id !== sect.id_sections_type) {
            FilterSectionHome = [...FilterSectionHome, el];
          }
        });
      });
    }
    console.log("FilterSectionHome", FilterSectionHome);
  };
  const addsectionhome = (id) => {
    addsectionbytype({ typesection: type, idsectiontype: id });
  };

  const [statemode, SetStatemode] = useState({
    valeur: [],
    idTabInput: -1,
    idTabVal: -1,
    isInEditmode: false,
  });
  const { valeur, idTabInput, idTabVal, isInEditmode } = statemode;
  const changeEditMode = (e, argument) => {
    SetStatemode({ ...statemode, idTabInput: e.target.dataset.id, [e.target.dataset.id]: argument });
    console.log("you should go to Edit mode now ", statemode);
  };
  const onChangemode = () => {
    SetStatemode({ ...statemode, idTabInput: -1 });
  };
  let textInput = React.createRef();
  const handleClick = (e, index, idord) => {
    modiforder({ id: idord, neworder: textInput.current.value });
    SetStatemode({ ...statemode, [e.target.dataset.id]: textInput.current.value, idTabInput: -1, idTabVal: index });
    //console.log(textInput.current.value);
  };
  const header = (
    <thead>
      <tr>
        <th width="30%">ordre</th>
        <th width="30%">name</th>
        <th width="30%">type</th>
        <th width="10%"></th>
      </tr>
    </thead>
  );
  if (!isAuthenticated) {
    if (!loading) return <Redirect to="/login" />;
  }
  return (
    <div className="container">
      <div className="section-global-admin">
        <h1>Liste de Sections d'accueil</h1>
        <div className="row">
          <div className="col-lg-9">
            <table>
              {GlobalSections && GlobalSections.length !== 0 && header}
              <tbody>
                {allglobalsections.map((sect, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>
                        {idTabInput == index ? (
                          <div>
                            <input ref={textInput} type="text" defaultValue={statemode[index]} />
                            <img data-id={`${index}`} title="valider" src={cancel} alt="" className="cancel-icon" onClick={onChangemode} />
                            <img data-id={`${index}`} title="valider" src={okMark} alt="" className="ok-icon" onClick={(e) => handleClick(e, index, sect._id)} />
                          </div>
                        ) : (
                          <div data-id={`${index}`} onDoubleClick={(e) => changeEditMode(e, sect.ordere)}>
                            {/* {idTabVal==index? statemode[index]:sect.ordere } */}
                            {sect.ordere}
                          </div>
                        )}
                      </td>
                      <td>
                        {GlobalSections &&
                          GlobalSections.length !== 0 &&
                          GlobalSections.filter((el) => el._id == sect.id_sections_type).length !== 0 &&
                          GlobalSections.filter((el) => el._id == sect.id_sections_type)[0].name}
                      </td>
                      <td className="itemsec"> {sect.Type_section}</td>
                      <td>
                        <img title="Delete" src={deleteIcon} alt="" className="deleteicon" onClick={() => deletesectionbytype(sect.id_sections_type)} />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="title-Select ">Selectionner type section</h3>
        <div className=" row">
          <div className=" select-style col-lg-9">
            <select onChange={handelChangeParent}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>

            <button className="btn btngetsec" onClick={getsections}>
              get section
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <table>
              <thead>
                {globalsectionlist && globalsectionlist.length !== 0 && (
                  <tr>
                    <th width="60%">name </th>
                    <th width="30%">titre</th>
                    <th width="10%"></th>
                  </tr>
                )}
              </thead>

              <tbody>
                {globalsectionlist &&
                  globalsectionlist.length !== 0 &&
                  globalsectionlist.map((el, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td> {el.name}</td>
                        <td> {el.titre} </td>
                        <td>
                          <img src={addIcon} className="add-Icon" onClick={() => addsectionhome(el._id)} title="ajouter à la page accueil " />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    globalsectionlist: state.globalsections.sectionsbytype,
    allglobalsections: state.globalsections.globalSection,
    sectionlist1: state.sections.listsection,
    sectionlist2: state.sectiontype2.listsectype2,
    sectionlist3: state.sectiontype3.listsectype3,
    sectionlist4: state.sectiontype4.listsectype4,
    sectionlist5: state.sectiontype5.listsectype5,
    sectionlist6: state.sectiontype6.listsectype6,
    isAuthenticated: state.users.isAuthenticated,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps, {
  loadSectiontype6,
  getsectionbytype,
  addsectionbytype,
  deletesectionbytype,
  getallsectionsglobal,
  loadSectiontype2,
  loadSectiontype4,
  loadSectiontype3,
  loadSections,
  loadSectiontype5,
  modiforder,
})(ListSectionsGlobals);
