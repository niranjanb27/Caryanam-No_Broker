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

      const role = decoded.role || decoded.roles?.[0];

      if (role === "ROLE_ADMIN") navigate("/admin");
      else if (role === "ROLE_USER") navigate("/user");
      else if (role === "ROLE_PROPERTY_OWNER") navigate("/owner");
      else alert("Unknown role");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    isLogin ? handleLogin() : handleRegister();
  }

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center lg:items-stretch justify-center lg:justify-between px-4 sm:px-6 md:px-10 lg:px-24 bg-[linear-gradient(to_right,#c026d3_50%,#ffffff_50%)] text-gray-800 overflow-hidden relative">

      {/* LOGO */}
      <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 text-lg sm:text-xl font-bold z-50">
        Caryanam Broker
      </div>

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col items-center justify-center flex-1 max-w-[700px] xl:max-w-[900px] min-h-[500px] xl:min-h-[700px] bg-gradient-to-b from-[#f0abfc] via-[#c026d3] to-[#4c1d95] p-6 sm:p-10">
        <div className="text-[120px] sm:text-[180px] md:text-[220px] lg:text-[260px] xl:text-[300px]">🏢</div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-cyan-400 mt-6 text-center">Digital City</h3>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg text-center mt-2 px-4">
          Your Trusted Partner in Every Property Deal
        </p>
      </div>

      {/* RIGHT PANEL */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full lg:flex-1 max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] min-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col justify-center px-6 sm:px-10"
      >

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Poppins'] mb-4">
          {isLogin ? "Start Your Property Journey Today!" : "Create Account"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {!isLogin && (
            <>
              <input name="fullName" placeholder="Full Name" onChange={handleChange}
                className="w-full p-3 sm:p-4 border rounded-lg" />

              <input name="mobileNumber" placeholder="Mobile Number" onChange={handleChange}
                className="w-full p-3 sm:p-4 border rounded-lg" />
            </>
          )}

          <input name="email" placeholder="Email" onChange={handleChange}
            className="w-full p-3 sm:p-4 border rounded-lg" />

          <input type="password" name="password" placeholder="Password" onChange={handleChange}
            className="w-full p-3 sm:p-4 border rounded-lg" />

          {!isLogin && (
            <select name="role" onChange={handleChange}
              className="w-full p-3 border rounded-lg">
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="PROPERTY_OWNER">PROPERTY_OWNER</option>
            </select>
          )}

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg">
            {isLogin ? "SIGN IN" : "SIGN UP"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 ml-2 cursor-pointer"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}