import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  // ❌ No token
  if (!token) {
    return <Navigate to="/login" replace />; // 🔴 FIXED
  }

  try {
    const decoded = jwtDecode(token);

    if (!decoded) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />; // 🔴 FIXED
    }

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />; // 🔴 FIXED
    }

    if (role && decoded.role !== role) {
      localStorage.removeItem("token"); // 🔴 IMPORTANT FIX
      return <Navigate to="/login" replace />; // 🔴 FIXED
    }

    return children;

  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />; // 🔴 FIXED
  }
};

export default ProtectedRoute;