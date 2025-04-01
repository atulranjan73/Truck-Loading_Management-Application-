import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Feature/AuthSlice";
import driverSlice from "../Feature/driverSlice";
import warehouseSlice from "../Feature/warehouseSlice";
import TruckSlice from "../Feature/TruckSlice";
import TripSlice from "../Feature/TripSlice"

const store = configureStore({
    reducer: { 
        auth: authReducer,
        driver: driverSlice,
        warehouse: warehouseSlice,
        truck: TruckSlice ,
        trip:TripSlice ,

    }
});

export default store;
