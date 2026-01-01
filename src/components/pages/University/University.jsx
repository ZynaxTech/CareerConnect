import { getAccessToken } from "@/auth/authService";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FiBookOpen, FiGrid, FiList, FiSearch } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { LuDollarSign } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

const University = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = getAccessToken();

  const [filters, setFilters] = useState({
    search: "",
    location: "All Locations",
    type: [],
    feeRange: [],
  });

  const [universities, setUniversities] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("ranking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/university", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (res.data.success) setUniversities(res.data.universities);
      } catch (err) {
        setError("Failed to load universities");
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  /* ---------------- Helpers ---------------- */
  const parseFee = (fee) => parseInt(fee.replace(/[^\d]/g, "")) || 0;

  const feeMatch = (fee, range) => {
    const amount = parseFee(fee);
    if (range === "Under 100k") return amount < 100000;
    if (range === "100k - 500k") return amount >= 100000 && amount <= 500000;
    if (range === "500k+") return amount > 500000;
    return true;
  };

  /* ---------------- Filtering ---------------- */
  const filtered = universities.filter((u) => {
    const searchMatch =
      u.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      u.fullName.toLowerCase().includes(filters.search.toLowerCase());

    const locationMatch =
      filters.location === "All Locations" || u.location === filters.location;

    const typeMatch =
      filters.type.length === 0 || filters.type.includes(u.type);

    const feeMatchCheck =
      filters.feeRange.length === 0 ||
      filters.feeRange.some((r) => feeMatch(u.fees, r));

    return searchMatch && locationMatch && typeMatch && feeMatchCheck;
  });

  /* ---------------- Sorting ---------------- */
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return b.rating - a.rating;
  });

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Universities in Pakistan
          </h1>
          <p className="text-gray-400 mt-2">
            Discover the best institutions for your future
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 self-start">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="flex items-center gap-2 text-white font-semibold mb-4">
                <CiFilter /> Filters
              </h3>

              {/* Search */}
              <div className="mb-4">
                <label className="text-xs text-gray-400 mb-1 block">
                  Search
                </label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    className="w-full bg-gray-700 text-white text-sm pl-9 pr-3 py-2 rounded border border-gray-600"
                    placeholder="Search universities"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="text-xs text-gray-400 mb-1 block">
                  Location
                </label>
                <select
                  className="w-full bg-gray-700 text-white text-sm py-2 px-3 rounded border border-gray-600"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                >
                  <option>All Locations</option>
                  <option>Lahore, Punjab</option>
                  <option>Islamabad, Federal</option>
                  <option>Karachi, Sindh</option>
                </select>
              </div>

              {/* Type */}
              <div className="mb-4">
                <label className="text-xs text-gray-400 mb-2 block">Type</label>
                {["Public", "Private"].map((t) => (
                  <label
                    key={t}
                    className="flex gap-2 text-sm text-gray-300 mb-1"
                  >
                    <input
                      type="checkbox"
                      checked={filters.type.includes(t)}
                      onChange={() =>
                        setFilters({
                          ...filters,
                          type: filters.type.includes(t)
                            ? filters.type.filter((x) => x !== t)
                            : [...filters.type, t],
                        })
                      }
                    />
                    {t}
                  </label>
                ))}
              </div>

              {/* Fee */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block">
                  Fee Range
                </label>
                {["Under 100k", "100k - 500k", "500k+"].map((f) => (
                  <label
                    key={f}
                    className="flex gap-2 text-sm text-gray-300 mb-1"
                  >
                    <input
                      type="checkbox"
                      checked={filters.feeRange.includes(f)}
                      onChange={() =>
                        setFilters({
                          ...filters,
                          feeRange: filters.feeRange.includes(f)
                            ? filters.feeRange.filter((x) => x !== f)
                            : [...filters.feeRange, f],
                        })
                      }
                    />
                    {f}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-sm text-gray-400">
                {sorted.length} universities found
              </p>

              <div className="flex items-center gap-3">
                <select
                  className="bg-gray-800 text-white text-sm px-3 py-2 rounded border border-gray-700"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="ranking">Sort by Ranking</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>

                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  <FiGrid />
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  <FiList />
                </button>
              </div>
            </div>

            {/* Cards */}
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {sorted.map((uni) => (
                  <div
                    key={uni.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition"
                  >
                    <div className="h-40 bg-gray-700">
                      <img
                        src={uni.image}
                        alt={uni.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <h4 className="text-white font-semibold">{uni.name}</h4>
                        <span className="flex items-center gap-1 text-sm text-white">
                          <FaStar className="text-yellow-400" />
                          {uni.rating}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {uni.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <GrLocation /> {uni.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <GoPeople /> {uni.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiBookOpen /> {uni.programs}
                        </span>
                        <span className="flex items-center gap-1">
                          <LuDollarSign /> {uni.fees}
                        </span>
                      </div>

                      <button
                        onClick={() => navigate(`/universities/${uni.id}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default University;
