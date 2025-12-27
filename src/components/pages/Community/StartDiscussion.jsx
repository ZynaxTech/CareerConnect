import { getTokenUser } from "@/auth/authService";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartDiscussion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    category: "General",
  });
  const user = getTokenUser();

  const categories = [
    "Universities",
    "Exam Prep",
    "Career Guidance",
    "General",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get parsed tags for display
  const getParsedTags = () => {
    return formData.tag
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await fetch("http://localhost:3000/api/discussion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          tags: getParsedTags(),
          author: user.name,
        }),
      });

      navigate("/community");
    } catch (err) {
      alert("Failed to create discussion");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/community")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Community
          </button>
        </div>

        <div className="bg-white rounded-xl border p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Start a New Discussion
            </h1>
            <p className="text-gray-600">
              Share your thoughts and questions with the community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Discussion Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="What's your discussion about?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide more details about your discussion..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                required
              />
            </div>

            {/* Tag */}
            <div>
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleInputChange}
                placeholder="Add relevant tags separated by commas (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple tags with commas
              </p>

              {/* Display parsed tags */}
              {getParsedTags().length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-2">Tags preview:</p>
                  <div className="flex flex-wrap gap-2">
                    {getParsedTags().map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Send size={18} />
                Start Discussion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StartDiscussion;
