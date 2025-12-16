import {
  ChevronDown,
  ChevronUp,
  Eye,
  MessageSquare,
  Send,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";

const DiscussionCard = ({ discussion }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(discussion.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState(
    discussion.commentsList || []
  );
  const [commentsCount, setCommentsCount] = useState(discussion.comments);

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent card click when clicking like
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking comments
    setShowComments(!showComments);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: commentsList.length + 1,
        author: "YOU", // In a real app, this would be the logged-in user
        time: "Just now",
        content: newComment.trim(),
      };
      setCommentsList([...commentsList, comment]);
      setCommentsCount(commentsCount + 1);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5 hover:shadow-sm transition">
      <div>
        {/* Category */}
        <p className="text-xs font-medium text-blue-600 mb-1">
          {discussion.category}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2  transition-colors">
          {discussion.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {discussion.description}
        </p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-3">
          {discussion.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {discussion.author} • {discussion.time}
          </span>

          <div className="flex gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? "text-blue-600" : "hover:text-blue-600"
              }`}
            >
              <ThumbsUp size={14} className={isLiked ? "fill-current" : ""} />
              {likesCount}
            </button>
            <button
              onClick={handleCommentClick}
              className={`flex items-center gap-1 transition-colors ${
                showComments ? "text-blue-600" : "hover:text-blue-600"
              }`}
            >
              <MessageSquare size={14} />
              {commentsCount}
              {showComments ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {discussion.views}
            </span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {/* Existing Comments */}
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {commentsList.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DiscussionCard;
