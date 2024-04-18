const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all posts
router.get("/", async (req, res) => {
  try {
    console.log('start')
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
    console.log('end')
  } catch (err) {
    res.status(500).json(err);
  }
});

// make new post
router.post("/", withAuth, async (req, res) => {
  try {
    console.log('start')
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(200).json(newPost);
    console.log('end')
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update existing post
router.put("/:id", withAuth, async (req, res) => {
  try {
    console.log('start')
    const postData = await Post.update(req.body, {
      where: { 
        id: req.params.id },
    });

    if (!postData) {
      res.status(404).json({ message: "Post not found!" });
      return;
    }
    res.status(200).json(postData);
    console.log('end')
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete current and associated posts with comments
router.delete("/:id", withAuth, async (req, res) => {
    try {
      console.log('start')
      await Comment.destroy({
        where: { 
            postId: req.params.id },
      });
  
      const postData = await Post.destroy({
        where: { 
            id: req.params.id },
      });
  
      if (!postData) {
        res.status(404).json({ message: "Post not found!" });
        return;
      }
      res.status(200).json(postData);
      console.log('end')
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;