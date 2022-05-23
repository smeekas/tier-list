import { createStore } from "redux";
import tierReducer from "../reducer/tierReducer";

import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(tierReducer, composeWithDevTools());

export default store;
