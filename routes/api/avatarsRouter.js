const express = require('express');
const {
  avatarUploadMiddleware,
} = require('../../middlewares/avatarsMiddleware');

const { asyncWrapper } = require('../../helpers/asyncWrapper');

const {
  avatarUploadController,
} = require('../../controllers/avatarsController');

const {
  authenticationMiddleware,
} = require('../../middlewares/authenticationMiddleware');

const router = new express.Router();

router.patch(
  '/',
  authenticationMiddleware,
  avatarUploadMiddleware.single('avatar'),
  asyncWrapper(avatarUploadController),
);

module.exports = { avatarsRouter: router };
