const Joi = require('joi');
const faker = require('faker');
const UserModel = require('../../../src/models/user.model');

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        join_date: new Date(),
        role: 'user',
      };
    });

    test('should correctly validate a valid user', async () => {
      await expect(UserModel.validate(newUser)).resolves.toBeUndefined();
    });

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await expect(UserModel.validate(newUser)).rejects.toThrow(Joi.ValidationError);
    });

    test('should throw a validation error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';
      await expect(UserModel.validate(newUser)).rejects.toThrow(Joi.ValidationError);
    });

    test('should throw a validation error if password does not contain numbers', async () => {
      newUser.password = 'password';
      await expect(UserModel.validate(newUser)).rejects.toThrow(Joi.ValidationError);
    });

    test('should throw a validation error if password does not contain letters', async () => {
      newUser.password = '11111111';
      await expect(UserModel.validate(newUser)).rejects.toThrow(Joi.ValidationError);
    });

    test('should throw a validation error if role is unknown', async () => {
      newUser.role = 'invalid';
      await expect(UserModel.validate(newUser)).rejects.toThrow(Joi.ValidationError);
    });
  });

  describe('User toJSON()', () => {
    test('should not return user password when toJSON is called', () => {
      const newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
      expect(new UserModel(newUser).$formatJson()).not.toHaveProperty('password');
    });
  });
});
