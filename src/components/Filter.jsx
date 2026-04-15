const Filter = ({
  tempFilters,
  setTempFilters,
  applyFilters,
  clearFilters,
}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTempFilters({
      ...tempFilters,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
      
      <div className="flex-1">
        <label className="text-sm text-gray-500">Property Type</label>
        <select
          name="type"
          value={tempFilters.type}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-xl"
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
          placeholder="e.g. 200000"
          value={tempFilters.minPrice}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-xl"
        />
      </div>

      <div className="flex-1">
        <label className="text-sm text-gray-500">Max Price (₹)</label>
        <input
          type="number"
          name="maxPrice"
          placeholder="e.g. 500000"
          value={tempFilters.maxPrice}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-xl"
        />
      </div>

      {/* 🔥 Buttons */}
      <div className="flex gap-2">
        <button
          onClick={clearFilters}
          className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-100"
        >
          Clear
        </button>

        <button
          onClick={applyFilters}
          className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;