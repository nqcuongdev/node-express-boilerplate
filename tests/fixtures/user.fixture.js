const bcrypt = require('bcryptjs');
const faker = require('faker');
const UserModel = require('../../src/models/user.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  id: 1,
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  is_email_verified: false,
};

const userTwo = {
  id: 2,
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  is_email_verified: false,
};

const admin = {
  id: 3,
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  is_email_verified: false,
};

const insertUsers = async (users) => {
  // eslint-disable-next-line no-return-await
  users.map(async (user) => await UserModel.create({ ...user, password: hashedPassword }));
};

const deleteIfExist = async (user) => {
  await UserModel.query().delete().where('id', user.id);
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
  deleteIfExist,
};
