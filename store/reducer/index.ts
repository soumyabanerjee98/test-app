import { combineReducers } from "redux";
import { searchLocationReducer } from "./function";

const rootReducer = combineReducers({
  searchlocation: searchLocationReducer, //add taskreducer and name is task for future use.
});
export default rootReducer;
