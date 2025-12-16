import { Search } from "lucide-react";

const categories = [
  { name: "All Discussions", count: 1250 },
  { name: "Universities", count: 450 },
  { name: "Exam Prep", count: 380 },
  { name: "Career Guidance", count: 320 },
  { name: "General", count: 100 },
];

const CategorySidebar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search discussions..."
          className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex justify-between items-center px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                selectedCategory === cat.name
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "hover:bg-blue-50"
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-gray-400">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
