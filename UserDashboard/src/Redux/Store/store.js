import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Feature/AuthSlice";
import driverSlice from "../Feature/driverSlice"
import warehouseSlice from "../Feature/warehouseSlice"





const store = configureStore({
    reducer: { 
        auth: authReducer,
        driver:driverSlice,
        warehouse:warehouseSlice
     
    }
});

export default store;
