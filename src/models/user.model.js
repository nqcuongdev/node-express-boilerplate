const Joi = require('joi');
const bcrypt = require('bcryptjs');
const BaseModel = require('./base.model');
const TokenModel = require('./token.model');

class UserModel extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static async isEmailExists(email, excludeUserId = '') {
    const query = this.query().where('email', email);

    if (excludeUserId) {
      query.andWhere('id', '!=', excludeUserId);
    }

    return query.first();
  }

  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password);
  }

  async $beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 8);
    this.join_date = new Date();
    this.role = 'user';
    this.is_email_verified = true;
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);

    // Check if the update operation includes a new password
    if (this.password) {
      // Hash the new password before storing it in the database
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  $formatJson(json) {
    const user = super.$formatJson(json);
    delete user.password;
    delete user.is_email_verified;

    return user;
  }

  static get relationMappings() {
    return {
      tokens: {
        relation: BaseModel.HasManyRelation,
        modelClass: TokenModel,
        join: {
          from: 'users.id',
          to: 'tokens.user_id',
        },
      },
    };
  }

  static validate(user) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      about: Joi.string(),
      avatar: Joi.string(),
      contact_link: Joi.string(),
      join_date: Joi.date().required(),
      role: Joi.string().valid('user', 'admin').required(),
      status: Joi.string().valid('active', 'inactive', 'banned').required(),
      is_email_verified: Joi.boolean(),
    });

    return schema.validateAsync(user);
  }
}

module.exports = UserModel;
