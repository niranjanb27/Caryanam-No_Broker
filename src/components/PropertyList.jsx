import PropertyCard from "./PropertyCard";

const PropertyList = ({ properties }) => {
  return (
    <div>
      <p className="mb-4 text-sm text-gray-600">
        {properties.length} Properties Found
      </p>

      {properties.length === 0 ? (
        <p className="text-gray-500">No properties match your filters</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;