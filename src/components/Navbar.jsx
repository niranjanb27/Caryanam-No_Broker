import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");

  // ✅ ADMIN LOGOUT
  if (adminToken && !userToken) {
    const adminChannel = new BroadcastChannel("admin-auth");

    localStorage.removeItem("adminToken");
    localStorage.setItem("adminLogout", Date.now());

    adminChannel.postMessage("logout");
    adminChannel.close();
  }

  // ✅ USER LOGOUT
  else if (userToken && !adminToken) {   // ⭐ CHANGE (else if)
    // const userChannel = new BroadcastChannel("user-auth");
const userEmail = localStorage.getItem("userEmail"); // ⭐ ADD

    localStorage.removeItem("userToken");
    localStorage.setItem("userLogout", Date.now());

    userChannel.postMessage("logout");
    userChannel.close();
  }

  // ⚠️ SAFETY (both tokens exist)
  else if (adminToken && userToken) {
    console.warn("Both tokens exist — fixing...");

    // 👉 choose one (better: user logout)
    // const userChannel = new BroadcastChannel("user-auth");
const userChannel = new BroadcastChannel(`user-auth-${userEmail}`); // ⭐ CHANGE
    localStorage.removeItem("userToken");
    localStorage.setItem("userLogout", Date.now());

    userChannel.postMessage("logout");
    userChannel.close();
  }

  window.location.href = "/login";
};
   

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-blue-600 font-bold text-lg">
        Caryanam No Brokar
      </h1>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-600">
          Niranjan Baviskar <span className="text-blue-500">(User)</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-500">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;