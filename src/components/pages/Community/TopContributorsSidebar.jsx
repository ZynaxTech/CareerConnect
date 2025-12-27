import { FileText, MessageSquare, ThumbsUp, Trophy } from "lucide-react";

const TopContributorsSidebar = ({ discussions }) => {
  const contributorsMap = {};

  discussions.forEach((discussion) => {
    const { author, likes, commentsList = [] } = discussion;

    // Initialize post author
    if (!contributorsMap[author]) {
      contributorsMap[author] = {
        name: author,
        posts: 0,
        comments: 0,
        likes: 0,
        score: 0,
      };
    }

    // Post stats
    contributorsMap[author].posts += 1;
    contributorsMap[author].likes += likes || 0;

    // Comment stats
    commentsList.forEach((comment) => {
      if (!contributorsMap[comment.author]) {
        contributorsMap[comment.author] = {
          name: comment.author,
          posts: 0,
          comments: 0,
          likes: 0,
          score: 0,
        };
      }
      contributorsMap[comment.author].comments += 1;
    });
  });

  // Calculate score
  const contributors = Object.values(contributorsMap).map((user) => ({
    ...user,
    score: user.posts * 3 + user.comments * 2 + user.likes * 1,
  }));

  // Sort & take top 3
  const topContributors = contributors
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-yellow-500" size={20} />
        <h3 className="text-sm font-semibold text-gray-700">
          Top Contributors
        </h3>
      </div>

      <div className="space-y-4">
        {topContributors.map((user, index) => (
          <div key={user.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0
                    ? "bg-yellow-100 text-yellow-700"
                    : index === 1
                    ? "bg-gray-100 text-gray-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {index + 1}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText size={12} /> {user.posts}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} /> {user.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={12} /> {user.likes}
                  </span>
                </div>
              </div>
            </div>

            <span className="text-xs font-semibold text-gray-400">
              {user.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributorsSidebar;
