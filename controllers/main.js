require('dotenv').config();

const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide the email and password', 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign({id, username},
    process.env.SECRET,
    {
      expiresIn: '30d'
    });

  res.status(200).json({
    msg: 'User created',
    token
  });
}

const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${req.user.username}`,
      secret: `Here's your secret: ${luckyNumber}`
    });
}

module.exports = {
  login,
  dashboard
}