import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { propertyApi, STATIC_BASE_URL } from "../services/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!id) return;
      setLoading(true);
      setError("");
      setProperty(null);
      setActiveImage("");

      try {
        const res = await propertyApi.getById(id);
        const dto = res?.data?.data ?? null;
        if (cancelled) return;

        setProperty(dto);
        const firstImage = Array.isArray(dto?.images) ? dto.images[0] : "";
        setActiveImage(firstImage ? `${STATIC_BASE_URL}/${firstImage}` : "");
      } catch (e) {
        if (cancelled) return;
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load property details.";
        setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const imageUrls = useMemo(() => {
    const images = Array.isArray(property?.images) ? property.images : [];
    return images
      .filter(Boolean)
      .map((p) => `${STATIC_BASE_URL}/${String(p).replace(/^\/+/, "")}`);
  }, [property]);

  useEffect(() => {
    if (!activeImage && imageUrls.length > 0) setActiveImage(imageUrls[0]);
  }, [activeImage, imageUrls]);

  const formattedPrice = useMemo(() => {
    if (property?.price == null) return "";
    const num = Number(property.price);
    if (Number.isNaN(num)) return String(property.price);
    return num.toLocaleString();
  }, [property]);

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto p-6"
      >
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600"
        >
          ← Back
        </button>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-gray-600">Loading property...</div>
          ) : error ? (
            <div className="p-6">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => navigate(-1)}
                className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-xl"
              >
                Go back
              </button>
            </div>
          ) : !property ? (
            <div className="p-6 text-gray-600">Property not found.</div>
          ) : (
            <>
              {/* IMAGE */}
              <div className="w-full bg-gray-100">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={property.title || "Property image"}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 flex items-center justify-center text-gray-500">
                    No images available
                  </div>
                )}
              </div>

              {/* THUMBNAILS */}
              {imageUrls.length > 1 && (
                <div className="px-6 pt-4">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {imageUrls.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setActiveImage(url)}
                        className={[
                          "shrink-0 rounded-xl overflow-hidden border",
                          activeImage === url
                            ? "border-blue-600"
                            : "border-gray-200",
                        ].join(" ")}
                        title="View image"
                      >
                        <img
                          src={url}
                          alt="Thumbnail"
                          className="h-16 w-24 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* DETAILS */}
              <div className="p-6">
                <h1 className="text-2xl font-semibold">{property.title}</h1>

                {formattedPrice && (
                  <p className="text-black text-xl font-bold mt-2">
                    ₹{formattedPrice}
                  </p>
                )}

                {property.location && (
                  <p className="text-gray-500 mt-2">📍 {property.location}</p>
                )}

                {property.mobileNumber && (
                  <p className="text-gray-500">📞 {property.mobileNumber}</p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {property.propertyType && (
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-gray-700 text-sm">
                      {property.propertyType}
                    </span>
                  )}
                  {property.bhkType && (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-gray-700 text-sm">
                      {property.bhkType}
                    </span>
                  )}
                  {property.furnishing && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-gray-700 text-sm">
                      {property.furnishing}
                    </span>
                  )}
                  {property.carpetArea && (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {property.carpetArea}
                    </span>
                  )}
                </div>

                {property.description && (
                  <p className="mt-4 text-gray-600">{property.description}</p>
                )}

                {/* <div className="mt-6 flex gap-3 flex-wrap">
                  {property.mobileNumber ? (
                    <a
                      href={`tel:${property.mobileNumber}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl inline-block"
                    >
                      Contact Owner
                    </a>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl cursor-not-allowed"
                    >
                      Contact Owner
                    </button>
                  )}

                  <button
                    onClick={() => navigate(-1)}
                    className="bg-white border border-gray-200 text-gray-800 px-6 py-2 rounded-xl"
                  >
                    Back to list
                  </button>
                </div> */}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetails;