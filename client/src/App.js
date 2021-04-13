import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import Routes from "./components/routing/Routes";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import "./scss/App.scss";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/users";
import { loadCategories } from "./actions/categories";
import { loadstatus } from "./actions/status";
import { nombrelikes } from "./actions/likes";
// import Categories from "./components/layout/Categories";
import { loadBoutiques, allboutwithuser } from "./actions/Boutiques";
import { loadallProducts } from "./actions/Produit";
import { loadSections } from "./actions/sections";
import { loadSliders } from "./actions/sliders";
import { allcommande } from "./actions/commande";
import { loadmessagecommande } from "./actions/message-commandes";
import { loadUsersAdmin } from "./actions/users";
import { getBoutiqueUser } from "./actions/Boutiques";
import { getallsectionsglobal } from "./actions/globalsections";
import { loadSectiontype2 } from "./actions/sectiontype2";
import { loadSectiontype3 } from "./actions/sectiontype3";
import { loadSectiontype4 } from "./actions/sectiontype4";
import { loadSectiontype5 } from "./actions/sectiontype5";
import { loadsettings, getfilessettings } from "./actions/settings";
import Alert from "./components/layout/Alert";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import ReactGA from "react-ga";

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-184023411-1");
}

// import Boutiques from "./components/boutiques/BoutiquesList";

/* Refresh data every 100 seconds */
// setInterval(() => {
//   store.dispatch(loadUser());
//   store.dispatch(loadCategories());
// }, 100000);

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
    store.dispatch(loadCategories());
    store.dispatch(loadstatus());
    store.dispatch(nombrelikes());
    store.dispatch(loadBoutiques());
    store.dispatch(loadallProducts());
    store.dispatch(loadSections());
    store.dispatch(loadSliders());
    store.dispatch(allboutwithuser());
    store.dispatch(allcommande());
    store.dispatch(loadmessagecommande());
    store.dispatch(loadUsersAdmin());
    store.dispatch(getBoutiqueUser());
    store.dispatch(getallsectionsglobal());
    store.dispatch(loadSectiontype2());
    store.dispatch(loadSectiontype3());
    store.dispatch(loadSectiontype4());
    store.dispatch(loadsettings());
    store.dispatch(getfilessettings());

    // To Report Page View

    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <main>
            <Navbar />
            {/* <Categories /> */}
            {/* <Boutiques /> */}
            <div className="alerts-list">
              <Alert />
            </div>
            <Switch>
              <Route exact path="/" component={Landing} />
              <LazyLoadComponent>
                <Route component={Routes} />
              </LazyLoadComponent>
            </Switch>
          </main>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
