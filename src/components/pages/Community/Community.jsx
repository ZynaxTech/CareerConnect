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
        setDiscussionsData(res.data.discussions || []);
      } catch {
        console.error("Failed to fetch discussions");
      } finally {
        setLoading(false);
      }
    };
    fetchDiscussions();
  }, []);

  const filteredDiscussions = useMemo(() => {
    return discussionsData.filter((d) => {
      const matchesCategory =
        selectedCategory === "All Discussions" ||
        d.category === selectedCategory;

      const matchesSearch =
        !searchTerm ||
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, discussionsData]);

  const featuredDiscussions = filteredDiscussions.filter((d) => d.featured);

  if (loading) return <p className="p-8">Loading discussions...</p>;

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Community Forums
            </h1>
            <p className="text-sm text-gray-500">
              Connect with fellow students and share knowledge
            </p>
          </div>

          <button
            onClick={() => navigate("/community/start-discussion")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm self-start sm:self-auto"
          >
            <FaPlus />
            Start Discussion
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <CategorySidebar
              discussions={discussionsData}
              searchTerm={searchTerm}
              setSearchTerm={(v) => setSearchTerm(v)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <TopContributorsSidebar discussions={discussionsData} />
          </aside>

          {/* DISCUSSIONS */}
          <main className="lg:col-span-3 space-y-8">
            {featuredDiscussions.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <RiPushpin2Line className="text-orange-500" />
                  Featured Discussions
                </h2>

                <div className="space-y-4">
                  {featuredDiscussions.map((d) => (
                    <DiscussionCard key={d._id} discussion={d} />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                Discussions ({filteredDiscussions.length})
              </h2>

              <div className="space-y-4">
                {filteredDiscussions.map((d) => (
                  <DiscussionCard key={d._id} discussion={d} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Community;
