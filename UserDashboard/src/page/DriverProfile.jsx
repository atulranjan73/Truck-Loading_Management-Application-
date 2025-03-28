import React from "react";

const DriverProfile = () => {
  const driver = {
    name: "John Doe",
    phone: "+91 9876543210",
    license: "DL-1234-5678",
    status: "available",
    image: "https://img.freepik.com/free-photo/young-indian-man-dressed-trendy-outfit-monitoring-information-from-social-networks_231208-2766.jpg" // Dummy image URL
  };

  return (
    <div className=" rounded-lg overflow-hidden pt-60  mt-10">
      <img src={driver.image} alt="Driver" className="w-32 h-32 mx-auto rounded-full" />
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">{driver.name}</h2>
        <p className="text-gray-600">Phone: {driver.phone}</p>
        <p className="text-gray-600">License: {driver.license}</p>
        <span
          className={`inline-block px-4 py-1 mt-2 text-sm font-semibold rounded-full ${
            driver.status === "available"
              ? "bg-green-200 text-green-800"
              : driver.status === "on_trip"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {driver.status.replace("_", " ")}
        </span>
      </div>
    </div>
  );
};

export default DriverProfile;