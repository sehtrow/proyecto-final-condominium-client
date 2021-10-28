import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { newReducer } from "./newReducer";

const rootReducer = combineReducers({
   user: userReducer,
   news: newReducer,
});

export default rootReducer;