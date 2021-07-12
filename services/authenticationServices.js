const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../dataBase/usersModel');
const {
  NotAuthorizedError,
  ServiceUnavalaibleError,
} = require('../helpers/errors');
const { sendVerificationEmail } = require('./emailServices');
const { updateToken } = require('./userService');

async function registration(email, password) {
  const verifyToken = uuidv4();
  try {
    await sendVerificationEmail(verifyToken, email);
  } catch (error) {
    throw new ServiceUnavalaibleError('Service Unavalaible');
  }

  const newUser = new User({ email, password, verifyToken });
  await newUser.save();
  return newUser;
}

async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user.isVerified) {
    throw new NotAuthorizedError('User is not verified.');
  }

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(
      `Invalid email: '${email}' or wrong password, try again`,
    );
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
  );
  const avatarURL = user.avatarURL;
  await updateToken(user._id, token);
  return { token, avatarURL };
}

async function logout(userId) {
  console.log(userId);
  if (!userId) {
    throw new NotAuthorizedError('Not authorized. You need to be logged in!');
  }

  const data = await updateToken(userId, null);
  console.log(data);
  return data;
}
async function verifyUserByEmail({ verifyToken }) {
  const user = await User.findOne({ verifyToken });

  if (user) {
    await user.updateOne({ isVerified: true, verifyToken: null });
    return true;
  }
  return false;
}

module.exports = {
  registration,
  login,
  logout,
  verifyUserByEmail,
};
