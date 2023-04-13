const router = require("express").Router();
const { client } = require("../db/db"); 
const User = require("../models/User");

// user session logging
const session = require("express-session");
// password hashing 
const bcrypt = require('bcrypt');

// image storing 
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// Initialize Multer with the storage options
const upload = multer({ storage: storage });


router.get('/followers', async (req, res) => {
    const userID = req.query.id
    if (!userID) {
        res.status(400).json({ error: 'Missing user ID.' });
        return;
      }

    User.getFollowers(userID)
      .then( users =>{
        res.status(200).json({users});
      })
      .catch(err => {
        res.status(500).json({err});
      })
});

router.get('/following', async (req, res) => {
  const userID = req.query.id
  if (!userID) {
      res.status(400).json({ error: 'Missing user ID.' });
      return;
    }

  User.getFollowing(userID)
    .then( users =>{
      res.status(200).json({users});
    })
    .catch(err => {
      res.status(500).json({err});
    })
});

// register route
router.post('/register', upload.single('profile_picture'), async (req, res) => {
  try {
    // take input from website
    const username = req.body.username
    const email = req.body.email;
    const password = req.body.password;
    console.log('Received email:', email);
    // check if email is in db
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'A user with this email already exists' });
    }
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      profile_picture: req.file.path, 
    });

    console.log('user created');

    // Create a session and return a success message
    req.session.user = newUser;
    req.session.save(() => {
      res.status(201).json({ message: 'User created successfully', user: newUser });
    });
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: 'An error occurred during register.' });
  }
})

// login route
router.post('/login', async (req, res) => {
  try {
    // take inputs
    const email = req.body.email;
    const password = req.body.password;

    // check if email is in db
    const dbUserData = await User.getByEmail(email);
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    // take in password and compare with user password from email 
    console.log(dbUserData.password);
    const passwordMatch = await bcrypt.compare(password, dbUserData.password);

    if (!passwordMatch) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      console.log("sessions saved: ");
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred during login.' });
  }
});

// logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      console.log('You are now logout!');
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

//upload profile pic
router.post('/profilepic', (req, res) =>{

}) 

module.exports = router;