const BaseModel = require('./base.model');
const UserModel = require('./user.model');

class TokenModel extends BaseModel {
  static get tableName() {
    return 'tokens';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'tokens.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = TokenModel;
