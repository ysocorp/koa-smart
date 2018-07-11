"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @typedef {Object} StatusCode
 * @property {Number} ok HTTP response 200
 * @property {Number} created HTTP response 201
 * @property {Number} noContent HTTP response 204
 * @property {Number} badRequest HTTP response 400
 * @property {Number} unauthorized HTTP response 401
 * @property {Number} forbidden HTTP response 403
 * @property {Number} notFound HTTP response 404
 * @property {Number} internalServerError HTTP response 500
 */

exports.default = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500
};