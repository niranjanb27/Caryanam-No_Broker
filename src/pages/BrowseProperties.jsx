import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import PropertyList from "../components/PropertyList";

const BrowseProperties = () => {

  const [appliedFilters, setAppliedFilters] = useState({
    type: "All",
    minPrice: "",
    maxPrice: "",
  });

  const [tempFilters, setTempFilters] = useState(appliedFilters);

  const properties = [
    {
      id: 1,
      type: "Apartment",
      title: "Luxury Skyline Apartment",
      price: 4500000,
      location: "Bandra West, Mumbai",
      phone: "9876543210",
      details: "3 BHK · 1450 sqft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
    {
      id: 2,
      type: "Villa",
      title: "Elegant Garden Villa",
      price: 8500000,
      location: "Whitefield, Bangalore",
      phone: "9876543211",
      details: "4 BHK · 3200 sqft",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    
   {
      id: 3,
      type: "House",
      title: "Cozy Independent House",
      price: 3200000,
      location: "Anna Nagar, Chennai",
      phone: "9876543212",
      details: "3 BHK · 1800 sqft",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    },
  ];

  const filteredProperties = properties.filter((item) => {
    const matchType =
      appliedFilters.type === "All" || item.type === appliedFilters.type;

    const matchMin =
      appliedFilters.minPrice === "" ||
      item.price >= Number(appliedFilters.minPrice);

    const matchMax =
      appliedFilters.maxPrice === "" ||
      item.price <= Number(appliedFilters.maxPrice);

    return matchType && matchMin && matchMax;
  });

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 py-6"
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          Browse Properties
        </h1>

        <p className="text-gray-500 mb-6">
          Find your dream home without any brokerage
        </p>

        <Filter
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          applyFilters={() => setAppliedFilters(tempFilters)}
          clearFilters={() => {
            const reset = { type: "All", minPrice: "", maxPrice: "" };
            setTempFilters(reset);
            setAppliedFilters(reset);
          }}
        />

        <div className="mt-8">
          <PropertyList properties={filteredProperties} />
        </div>
      </motion.div>
    </div>
  );
};

export default BrowseProperties;