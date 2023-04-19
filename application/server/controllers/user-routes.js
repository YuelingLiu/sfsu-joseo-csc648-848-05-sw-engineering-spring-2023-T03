const router = require('express').Router();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { client } = require('../db/db');
const User = require('../models/User');

// user session logging
const session = require('express-session');
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
  },
});
// Initialize Multer with the storage options
// const upload = multer({ storage: storage });
const upload = multer({ storage: multer.memoryStorage() });

//s3 bucket connection
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

router.get('/followers', async (req, res) => {
  const userID = req.query.id;
  if (!userID) {
    res.status(400).json({ error: 'Missing user ID.' });
    return;
  }

  User.getFollowers(userID)
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.get('/following', async (req, res) => {
  const userID = req.query.id;
  if (!userID) {
    res.status(400).json({ error: 'Missing user ID.' });
    return;
  }

  User.getFollowing(userID)
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

// register route
router.post('/register', upload.single('profile_picture'), async (req, res) => {
  try {
    console.log('in register route');
    // take input from website
    const username = req.body.username
    console.log("this is username:" + username);
    const email = req.body.email;
    const password = req.body.password;

    // check if email is in db
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'A user with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //upload the photo to s3 and wait for the URL
    const file = req.file;
    var newUser;
    const uploadImg = (file) => {
      // check if buffer is working 
      if (!file.buffer) {
        return Promise.reject(new Error('File buffer is not available'));
      }
      const uploadParams = { 
        Bucket: process.env.AWS_BUCKET_NAME, 
        Key: uuidv4() + '-' + file.originalname, 
        Body: file.buffer, 
        ContentEncoding: 'base64', 
        ContentType: file.mimetype, 
      };
      return new Promise(async (resolve, reject) => {
        await s3.upload(uploadParams, async function (err, data) {
          if (err) {
            console.log('Upload error: ', err);
            reject(err);
          } else {
            console.log('Upload Success: ', data.Location);
            newUser = await User.create({
              username: username,
              email: email,
              password: hashedPassword,
              profile_picture: data.Location,
            });
            res
              .status(201)
              .json({ message: 'User created successfully', user: newUser });
          }
        });
      });
    };
    const imgURL = await uploadImg(file);

    // Create a session and return a success message
    req.session.user = newUser;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({
      message: 'An error occurred during register.',
      error: err.message,
    });
  }
});

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

      console.log('sessions saved: ');
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
  } else {
    res.status(404).end();
  }
});

//upload profile pic
router.post('/profilepic', (req, res) => {});

module.exports = router;
