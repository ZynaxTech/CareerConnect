import { FileText, MessageSquare, Trophy } from "lucide-react";

const TopContributorsSidebar = ({ discussions }) => {
  // Calculate contributors based on discussions and comments
  const contributors = {};

  // Count discussions per author
  discussions.forEach((discussion) => {
    if (!contributors[discussion.author]) {
      contributors[discussion.author] = {
        name: discussion.author,
        discussions: 0,
        comments: 0,
        total: 0,
      };
    }
    contributors[discussion.author].discussions += 1;
    contributors[discussion.author].total += 1;
  });

  // Count comments per author
  discussions.forEach((discussion) => {
    if (discussion.commentsList) {
      discussion.commentsList.forEach((comment) => {
        if (!contributors[comment.author]) {
          contributors[comment.author] = {
            name: comment.author,
            discussions: 0,
            comments: 0,
            total: 0,
          };
        }
        contributors[comment.author].comments += 1;
        contributors[comment.author].total += 1;
      });
    }
  });

  // Get top 3 contributors sorted by total contributions
  const topContributors = Object.values(contributors)
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-yellow-500" size={20} />
        <h3 className="text-sm font-semibold text-gray-700">
          Top Contributors
        </h3>
      </div>

      <div className="space-y-3">
        {topContributors.map((contributor, index) => (
          <div
            key={contributor.name}
            className="flex items-center justify-between"
          >
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
                <p className="text-sm font-medium text-gray-900">
                  {contributor.name}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText size={12} />
                    {contributor.discussions}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} />
                    {contributor.comments}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-600">
              {contributor.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributorsSidebar;
