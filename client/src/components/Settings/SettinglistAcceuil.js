import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadsettings } from "../../actions/settings";
import data from "../../utils/default.json";
const SettinglistAcceuil = ({ loadsettings, settinglist }) => {
  console.log("settinglist",settinglist)
  useEffect(() => {
    loadsettings();
  }, [loadsettings]);
  return (
    <div className="bottoms-item">
      {settinglist &&
        settinglist.length !== 0 &&
        settinglist.map((el) => (
          <React.Fragment key={el._id}>
            <div>{el.lienright}</div>
            <div className="accueil">
              <figure>
                <img src={`${data.backUrl}/uploads/settings/${el.image1}`} alt="" />
              </figure>
            </div>
            <div className="annonces">
              <figure>
                <img src={`${data.backUrl}/uploads/settings/${el.image2}`} alt="" />
              </figure>
            </div>
          </React.Fragment>
        ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    settinglist: state.settings.listsettings,
  };
};

export default connect(mapStateToProps, { loadsettings })(SettinglistAcceuil);
