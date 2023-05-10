const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Amazon stuff
const { Upload } = require("@aws-sdk/lib-storage"),
  { S3 } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const { client } = require("../db/db");
const bodyParser = require('body-parser');

// MODELS
const User = require("../models/User");
const Comment = require('../models/Comment'); // Make sure to import the Comment model with the correct path

// Use body-parser middleware to parse JSON request bodies
router.use(bodyParser.json());
// password hashing
const bcrypt = require("bcrypt");

// image storing
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// Initialize Multer with the storage options
// const upload = multer({ storage: storage });
const upload = multer({ storage: multer.memoryStorage() });

//s3 bucket connection
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});



router.get("/followers", async (req, res) => {
  const userID = req.query.id;
  if (!userID) {
    res.status(400).json({ error: "Missing user ID." });
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

router.get("/following", async (req, res) => {
  const userID = req.query.id;
  if (!userID) {
    res.status(400).json({ error: "Missing user ID." });
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
router.post("/register", upload.single("profile_picture"), async (req, res) => {
  try {
    var newUser;

    // take input from website
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const usernameRegex = /^[a-zA-Z0-9_-]{6,20}$/;
    const passwordRegex = /^(?=.*[\W_])[a-zA-Z0-9\W_]{6,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // check if email is in db
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      console.log('user existed');
      return res
        .status(409)
        .json({ message: "A user with this email already exists" });
    }

    if (!usernameRegex.test(username)) {
      console.log('Invalid username from Backend');
      return res.status(400).json({
        message:
          'Username must be 6-20 characters and may only contain letters, numbers, underscores, and hyphens.',
      });
    }

    if (!passwordRegex.test(password)) {
      console.log('Invalid password from Backend');
      return res.status(400).json({
        message:
          'Password must be a combination of letters, numbers, and special characters, with a maximum length of 20 characters.',
      });
    }

    if (!emailRegex.test(email)) {
      console.log('Invalid email from Backend');
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //upload the photo to s3 and wait for the URL
    if (req.file) {
      const file = req.file;
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: uuidv4() + "-" + file.originalname,
        Body: file.buffer,
        ContentEncoding: "base64",
        ContentType: file.mimetype,
      };
      const imgURL = (
        await new Upload({
          client: s3,
          params: uploadParams,
        }).done()
      ).Location;
      newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
        profile_picture: imgURL,
      });
    } else{
      newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword
      });

    }
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });

    // res.redirect("/");

  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({
      message: "An error occurred during register.",
      error: err.message,
    });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    // take inputs
    const email = req.body.email;
    const password = req.body.password;

    // check if email is in db
    const dbUserData = await User.getByEmail(email);
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    // take in password and compare with user password from email
    const passwordMatch = await bcrypt.compare(password, dbUserData.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    console.log('dbUserData: ', JSON.stringify(dbUserData, null, 2));
    console.log(' dbUserData.id: ' + dbUserData.id);

    if (dbUserData && passwordMatch) {
      const token = jwt.sign(
        {
          userId: dbUserData.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.json({
        success: true,
        message: "Authentication successful!",
        token,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

// Comments
router.post('/post/:postId/comment', async (req, res) => {
  try {
    const { token, text } = req.body;
    console.log('req.body:', req.body);

    const postId = req.params.postId;
    console.log("this is postID: " + postId);

    // Verify and decode the JWT token to get the user ID
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    console.log("this is userID: " + userId);

    // Create the comment
    const commentData = {
      user_id: userId,
      recipe_id: postId,
      comment: text,
    };

    const createdComment = await Comment.create(commentData);
    console.log('Comment created');

    res.status(201).json({
      status: 'success',
      data: createdComment,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failure',
      message: err.message,
    });
  }
});


router.get('/post/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log(postId);

    const comments = await Comment.getCommentsForRecipe(postId);
    // console.log(JSON.stringify(comments));

    res.status(201).json({ 
      status: 'success',
      data: comments 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching comments.' });
  }
});

module.exports = router;
