import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowseProperties from "./pages/BrowseProperties";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrowseProperties />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;