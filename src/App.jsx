import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowseProperties from "./pages/BrowseProperties";
import PropertyDetails from "./pages/PropertyDetails";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Auth />} />

        <Route path="/login" element={<Auth />} />

        {/* USER PROTECTED */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="USER">
              <BrowseProperties />
            </ProtectedRoute>
          }
        />

        {/* PROPERTY DETAILS PROTECTED */}
        <Route
          path="/property/:id"
          element={
            <ProtectedRoute role="USER">
              <PropertyDetails />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PROTECTED */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;