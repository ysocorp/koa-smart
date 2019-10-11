export interface StatusCode {
  /**
   * HTTP response 200
   */
  ok: number;
  /**
   * HTTP response 201
   */
  created: number;
  /**
   * HTTP response 204
   */
  noContent: number;
  /**
   * HTTP response 400
   */
  badRequest: number;
  /**
   * HTTP response 401
   */
  unauthorized: number;
  /**
   * HTTP response 403
   */
  forbidden: number;
  /**
   * HTTP response 404
   */
  notFound: number;
  /**
   * HTTP response 500
   */
  internalServerError: number;
}

const statuses: StatusCode = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
};

export default statuses;
