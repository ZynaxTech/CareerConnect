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

discussionRouter.get("/", handleGetDiscussions);
discussionRouter.post("/", handlePostCreateDiscussion);
discussionRouter.patch("/:id/like", handlePatchToggleLike);
discussionRouter.post("/:id/comment", handlePostAddComment);
discussionRouter.delete("/:id", handleDeleteDiscussion);
discussionRouter.delete(
  "/:discussionId/comment/:commentId",
  handleDeleteComment
);

module.exports = { discussionRouter };
