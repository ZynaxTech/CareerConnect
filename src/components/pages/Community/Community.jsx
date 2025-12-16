import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiPushpin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CategorySidebar from "./CategorySidebar";
import { discussions as staticDiscussions } from "./Community.js";
import DiscussionCard from "./DiscussionCard";
import TopContributorsSidebar from "./TopContributorsSidebar";

const Community = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Discussions");

  // Combine static discussions with user-created ones from localStorage
  const allDiscussions = useMemo(() => {
    const userDiscussions = JSON.parse(
      localStorage.getItem("discussions") || "[]"
    );
    return [...userDiscussions, ...staticDiscussions];
  }, []);

  const filteredDiscussions = useMemo(() => {
    return allDiscussions.filter((discussion) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All Discussions" ||
        discussion.category === selectedCategory;

      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        discussion.author.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, allDiscussions]);

  const featuredDiscussions = filteredDiscussions.filter((d) => d.featured);
  const discussions = filteredDiscussions;

  const handleStartDiscussion = () => {
    navigate("/community/start-discussion");
  };

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
          onClick={handleStartDiscussion}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex justify-center items-center gap-2"
        >
          <FaPlus /> Start Discussion
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <CategorySidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <TopContributorsSidebar discussions={allDiscussions} />
        </div>

        {/* Discussions */}
        <div className="lg:col-span-3 space-y-6">
          {/* Featured */}
          {featuredDiscussions.length > 0 && (
            <div>
              <h2 className="text-xxl font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <RiPushpin2Line className="text-orange-600 text-xl" /> Featured
                Discussions ({featuredDiscussions.length})
              </h2>

              <div className="space-y-4">
                {featuredDiscussions.map((discussion) => (
                  <DiscussionCard key={discussion.id} discussion={discussion} />
                ))}
              </div>
            </div>
          )}

          {/* All */}
          <div>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Discussions ({filteredDiscussions.length})
            </h2>

            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
