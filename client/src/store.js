import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import setAuthToken from "./utils/setAuthToken";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = { users: { token: null } };

store.subscribe(() => {
  console.log("subscribed store");

  let previousState = currentState;
  currentState = store.getState();

  if (previousState.users.token !== currentState.users.token) {
    const token = currentState.users.token;
    setAuthToken(token);
  }
});

export default store;
