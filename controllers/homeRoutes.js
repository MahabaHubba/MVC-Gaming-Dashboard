const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Render Homepage
router.get("/", async (req, res) => {
    try {
        console.log('start');
        const postData = await Post.findAll({
            include:[{ model: User, attributes: ['username']}],
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });

        console.log('end');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render single post with commmews
router.get("/post/:id", withAuth, async (req, res) => {
    try {
        console.log('start');
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment,
                  include: [{ model: User, attributes: ['username']}],
                },
            ],
        });

        if (!req.session.logged_in) { 
            return res.redirect('/login'); 
        }

        const post = postData.get({ plain: true});
        const comments = post.Comments;
        
        res.render('post', {
            ...post,
            comments,
            logged_in: req.session.logged_in
        });
        console.log('end');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render dashboard with posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        console.log('start');
        const postData = await Post.findAll({
            where: { userId: req.session.userId }, 
            include: [{ model: User, attributes: ['username'] }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        
        res.render('dashboard', { 
            posts,
            logged_in: req.session.logged_in
        });
        console.log('end');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render login pafe
router.get('/login', (req, res) => {
    console.log('start');
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('login');
    console.log('end');
});

//Render singup page
router.get('/signup', (req, res) => {
    console.log('start');
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('signup');
    console.log('end');
});

// Render adding game page
router.get('/addGame', (req, res) => {
    console.log('start');
    if (req.session.logged_in) {
        res.render('addGame');
        return;
    }
    res.redirect('/login');
    console.log('end');
});

// Render editing post page
router.get("/edit/:id", async (req, res) => {
    console.log('start');
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["username"] },
          { model: Comment,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('editPost', {
        ...post,
        logged_in: req.session.logged_in,
      });
      console.log('end');
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;