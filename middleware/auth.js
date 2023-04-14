const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/index');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('No API token provided', StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { id, username } = decoded;
    req.user = {
      id, username
    }
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route', StatusCodes.UNAUTHORIZED);
  }

  console.log(req.headers.authorization);
  next();
}

module.exports = authenticationMiddleware;