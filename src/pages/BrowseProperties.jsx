import { useState } from "react";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import PropertyList from "../components/PropertyList";

const BrowseProperties = () => {

  const [filters, setFilters] = useState({
    type: "All",
    minPrice: "",
    maxPrice: "",
  });

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

  // 🔥 FILTER LOGIC
  const filteredProperties = properties.filter((item) => {

    const matchType =
      filters.type === "All" || item.type === filters.type;

    const matchMin =
      filters.minPrice === "" || item.price >= Number(filters.minPrice);

    const matchMax =
      filters.maxPrice === "" || item.price <= Number(filters.maxPrice);

    return matchType && matchMin && matchMax;
  });

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
  <Navbar />

  <div className="max-w-7xl mx-auto px-6 py-6">
    
    <h1 className="text-3xl font-semibold text-gray-800">
      Browse Properties
    </h1>

    <p className="text-gray-500 mt-1 mb-6">
      Find your dream home without any brokerage
    </p>

    <Filter filters={filters} setFilters={setFilters} />

    <div className="mt-8">
      <PropertyList properties={filteredProperties} />
    </div>
  </div>
</div>
  );
};

export default BrowseProperties;