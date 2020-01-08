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
declare const statuses: StatusCode;
export default statuses;
