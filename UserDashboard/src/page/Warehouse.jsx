import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllWarehouse } from "../Redux/Feature/warehouseSlice";
import UpdateModal from "../page/UpdateModal";

function Warehouse() {
  const dispatch = useDispatch();
  const [isUpdate,setUpdate] = useState(false);
  const [selected,setSelected] = useState(null)

  
  const {
    warehouse = [],
    loading,
    error,
  } = useSelector((state) => state.warehouse || { warehouse: [] });

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllWarehouse());
  }, [dispatch]);
  const onClose =()=>{
    setSelected(false)
  }

  // ✅ Ensure filtering only happens if warehouse is an array
  const filteredWarehouse = warehouse.filter((wh) =>
    ["name", "phone", "location", "manager"].some((key) =>
      wh[key]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );


  const handleUpdate = (wh)=>{
        setUpdate(true);
        setSelected(wh)
  }

  return (
    <div className="mt-15 min-h-screen bg-blue-300 py-12 px-4 sm:px-6 lg:px-8 xl:ml-72">
      <h1 className="text-2xl font-bold mb-6">Warehouse List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, phone, location, or manager..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-400 rounded-lg"
      />

      {/* Show Loading or Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Warehouses */}
      {filteredWarehouse.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWarehouse.map((wh) => (
            <div
              key={wh._id}
              className=" relative p-4 bg-white shadow-lg rounded-lg"
            >
              <button onClick={()=>handleUpdate(wh)} className="absolute top-2 right-2 px-4 py-1 border bg-gray-200 rounded">
                Edit
              </button>

              <h2 className="text-lg font-semibold">{wh.warehouseName}</h2>
              <p className="text-gray-700">📍 Location: {wh.location}</p>
              <p className="text-gray-700">👤 Manager: {wh.manager}</p>
              <p
                className={`font-semibold ${
                  wh.status === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {wh.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-gray-600 text-center mt-4">No warehouses found</p>
        )
      )}

  
      {isUpdate && <UpdateModal onClose={()=>setUpdate(false)} selected={selected}/>}
    </div>
  );
}

export default Warehouse;
