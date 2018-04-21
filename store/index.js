import { createStore, compose } from "redux";
import reducers from "../src/reducers";

const store = createStore(reducers);


export default store;