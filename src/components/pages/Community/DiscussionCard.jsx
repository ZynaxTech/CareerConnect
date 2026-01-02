import { getTokenUser } from "@/auth/authService";
import { timeAgo } from "@/lib/utils.js";
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";

const DiscussionCard = ({ discussion }) => {
  const user = getTokenUser();
  const [likesCount, setLikesCount] = useState(discussion.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState(
    discussion.commentsList || []
  );
  const [commentsCount, setCommentsCount] = useState(discussion.comments);
  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    try {
      await fetch(
        `http://localhost:3000/api/discussion/${discussion._id}/like`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ like: !isLiked }),
        }
      );

      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Like failed");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/discussion/${discussion._id}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            author: user?.name || "Anonymous",
            content: newComment,
          }),
        }
      );

      const data = await res.json();
      setCommentsList(data.commentsList);
      setCommentsCount(data.comments);
      setNewComment("");
    } catch (err) {
      console.error("Comment failed");
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-xs font-medium text-blue-600 mb-1">
        {discussion.category}
      </p>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 break-words transition-colors">
        {discussion.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 break-words">{discussion.description}</p>

      <div className="flex gap-2 flex-wrap mb-3">
        {discussion.tags.map((tag, i) => (
          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex max-sm:flex-col gap-3 justify-between text-sm text-gray-500">
        <span>
          {discussion.author} • {timeAgo(discussion.createdAt)}
        </span>

        <div className="flex items-center gap-4">
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
            onClick={() => setShowComments(!showComments)}
            className="flex gap-1 items-center hover:text-blue-600 transition-colors"
          >
            <MessageSquare size={14} />
            {commentsCount}
            {showComments ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {showComments && (
        <div className="mt-4 border-t pt-4">
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {commentsList.map((comment) => (
              <div key={comment._id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>

                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Add a comment..."
            />
            <button className="bg-blue-600 text-white px-3 rounded">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DiscussionCard;
