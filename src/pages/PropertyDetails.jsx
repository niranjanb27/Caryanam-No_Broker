import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { propertyApi, STATIC_BASE_URL } from "../services/api";
import {
  MapPin, Phone, ArrowLeft, Home,
  Maximize, Layout, Sofa, MessageCircle,
  ChevronRight, Calendar
} from "lucide-react";

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
      try {
        const res = await propertyApi.getById(id);
        const dto = res?.data?.data ?? null;
        if (cancelled) return;
        setProperty(dto);
        const firstImage = Array.isArray(dto?.images) ? dto.images[0] : "";
        setActiveImage(firstImage ? `${STATIC_BASE_URL}/${firstImage}` : "");
      } catch (e) {
        if (cancelled) return;
        setError(e?.response?.data?.message || e?.message || "Failed to load.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  const imageUrls = useMemo(() => {
    const images = Array.isArray(property?.images) ? property.images : [];
    return images.filter(Boolean).map((p) => `${STATIC_BASE_URL}/${String(p).replace(/^\/+/, "")}`);
  }, [property]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to search</span>
          </button>

        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p>Fetching property details...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 text-center">
            <p className="text-lg font-bold">{error}</p>
            <button onClick={() => navigate(-1)} className="mt-4 text-sm underline">Go back</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

                <div className="relative rounded-[2rem] overflow-hidden bg-slate-100 aspect-video lg:h-[450px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={activeImage || "https://via.placeholder.com/800x450"}
                      className="w-full h-full object-cover"
                      alt={property.title}
                    />
                  </AnimatePresence>
                </div>


                {imageUrls.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto mt-4 pb-2 px-2 no-scrollbar">
                    {imageUrls.map((url) => (
                      <button
                        key={url}
                        onClick={() => setActiveImage(url)}
                        className={`relative shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${activeImage === url ? "ring-4 ring-blue-500 scale-95" : "opacity-70 hover:opacity-100"
                          }`}
                      >
                        <img src={url} className="h-20 w-28 object-cover" alt="Property thumbnail" />
                      </button>
                    ))}
                  </div>
                )}
              </section>


              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                <h2 className="text-3xl  text-slate-500 mb-4">Know more about our Property</h2>
                <p className="text-2xl text-slate-800 font-bold leading-relaxed whitespace-pre-line ">
                  {property.description || "No description provided by the owner."}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                  <FeatureBox icon={<Home size={20} />} label="Type" value={property.propertyType} color="blue" />
                  <FeatureBox icon={<Layout size={20} />} label="BHK" value={property.bhkType} color="red" />
                  <FeatureBox icon={<Sofa size={20} />} label="Furnish" value={property.furnishing} color="green" />
                  <FeatureBox icon={<Maximize size={20} />} label="Area" value={property.carpetArea} color="slate" />
                </div>
              </div>
            </div>


            <aside className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">

                {/* Title & Location */}
                <div className="mb-6">
                  <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-slate-500 mt-2">
                    <MapPin size={16} className="mr-1.5 text-blue-500" />
                    <span className="text-sm font-medium">{property.location}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Price
                  </p>
                  <p className="text-4xl font-black text-slate-900">
                    ₹{Number(property.price).toLocaleString()}
                  </p>
                </div>

                {/* SIMPLE CONTACT TEXT SECTION */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center transition-colors ">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Contact Us
                      </p>
                      <p className="text-lg font-bold text-slate-800 tracking-tight">
                        {property.mobileNumber || "Not Provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center transition-colors ">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Listing Owner
                      </p>
                      <p className="text-lg font-bold text-slate-800 tracking-tight capitalize">
                        {property.ownerName || "Private Seller"}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </aside>

          </div>
        )}
      </main>
    </div>
  );
};

// Helper Component for Feature Icons
const FeatureBox = ({ icon, label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    slate: "bg-slate-100 text-slate-600"
  };

  return (
    <div className={`${colors[color] || colors.slate} p-4 rounded-2xl flex flex-col items-center text-center`}>
      <div className="mb-2">{icon}</div>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">{label}</p>
      <p className="text-sm font-bold truncate w-full">{value || "N/A"}</p>
    </div>
  );
};

export default PropertyDetails;