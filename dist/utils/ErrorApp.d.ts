export default class ErrorApp implements Error {
    name: string;
    status: number | null;
    message: string;
    messages: Object | Array<any> | null;
    toTranslate: Boolean;
    constructor(status: any, message: any, toTranslate?: boolean);
}
