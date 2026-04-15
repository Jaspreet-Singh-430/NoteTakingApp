import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/contextProvider.jsx";

export default function Navbar({ setQuery }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      
      {/* Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Logo */}
        <div className="text-xl font-bold text-center sm:text-left">
          <Link to="/">NoteTaker</Link>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full sm:w-64 bg-gray-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Auth Buttons */}
        <div className="flex justify-center sm:justify-end items-center gap-3 flex-wrap">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm sm:text-base">{user.name}</span>
              <Link
                to="/logout"
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}