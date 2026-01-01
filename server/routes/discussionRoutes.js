const express = require("express");
const discussionRouter = express.Router();
const {
  handlePostAddComment,
  handleGetDiscussions,
  handlePostCreateDiscussion,
  handlePatchToggleLike,
  handleDeleteDiscussion,
  handleDeleteComment,
} = require("../controllers/discussionController.js");
const { verifyToken } = require("../middleware/userAuth.js");
const { adminAuth } = require("../middleware/adminAuth.js");

discussionRouter.get("/", handleGetDiscussions);
discussionRouter.post("/", handlePostCreateDiscussion);
discussionRouter.patch("/:id/like", handlePatchToggleLike);
discussionRouter.post("/:id/comment", handlePostAddComment);
discussionRouter.delete("/:id", verifyToken, adminAuth, handleDeleteDiscussion);
discussionRouter.delete(
  "/:discussionId/comment/:commentId",
  verifyToken,
  adminAuth,
  handleDeleteComment
);

module.exports = { discussionRouter };
