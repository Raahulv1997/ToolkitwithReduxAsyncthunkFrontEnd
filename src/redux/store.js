import { configureStore } from "@reduxjs/toolkit";
import userDetail from "./featurs/userDetailsSlice";
export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});
