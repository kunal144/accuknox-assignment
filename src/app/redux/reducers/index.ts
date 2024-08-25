import { combineReducers } from "@reduxjs/toolkit";

import widgetSlice from "./widgetSlice";
const rootReducer = combineReducers({
  handleWidget: widgetSlice,
});

export default rootReducer;
