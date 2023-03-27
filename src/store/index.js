import { configureStore} from "@reduxjs/toolkit";
import { fgoApi } from "../api/DataSlice";
import {authApi} from "../api/AuthSlice"
import cartSlice from "./cart-slice";


const store = configureStore({
  reducer: {
    [fgoApi.reducerPath]:fgoApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    cart: cartSlice.reducer ,
  },
  middleware:getDefaultMiddleware=>
    getDefaultMiddleware().concat(fgoApi.middleware,authApi.middleware)
  
});
export default store;
