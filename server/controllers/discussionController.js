const mongoose = require("mongoose");
const { Discussion } = require("../model/discussionModel.js");

const handleGetDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, discussions });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch discussions",
    });
  }
};

const handlePostCreateDiscussion = async (req, res) => {
  try {
    const { title, description, category, tags, author } = req.body;

    if (!title || !description || !category || !author) {
      return res.status(400).json({
        success: false,
        message: "Title, description, category, and author are required",
      });
    }

    if (title.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 5 characters long",
      });
    }

    const discussion = await Discussion({
      title: title.trim(),
      description: description.trim(),
      category,
      tags: Array.isArray(tags) ? tags : [],
      author: author.trim(),
    });

    await discussion.save();

    return res.status(201).json({
      success: true,
      discussion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create discussion",
    });
  }
};

const handlePatchToggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { like } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid discussion ID",
      });
    }

    if (typeof like !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "`like` must be a boolean",
      });
    }

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    discussion.likes += like ? 1 : -1;
    if (discussion.likes < 0) discussion.likes = 0;

    await discussion.save();

    return res.status(200).json({
      success: true,
      likes: discussion.likes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update like",
    });
  }
};

const handlePostAddComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid discussion ID",
      });
    }

    if (!author || !content) {
      return res.status(400).json({
        success: false,
        message: "Author and content are required",
      });
    }

    if (content.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Comment must be at least 2 characters long",
      });
    }

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    discussion.commentsList.push({
      author: author.trim(),
      content: content.trim(),
    });
    discussion.comments += 1;

    await discussion.save();

    return res.status(200).json({
      success: true,
      commentsList: discussion.commentsList,
      comments: discussion.comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};

const handleDeleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid discussion ID",
      });
    }

    const discussion = await Discussion.findByIdAndDelete(id);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discussion deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete discussion",
    });
  }
};

const handleDeleteComment = async (req, res) => {
  try {
    const { discussionId, commentId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(discussionId) ||
      !mongoose.Types.ObjectId.isValid(commentId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid discussion or comment ID",
      });
    }

    const discussion = await Discussion.findById(discussionId);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found",
      });
    }

    const commentIndex = discussion.commentsList.findIndex(
      (c) => c._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    discussion.commentsList.splice(commentIndex, 1);
    discussion.comments -= 1;

    await discussion.save();

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete comment",
    });
  }
};

module.exports = {
  handleGetDiscussions,
  handlePostCreateDiscussion,
  handlePatchToggleLike,
  handlePostAddComment,
  handleDeleteDiscussion,
  handleDeleteComment,
};
