const Filter = ({ filters, setFilters }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleClear = () => {
    setFilters({
      type: "All",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
  
  <div className="flex-1">
    <label className="text-sm text-gray-500">Property Type</label>
    <select
      name="type"
      value={filters.type}
      onChange={handleChange}
      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none"
    >
      <option>All</option>
      <option>Apartment</option>
      <option>Villa</option>
      <option>House</option>
    </select>
  </div>

  <div className="flex-1">
    <label className="text-sm text-gray-500">Min Price (₹)</label>
    <input
      type="number"
      name="minPrice"
      value={filters.minPrice}
      onChange={handleChange}
      placeholder="e.g. 2000000"
      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl"
    />
  </div>

  <div className="flex-1">
    <label className="text-sm text-gray-500">Max Price (₹)</label>
    <input
      type="number"
      name="maxPrice"
      value={filters.maxPrice}
      onChange={handleChange}
      placeholder="e.g. 10000000"
      className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl"
    />
  </div>

  <button
    onClick={handleClear}
    className="px-6 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100"
  >
    Clear
  </button>
</div>
  );
};

export default Filter;