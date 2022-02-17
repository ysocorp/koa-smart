export default class ErrorApp implements Error {
    name: string;
    status: number | null;
    message: string;
    messages: Object | Array<any> | null;
    toTranslate: Boolean;
    typeError: string;
    constructor(status: any, message: any, toTranslate?: boolean);
}
