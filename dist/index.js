"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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