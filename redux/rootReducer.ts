import { combineReducers } from "redux";
import { todosApi } from "./api/todosApi";

// import slices

const rootReducer = combineReducers({
  [todosApi.reducerPath]: todosApi.reducer,
});

export default rootReducer;
