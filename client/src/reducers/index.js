import { combineReducers } from "redux";
import users from "./users";
import alert from "./alert";
import categories from "./categories";
import boutiques from "./Boutiques";
import produits from "./Produit";
import commandes from "./commandes";
import messages from "./message-commandes";
import likes from "./likes";
import sections from "./sections";
import globalsections from "./global-sections";
import sectiontype2 from "./sections-type2";
import sectiontype3 from "./sections-type3";
import sectiontype4 from "./sections-type4";
import sectiontype5 from "./sections-type5";
import sectiontype6 from "./sections-type6";
import sliders from "./sliders";
import status from "./status";
import settings from "./settings";

export default combineReducers({
  alert,
  users,
  categories,
  boutiques,
  produits,
  likes,
  commandes,
  sections,
  sliders,
  messages,
  status,
  globalsections,
  sectiontype2,
  sectiontype3,
  sectiontype4,
  sectiontype5,
  sectiontype6,
  settings,
});
