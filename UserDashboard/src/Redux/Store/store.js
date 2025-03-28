import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Feature/AuthSlice";
import driverSlice from "../Feature/driverSlice";
import warehouseSlice from "../Feature/warehouseSlice";
import TruckSlice from "../Feature/TruckSlice";

const store = configureStore({
    reducer: { 
        auth: authReducer,
        driver: driverSlice,
        warehouse: warehouseSlice,
        truck: TruckSlice 

    }
});

export default store;
