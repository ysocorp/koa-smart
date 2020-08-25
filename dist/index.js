"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Route_1 = __importDefault(require("./routes/Route"));
const App_1 = __importDefault(require("./App"));
const ErrorApp_1 = __importDefault(require("./utils/ErrorApp"));
const StatusCode_1 = __importDefault(require("./utils/StatusCode"));
const Types = __importStar(require("./types/index"));
const middlewares = __importStar(require("./middlewares/index"));
module.exports = Object.assign({ App: App_1.default,
    Route: Route_1.default,
    ErrorApp: ErrorApp_1.default,
    StatusCode: StatusCode_1.default,
    middlewares }, Types);
//# sourceMappingURL=index.js.map