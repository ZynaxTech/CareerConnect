import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6 text-center">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/home"
        className="flex items-center gap-2 bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-950 transition"
      >
        <FaHome className="text-lg" />
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
