
const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={property.image}
          className="h-52 w-full object-cover"
        />

        <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow">
          {property.type}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800">
          {property.title}
        </h2>

        <p className="text-blue-600 font-bold text-xl mt-2">
          ₹{property.price.toLocaleString()}
        </p>

        <p className="text-gray-500 text-sm mt-2">
          📍 {property.location}
        </p>

        <p className="text-gray-500 text-sm">
          📞 {property.phone}
        </p>

        <p className="text-gray-500 text-sm">
          {property.details}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-5">
          
          <button className="flex-1 border border-gray-300 py-2 rounded-xl text-gray-600 hover:bg-gray-100">
            👁 View Details
          </button>

          <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl hover:opacity-90">
            💬 Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;