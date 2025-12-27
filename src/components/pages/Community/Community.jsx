import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiPushpin2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import CategorySidebar from "./CategorySidebar";
import DiscussionCard from "./DiscussionCard";
import TopContributorsSidebar from "./TopContributorsSidebar";

const Community = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Discussions");
  const [discussionsData, setDiscussionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
    setSelectedCategory(params.get("category") || "All Discussions");
  }, [location.search]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/discussion");
        const data = await res.data.discussions;
        setDiscussionsData(data);
      } catch (err) {
        console.error("Failed to fetch discussions");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    const params = new URLSearchParams(location.search);
    if (value) params.set("search", value);
    else params.delete("search");

    if (selectedCategory && selectedCategory !== "All Discussions")
      params.set("category", selectedCategory);
    else params.delete("category");

    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const params = new URLSearchParams(location.search);
    if (searchTerm) params.set("search", searchTerm);

    if (category && category !== "All Discussions")
      params.set("category", category);
    else params.delete("category");

    navigate(`?${params.toString()}`, { replace: true });
  };

  const filteredDiscussions = useMemo(() => {
    return discussionsData.filter((discussion) => {
      const matchesCategory =
        selectedCategory === "All Discussions" ||
        discussion.category === selectedCategory;

      const matchesSearch =
        searchTerm === "" ||
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        discussion.author.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, discussionsData]);

  const featuredDiscussions = filteredDiscussions.filter((d) => d.featured);

  if (loading) {
    return <p className="p-8">Loading discussions...</p>;
  }

  return (
    <div className="bg-white min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Forums</h1>
          <p className="text-gray-500">
            Connect with fellow students and share knowledge
          </p>
        </div>

        <button
          onClick={() => navigate("/community/start-discussion")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <FaPlus /> Start Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <CategorySidebar
            discussions={discussionsData}
            searchTerm={searchTerm}
            setSearchTerm={handleSearchChange}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />
          <TopContributorsSidebar discussions={discussionsData} />
        </div>

        {/* Discussions */}
        <div className="lg:col-span-3 space-y-6">
          {featuredDiscussions.length > 0 && (
            <div>
              <h2 className="text-xxl font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <RiPushpin2Line className="text-orange-600" />
                Featured Discussions
              </h2>

              {featuredDiscussions.map((discussion) => (
                <DiscussionCard key={discussion._id} discussion={discussion} />
              ))}
            </div>
          )}

          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Discussions ({filteredDiscussions.length})
            </h2>

            {filteredDiscussions.map((discussion) => (
              <DiscussionCard key={discussion._id} discussion={discussion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
