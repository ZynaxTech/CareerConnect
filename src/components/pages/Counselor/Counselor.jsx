import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CounselorCard from "./CounselorCard.jsx";

const Counselors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "All Specializations"
  );
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [sortBy, setSortBy] = useState("Sort by Rating");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [counselors, setCounselors] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
    setSelectedSpecialization(
      params.get("specialization") || "All Specializations"
    );
    setSelectedRating(params.get("rating") || "All Ratings");
    setSortBy(params.get("sort") || "Sort by Rating");
  }, [location.search]);

  useEffect(() => {
    // Fetch counselors data from API when component mounts
    const fetchCounselors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/counselor`);
        if (response.data && response.data.success) {
          setCounselors(response.data.counselors);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          setError(message);
          console.error("Unexpected error:", message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCounselors();
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    const params = new URLSearchParams(location.search);

    if (value) params.set("search", value);
    else params.delete("search");

    if (selectedSpecialization !== "All Specializations") {
      params.set("specialization", selectedSpecialization);
    } else {
      params.delete("specialization");
    }

    if (selectedRating !== "All Ratings") {
      params.set("rating", selectedRating);
    } else {
      params.delete("rating");
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleSpecializationChange = (value) => {
    setSelectedSpecialization(value);
    const params = new URLSearchParams(location.search);

    if (searchTerm) params.set("search", searchTerm);

    if (value !== "All Specializations") params.set("specialization", value);
    else params.delete("specialization");

    if (selectedRating !== "All Ratings") params.set("rating", selectedRating);
    else params.delete("rating");

    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
    const params = new URLSearchParams(location.search);

    if (searchTerm) params.set("search", searchTerm);

    if (selectedSpecialization !== "All Specializations")
      params.set("specialization", selectedSpecialization);
    else params.delete("specialization");

    if (value !== "All Ratings") params.set("rating", value);
    else params.delete("rating");

    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleSortChange = (value) => {
    setSortBy(value);

    const params = new URLSearchParams(location.search);

    if (searchTerm) params.set("search", searchTerm);
    if (selectedSpecialization !== "All Specializations")
      params.set("specialization", selectedSpecialization);
    if (selectedRating !== "All Ratings") params.set("rating", selectedRating);
    if (value !== "Sort by Rating") params.set("sort", value);
    else params.delete("sort");

    navigate(`?${params.toString()}`, { replace: true });
  };

  const filteredCounselors = useMemo(() => {
    let filtered = counselors.filter((counselor) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        counselor.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Specialization filter
      const matchesSpecialization =
        selectedSpecialization === "All Specializations" ||
        counselor.tags.includes(selectedSpecialization);

      // Rating filter
      let matchesRating = true;
      if (selectedRating === "4.5+") {
        matchesRating = counselor.rating >= 4.5;
      } else if (selectedRating === "4.0+") {
        matchesRating = counselor.rating >= 4.0;
      }

      return matchesSearch && matchesSpecialization && matchesRating;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Sort by Rating": {
          return b.rating - a.rating;
        }
        case "Price: Low to High": {
          return a.price - b.price;
        }
        case "Experience": {
          const aExp = parseInt(a.experience);
          const bExp = parseInt(b.experience);
          return bExp - aExp; // Higher experience first
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [counselors, searchTerm, selectedSpecialization, selectedRating, sortBy]);

  return (
    <div className="bg-white min-h-screen pb-6">
      {/* Header */}
      <div className="text-center mb-8 shadow-sm py-9 rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Find Your Perfect Counselor
        </h1>
        <p className="text-gray-500 mt-2">
          Connect with verified education experts for personalized guidance
        </p>
      </div>

      <div className="max-w-6xl flex flex-col mx-auto">
        {/* Filters */}
        <div className="  bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search counselors by name or expertise..."
              className="w-full pl-10 pr-3 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <select
            className="border rounded-lg px-4 py-2"
            value={selectedSpecialization}
            onChange={(e) => handleSpecializationChange(e.target.value)}
          >
            <option>All Specializations</option>
            <option>Admissions</option>
            <option>Career Guidance</option>
            <option>Applications</option>
            <option>Interview Prep</option>
            <option>Career Assessment</option>
            <option>Industry Insights</option>
            <option>Skill Development</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2"
            value={selectedRating}
            onChange={(e) => handleRatingChange(e.target.value)}
          >
            <option>All Ratings</option>
            <option>4.5+</option>
            <option>4.0+</option>
          </select>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            {filteredCounselors.length} counselors found
          </p>

          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option>Sort by Rating</option>
            <option>Price: Low to High</option>
            <option>Experience</option>
          </select>
        </div>

        {/* Cards */}
        {isLoading ? (
          <div className="flex-1 flex justify-center items-center py-16">
            <p className="text-sky-950 text-lg">Loading counselors...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex justify-center items-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCounselors.map((counselor) => (
                <CounselorCard key={counselor.id} counselor={counselor} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Counselors;
