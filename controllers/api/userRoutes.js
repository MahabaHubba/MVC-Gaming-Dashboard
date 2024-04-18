const router = require('express').Router();
const { User } = require('../../models');

//Get all users
router.get("/", async (req, res) => {
   try {
    console.log('start')
    const userDataDb = await User.findAll({
        attributes: { exclude: ['password']},
    });
    res.json(userDataDb);
    console.log('end')
   } catch (err) {
        res.status(500).json(err);
   }
});
   
// newUser sign up
router.post("/signup", async (req, res) => {
    try {
      console.log('start')
      const newUser = new User();
      newUser.username = req.body.username;
      newUser.password = req.body.password;
  
      const userData = await newUser.save();
  
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
        console.log('end')
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

//Route to log in user
router.post("/login", async (req, res) => {
    try {
      console.log('start')
      const userData = await User.findOne({ where: { username: req.body.username } });
  
      if (!userData) {
        res.status(400).json({ message: "Incorrect username or password, please try again" });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect username or password, please try again" });
        return;
      }
  
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json({ user: userData, message: "Logged in successfully!" });
      });
      console.log('end')
    } catch (err) {
      res.status(400).json(err);
    }
  });

//Log out individual
  router.post("/logout", (req, res) => {
    console.log('start')
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
      console.log('end')
    } else {
      res.status(404).end();
    }
  });

 
module.exports = router;