
const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-blue-600 font-bold text-lg">
        Caryanam No Brokar
      </h1>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-600">
          Niranjan Baviskar <span className="text-blue-500">(User)</span>
        </span>
        <button className="text-gray-700 hover:text-red-500">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;