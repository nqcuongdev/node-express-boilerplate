const knex = require('knex')(require('../databases/knexfile'));
const { Model } = require('objection');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

Model.knex(knex);

class BaseModel extends Model {
  static createNotFoundError() {
    return new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }

  static create(data) {
    return this.query().insert(data);
  }

  static updateAndFetch(data, id) {
    return this.query().patchAndFetchById(id, data).throwIfNotFound();
  }

  static findOne(condition) {
    return this.query().findOne(condition).throwIfNotFound();
  }

  static findById(condition) {
    return this.query().findById(condition).throwIfNotFound({ message: 'Not found' });
  }

  static findAll() {
    return this.query();
  }

  static delete(id) {
    if (id) {
      return this.query().deleteById(id);
    }

    return this.query().delete();
  }
}

module.exports = BaseModel;
