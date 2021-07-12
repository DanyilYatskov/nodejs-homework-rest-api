const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../../helpers/asyncWrapper');

const {
  registrationController,
  loginController,
  logoutController,
  verifyController,
} = require('../../controllers/authenticationController');

const {
  authenticationMiddleware,
} = require('../../middlewares/authenticationMiddleware');

router.post('/signup', asyncWrapper(registrationController));

router.post('/login', asyncWrapper(loginController));

router.post(
  '/logout',
  authenticationMiddleware,
  asyncWrapper(logoutController),
);

router.get('/verify/:verifyToken', asyncWrapper(verifyController));

module.exports = { authRouter: router };
