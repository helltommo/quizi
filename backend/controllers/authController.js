const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const signToken = id => {
  // creates a web token after user is created
  //                       payload = unique,       secretkey
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    // expiration date
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// signup function
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    nickName: req.body.nickName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });
  const token = signToken(newUser._id);

  //newUser.password = undefined;
  res.status(201).json({
    token,
    user: newUser
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exit
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password'
    });
  }
  // check if user exists && password is correct
  // .select = selects a field explictly because password doesn't show on output
  const user = await User.findOne({ email }).select('+password');
  //              user == current doc
  // compare password in userModal because it is related to data itself
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password'
    });
  }

  // if every thing okay, send token to client

  const token = signToken(user._id);
  // res.cookie('jwt', token, {
  //   // converting 90 dats to milliseconds                90            h    m    s      ms
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   secure: true, // https only
  //   httpOnly: true
  // });
  user.password = undefined;
  res.status(200).json({
    token,
    user
  });
});

exports.forgotPassword = (req, res, next) => {};
