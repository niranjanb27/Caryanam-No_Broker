import { motion } from "framer-motion";

const PropertyCard = ({ property }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden"
    >
      <div className="relative">
        <img src={property.image} className="h-52 w-full object-cover" />

        <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
          {property.type}
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold">{property.title}</h2>

        <p className="text-blue-600 font-bold text-xl mt-2">
          ₹{property.price.toLocaleString()}
        </p>

        <p className="text-gray-500 text-sm mt-2">📍 {property.location}</p>
        <p className="text-gray-500 text-sm">📞 {property.phone}</p>
        <p className="text-gray-500 text-sm">{property.details}</p>

        <div className="flex gap-3 mt-5">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 border py-2 rounded-xl hover:bg-gray-300"
          >
            👁 View Details
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-blue-700"
          >
            Chat
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;