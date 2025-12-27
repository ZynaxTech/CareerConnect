import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CounselorCard from "./CounselorCard";
import axios from "axios";

const Counselors = () => {
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border rounded-lg px-4 py-2"
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
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
            onChange={(e) => setSelectedRating(e.target.value)}
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
            onChange={(e) => setSortBy(e.target.value)}
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
