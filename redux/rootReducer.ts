import { combineReducers } from "redux";
import api from "./api/api";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
