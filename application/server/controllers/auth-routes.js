// const express = require('express');
// const session = require('express-session');
// const User = require('../models/User');

// const router = express.Router();

// router.get('/login', async (req, res) => {
//   //const { email, password } = req.body;

//   //   const user = await User.findOne({ email });
//   try {
//     console.log(req.body.email);
//     const dbUserData = await User.getByEmail(req.body.email);

//     if (!dbUserData) {
//       res.status(400).json({ message: 'No user with that email address!' });
//       return;
//     }

//     // Assuming the User model has a 'checkPassword' method
//     const validPassword = dbUserData.checkPassword(req.body.password);

//     // if (!validPassword) {
//     //   res.status(400).json({ message: 'Incorrect password!' });
//     //   return;
//     // }

//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.loggedIn = true;

//       console.log('sessions saved: ');
//       res.json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'An error occurred during login.' });
//   }
// });
