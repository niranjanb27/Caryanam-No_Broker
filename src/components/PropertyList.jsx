import PropertyCard from "./PropertyCard";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const PropertyList = ({ properties }) => {
  return (
    <div>
      <p className="mb-6 text-gray-600 font-medium">
        {properties.length} Properties Found
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {properties.map((p) => (
          <motion.div key={p.id} variants={item}>
            <PropertyCard property={p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PropertyList;
