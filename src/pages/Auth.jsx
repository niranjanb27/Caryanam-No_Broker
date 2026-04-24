
import { useState, useEffect } from "react";
import { authApi } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const channel = new BroadcastChannel("auth");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
    role: "USER",
  });

  useEffect(() => {
    channel.onmessage = (msg) => {
      if (msg.data === "logout") {
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    const syncLogout = (event) => {
      if (event.key === "logout") {
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
      channel.close();
    };
  }, [navigate]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "email") value = value.toLowerCase();
    if (e.target.name === "role") value = value.toUpperCase();
    setFormData({ ...formData, [e.target.name]: value });
  };

  const validate = () => {
    if (!isLogin) {
      if (!formData.fullName.trim()) return "Full name is required";
      if (!/^[A-Za-z ]+$/.test(formData.fullName)) return "Only letters allowed";
      if (!/^\d{10}$/.test(formData.mobileNumber)) return "Mobile must be 10 digits";
    }
    if (!formData.email) return "Email required";
    if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(formData.email)) return "Only Gmail allowed";
    if (!formData.password || formData.password.length < 6) return "Password min 6 characters";
    return null;
  };

  const handleRegister = async () => {
    const error = validate();
    if (error) return alert(error);
    try {
      const res =
        formData.role === "ADMIN"
          ? await authApi.registerAdmin(formData)
          : await authApi.registerUser(formData);
      alert(res.data.message);
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  const handleLogin = async () => {
    const error = validate();
    if (error) return alert(error);
    try {
      const res = await authApi.login({
        email: formData.email,
        password: formData.password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      channel.postMessage("login");
      const decoded = jwtDecode(token);
      alert("Login Successful");
      decoded.role === "ADMIN" ? navigate("/admin") : navigate("/user");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin ? handleLogin() : handleRegister();
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    // Changed justify-end to justify-between for left-right spacing
    <div className="min-h-screen flex items-center justify-between px-10 md:px-24 bg-[linear-gradient(to_right,#c026d3_50%,#ffffff_50%)] text-gray-800 overflow-hidden relative">
      
      {/* --- LOGO CENTER --- */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white/10 px-8 py-3 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl z-50 text-xl font-['Poppins'] font-bold tracking-widest uppercase">
        Caryanam Broker
      </div>

      {/* --- BACKGROUND PARTICLES & GLOW --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-black-600/10 rounded-full blur-[100px]" />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
            animate={{ y: [0, -60, 0], x: [0, 30, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-4 h-4 bg-purple-600 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* --- LEFT SIDE: 3D BUILDING CARD --- */}
      <motion.div 
        initial={{ opacity: 10, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}

        className="hidden lg:flex flex-col items-center justify-center w-[900px] h-[700px] relative z-10 
             bg-gradient-to-b from-[#f0abfc] via-[#c026d3] to-[#4c1d95] backdrop-blur-xl rgba(132, 0, 135)
             border border-white/20 shadow-2xl p-10 rounded-none"
        
        
      >
        {/* Card madhla background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64bg-purple-300/30 rounded-full blur-[80px] -z-10" />


        <motion.div
          animate={{ y: [0, -20, 0], rotateY: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ perspective: 1000 }}
        >
           {/* Replace with your Building Image or Icon */}
           <div className="text-[300px] drop-shadow-[0_0_50px_rgba(34,211,238,0.4)]">🏢</div>
        </motion.div>
        <h3 className="mt-8 text-4xl font-['Poppins'] font-bold text-cyan-400">Digital  City</h3>
        <p className="text-gray-400 font-['Poppins'] text-lg"> “Your Trusted Partner in Every Property Deal </p>
      </motion.div>

      {/* --- RIGHT SIDE: LOGIN BOX --- */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, x: 100 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        className="w-[900px] h-[700px] overflow-hidden relative       shadow-2xl"
      >
        <div className="absolute inset-0 bg-white z-0 rounded-l-[40px] " />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168, 85, 247, 0.18),transparent_110%)]" />

        {/* --- FIXED BUILDING START --- */}
<div className="absolute -bottom-10 -right-16 w-[350px] pointer-events-none z-0 opacity-50">
  {/* Glow Effect (Building chya mage) */}
  <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[80px]" />
  
  {/* Building Image - No Motion */}
  {/* --- RIGHT SIDE FIXED BUILDING --- */}
<div className="absolute bottom-0 right-0 w-[200px] md:w-[270px] pointer-events-none z-0">
  <img 
    src="https://cdn-icons-png.flaticon.com/512/10690/10690673.png" 
    alt="Building" 
    className="w-full h-auto opacity-30 grayscale brightness-125 contrast-110"
  />
</div>
</div>

        <motion.div 
          animate={{ x: isLogin ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center p-10 z-10"
        >
          <h2 className="text-5xl font-['Poppins'] mb-4">{isLogin ? "Start Your Property Journey Today!" : "Connecting You to the Right Property, Faster!"}</h2>
          <p className="text-gray-700 font-['Poppins'] mb-6">{isLogin ? "Login with your personal info" : "Create your account"}</p>
        </motion.div>

        <div className={`absolute top-0 w-1/2 h-full flex items-center justify-center transition-all duration-700 ${isLogin ? "right-5" : "left-0"}`}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={isLogin ? "login" : "signup"}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-64"
            >
              <h2 className="text-2xl font-['Poppins'] font-bold text-center mb-4">{isLogin ? "Sign In" : "Create Account"}</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <motion.input variants={itemVariants} name="fullName" placeholder="Full Name" onChange={handleChange}

                     className="w-full p-4 rounded-lg bg-gray-50 border border-gray-400 outline-none focus:border-purple-500 transition-all text-base text-gray-800 placeholder-gray-500" />

                    <motion.input variants={itemVariants} name="mobileNumber" placeholder="Mobile Number" onChange={handleChange}

                     className="w-full p-4.5 rounded-lg bg-gray-50 border border-gray-400 outline-none focus:border-purple-500 transition-all text-base  text-gray-800 placeholder-gray-500" />
                  </>
                )}
                <motion.input variants={itemVariants} name="email" value={formData.email} placeholder="Email" onChange={handleChange}
                
                className="w-full p-4.5 rounded-lg bg-gray-50 border border-gray-400 outline-none focus:border-purple-500 transition-all text-base text-gray-800 placeholder-gray-500" />
                
                <motion.input variants={itemVariants} type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} 
                
                className="w-full p-4.5 rounded-lg bg-gray-50 border border-gray-400 outline-none focus:border-purple-500 transition-all text-base text-gray-800 placeholder-gray-500" />
                
                {!isLogin && (
                  <motion.select variants={itemVariants} name="role" value={formData.role} onChange={handleChange} 
                  
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-400 outline-none text-gray-800 text-base">


                    <option className="text-black" value="USER">USER</option>
                    <option className="text-black" value="ADMIN">ADMIN</option>
                  </motion.select>
                )}

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 py-3.5 rounded-full font-bold shadow-lg shadow-cyan-500/20 text-sm"
                >
                  {isLogin ? "SIGN IN →" : "SIGN UP →"}
                </motion.button>
              </form>

              <p className="text-center mt-7 text-base text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span onClick={() => setIsLogin(!isLogin)}
                 className="text-cyan-400 ml-2 cursor-pointer hover:underline font-medium">
                  {isLogin ? "Sign up" : "Sign in"}
                </span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
