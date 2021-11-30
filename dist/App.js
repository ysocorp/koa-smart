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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const koa_1 = __importDefault(require("koa"));
const koa_locale_1 = __importDefault(require("koa-locale"));
const Route_1 = __importDefault(require("./routes/Route"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const utils_1 = require("./utils/utils");
const docGenerator = __importStar(require("./utils/docGenerator"));
class App {
    constructor(opt) {
        /**
         * @ignore
         */
        this.routeParam = null;
        /**
         * @ignore
         */
        this.routes = {};
        const { routeParam = {}, port = process.env.PORT || 3000, docPath = (0, path_1.join)(__dirname, "..", "apidoc"), generateDoc = false } = opt;
        this.routeParam = routeParam;
        /**
         * @ignore
         * @type {number}
         */
        this.port = port;
        /**
         * @ignore
         * @type {Koa}
         */
        this.koaApp = new koa_1.default();
        (0, koa_locale_1.default)(this.koaApp);
        docGenerator.init(docPath, generateDoc);
    }
    /**
     * @ignore
     */
    _getAllRoutes(path, prefix) {
        this.routes[prefix] = this.routes[prefix] || {};
        (0, fs_1.readdirSync)(path)
            .filter(file => file.endsWith(".js") || file.endsWith(".ts"))
            .forEach(file => {
            const RouteClass = require((0, path_1.join)(path, file)).default;
            if (RouteClass && RouteClass.prototype instanceof Route_1.default) {
                const route = new RouteClass(Object.assign({ prefix, koaApp: this.koaApp, routes: this.routes[prefix] }, this.routeParam));
                this.routes[prefix][route.constructor.name] = route;
            }
        });
        return (0, utils_1.objValToArray)(this.routes[prefix]);
    }
    /**
     * @access public
     * @desc adds the provided functions to the list of Koa middlewares to be executed for all routes.
     * @param {function} middlewares an array of Koa-compliant middlewares
     * @return { }
     */
    addMiddlewares(middlewares) {
        middlewares.forEach(e => this.addMiddleware(e));
    }
    /**
     * @access public
     * @desc adds the provided function to the list of Koa middlewares to be executed for all routes.
     * @param {function[]} middleware an array of middlewares
     * @return { }
     */
    addMiddleware(middleware) {
        this.koaApp.use(middleware);
    }
    /**
     * @access public
     * @desc "mounts" a folder, scanning it for route files, then adding the discovered routes to the app.
     *       a route is a class which extends {@link Route}
     * @param {string} pathFolder the path of the folder to mount
     * @param {string} [prefix='/'] an optional prefix to prepend to all of the folder's routes
     * @return { }
     */
    mountFolder(pathFolder, prefix = "/", opt = {}) {
        const { generateDoc = true } = opt;
        const routes = this._getAllRoutes(pathFolder, prefix);
        for (const route of routes) {
            route.generateDoc = generateDoc;
            route.mount();
            this.koaApp.use(route.koaRouter.middleware());
        }
    }
    /**
     * @access public
     * @desc Launches the app and starts listening on the configured port.
     * @return {Koa}
     */
    async start() {
        this.koaApp.use((0, notFound_1.default)());
        docGenerator.end();
        return this.koaApp.listen(this.port);
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map