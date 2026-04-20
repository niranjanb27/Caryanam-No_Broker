import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Info, MessageCircle, Eye } from "lucide-react"; // Recommended: npm install lucide-react

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden border border-gray-100 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={property.image}
          className="h-60 w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
          alt={property.title}
        />
        
        {/* Badge with Glassmorphism */}
        <div className="absolute top-4 left-4 backdrop-blur-md bg-white/70 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border border-white/50">
          {property.type}
        </div>
        
        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg font-semibold">
          ₹{Number(property.price || 0).toLocaleString()}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
          {property.title}
        </h2>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin size={16} className="mr-2 text-blue-500" />
            <span className="truncate">{property.location}</span>
          </div>
          
          <div className="flex items-center text-slate-500 text-sm">
            <Phone size={16} className="mr-2 text-green-500" />
            <span>{property.phone}</span>
          </div>

          <div className="flex items-start text-slate-400 text-xs leading-relaxed mt-2 line-clamp-2 italic">
            <Info size={14} className="mr-2 mt-0.5 flex-shrink-0" />
            {property.details}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/property/${property.id}`)}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-50 text-slate-700 font-medium py-3 rounded-2xl hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <Eye size={18} />
            Details
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <MessageCircle size={18} />
            Chat
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;