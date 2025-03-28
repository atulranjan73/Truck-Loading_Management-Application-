import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDriver } from "../Redux/Feature/driverSlice";
import {getAllWarehouse} from "../Redux/Feature/warehouseSlice"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

function Home() {
  const dispatch = useDispatch();
  
  // Fetching driver data from Redux
  const { drivers, loading: driverLoading, error: driverError } = useSelector((state) => state.driver);
const { warehouse, loading: warehouseLoading, error: warehouseError } = useSelector((state) => state.warehouse);

  
  // Fetch driver data on component mount
  useEffect(() => {
    dispatch(getAllDriver());
  }, [dispatch]);


  useEffect(() => {
  dispatch(getAllWarehouse());
  }, [dispatch]);

  const username = "Admin";
  
  const loadedTrucks = 320;
  const inTransitTrucks = 150;
  const deliveredTrucks = 30;
  

  const totalDrivers = drivers?.length || 0; 
  const totalWarehouse = warehouse?.length || 0;

  // Dummy data for BarChart (Truck Loads per Month)
  const barData = [
    { month: "Jan", trucks: 40 },
    { month: "Feb", trucks: 50 },
    { month: "Mar", trucks: 45 },
    { month: "Apr", trucks: 60 },
    { month: "May", trucks: 55 },
    { month: "Jun", trucks: 70 },
  ];

  // Data for PieChart (Truck Status)
  const pieData = [
    { name: "Loaded", value: loadedTrucks },
    { name: "In Transit", value: inTransitTrucks },
    { name: "Delivered", value: deliveredTrucks },
  ];

  const COLORS = ["#22c55e", "#facc15", "#2563eb"]; // Green, Yellow, Blue

  return (
    <div className="mt-15 min-h-screen bg-blue-300 py-12 px-4 sm:px-6 lg:px-8 xl:ml-72">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-black text-center tracking-tight">
          Welcome, <span className="text-white bg-blue-500 px-3 py-1 rounded-full shadow-md">{username}</span>!
        </h1>

        {/* Truck & Driver Statistics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-purple-500 rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-200 uppercase font-medium">Total Drivers</p>
        
              <h4 className="text-2xl font-bold text-white">{totalDrivers}</h4>
        
          </div>
          <div className="bg-blue-500 rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-200 uppercase font-medium">Total Warehouse</p>
            <h4 className="text-2xl font-bold text-white">{totalWarehouse}</h4>
          </div>
          <div className="bg-green-500 rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-200 uppercase font-medium">Loaded</p>
            <h4 className="text-2xl font-bold text-white">{loadedTrucks}</h4>
          </div>
          <div className="bg-yellow-500 rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-900 uppercase font-medium">In Transit</p>
            <h4 className="text-2xl font-bold text-black">{inTransitTrucks}</h4>
          </div>
          <div className="bg-blue-600 rounded-xl p-6 shadow-lg">
            <p className="text-sm text-gray-200 uppercase font-medium">Delivered</p>
            <h4 className="text-2xl font-bold text-white">{deliveredTrucks}</h4>
          </div>
         
        </div>

        {/* Graphs */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bar Chart - Truck Loads per Month */}
          <div className="bg-blue-400 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Truck Loads Per Month</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis dataKey="month" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip contentStyle={{ backgroundColor: "#374151", borderRadius: "8px", color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#ffffff" }} />
                <Bar dataKey="trucks" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Truck Status Distribution */}
          <div className="bg-blue-400 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Truck Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#374151", borderRadius: "8px", color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#ffffff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
