import { configureStore} from "@reduxjs/toolkit";
import { fgoApi } from "../api/FgoSlice";
import cartSlice from "./cart-slice";


const store = configureStore({
  reducer: {
    [fgoApi.reducerPath]:fgoApi.reducer,
    cart: cartSlice.reducer ,
  },
  middleware:getDefaultMiddleware=>
    getDefaultMiddleware().concat(fgoApi.middleware)
  
});
export default store;
