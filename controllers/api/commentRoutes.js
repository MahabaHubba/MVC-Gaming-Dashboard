const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all comments
router.get('/', async (req, res) => {
    try {
      console.log('start')

        const comments = await Comment.findAll();
        res.json(comments);

        console.log('end')
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
        console.loog(error)
    }
});

// Make new comment
router.post("/", withAuth, async (req, res) => {
    try {    
      console.log('start')
      const newComment = await Comment.create({
        ...req.body,
        userId: req.session.userId,
      });
      
      res.status(200).json(newComment);
      console.log('end')
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports = router;