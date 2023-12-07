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

  static async paginate(condition, { page, limit, sortBy }) {
    let query = this.query();
    const currentPage = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;

    if (condition) {
      query = condition(query);
    }

    if (sortBy) {
      const [sortField, sortDirection] = sortBy.split(':');
      query = query.orderBy(sortField, sortDirection);
    }
    const result = await query.page(currentPage - 1, pageSize);

    return {
      results: result.results,
      page: currentPage,
      limit: pageSize,
      totalPages: Math.ceil(result.total / pageSize),
      totalResults: result.total,
    };
  }
}

module.exports = BaseModel;
