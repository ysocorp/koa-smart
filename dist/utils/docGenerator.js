"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.generateDoc = exports.init = void 0;
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
const child_process_1 = require("child_process");
const TypeArray_1 = require("../types/TypeArray");
const TypeObject_1 = require("../types/TypeObject");
const utils_1 = require("./utils");
let DIR;
let DIR_TMP;
let ENABLE_DOC = false;
/**
 * @desc Removes last element in a route
 */
function _removeLast(string) {
    const elems = string.split('/');
    elems.pop();
    return elems.join('/');
}
function _param(file, type, keyBase, location) {
    if (type instanceof TypeObject_1.TypeObject) {
        for (const key in type._schema) {
            if (type._schema.hasOwnProperty(key)) {
                const formatedLocation = location ? `[${location}] ` : '';
                const tmpType = type._schema[key];
                const sKey = keyBase ? `${keyBase}.${key}` : key;
                const sKeyD = !tmpType._isRequired ? `[${sKey}]` : sKey;
                const sType = (0, utils_1.capitalize)(tmpType._type || 'Any');
                const description = (0, utils_1.capitalize)(tmpType._getDescription());
                fs_extra_1.default.appendFileSync(file, ` * @apiParam {${sType}} ${sKeyD} ${formatedLocation}${description}\n`);
                if (tmpType instanceof TypeObject_1.TypeObject) {
                    _param(file, tmpType, sKey, location);
                }
            }
        }
    }
    else if (type instanceof TypeArray_1.TypeArray) {
        const sType = (0, utils_1.capitalize)(type._type || 'Any');
        const description = (0, utils_1.capitalize)(type._getDescription());
        fs_extra_1.default.appendFileSync(file, ` * @apiParam {${sType}} __ARRAY_BODY__ ${description}\n`);
    }
}
function init(pathDir, enable) {
    ENABLE_DOC = !!enable;
    if (!ENABLE_DOC) {
        return;
    }
    DIR = pathDir || (0, path_1.join)(__dirname, '..', 'ApiDoc');
    DIR_TMP = (0, path_1.join)(__dirname, '..', 'ApiDocTmp');
    fs_extra_1.default.removeSync(DIR_TMP);
    fs_extra_1.default.mkdirpSync(DIR_TMP);
}
exports.init = init;
function generateDoc(classRoute, route) {
    if (!ENABLE_DOC || classRoute.generateDoc === false || route.options.doc.disable === true) {
        return;
    }
    const { options } = route;
    const className = classRoute.constructor.name.replace('Route', '');
    // to be able to create folder in Windows
    const routePathFileName = options.routePath.replace(/:|\?|"|\\|\/|\*|\|<|>/g, '-');
    fs_extra_1.default.mkdirpSync((0, path_1.join)(DIR_TMP, _removeLast(routePathFileName)));
    const file = (0, path_1.join)(DIR_TMP, `${routePathFileName || className}.js`);
    fs_extra_1.default.writeFileSync(file, '\n');
    let group = '';
    if (classRoute.prefix) {
        group += (0, utils_1.capitalize)(classRoute.prefix.replace(/^\//, ''));
        if (group.length) {
            group += '/';
        }
    }
    group += (0, utils_1.capitalize)(className);
    fs_extra_1.default.appendFileSync(file, '/**\n');
    fs_extra_1.default.appendFileSync(file, ` * @api {${options.type}} ${options.routePath || '/'}\n`);
    fs_extra_1.default.appendFileSync(file, ` * @apiGroup ${group}\n`);
    if (route.options.doc.version) {
        fs_extra_1.default.appendFileSync(file, ` * @apiVersion ${route.options.doc.version}\n`);
    }
    if (Array.isArray(options.accesses) && options.accesses.length) {
        const apiPermission = options.accesses.map(e => e.name || e).join(' OR ');
        fs_extra_1.default.appendFileSync(file, ` * @apiPermission ${apiPermission}\n`);
    }
    else if (Array.isArray(classRoute.accesses) && classRoute.accesses.length) {
        const apiPermission = classRoute.accesses.map(e => e.name).join(' ');
        fs_extra_1.default.appendFileSync(file, ` * @apiPermission ${apiPermission}\n`);
    }
    else {
        fs_extra_1.default.appendFileSync(file, ' * @apiPermission public\n');
    }
    const displayLocation = options.bodyType && options.queryType;
    _param(file, options.bodyType, undefined, displayLocation ? 'BODY' : null);
    _param(file, options.queryType, undefined, displayLocation ? 'QUERY' : null);
    if (options.doc.description) {
        fs_extra_1.default.appendFileSync(file, ` * @apiDescription ${options.doc.description}\n`);
    }
    fs_extra_1.default.appendFileSync(file, '*/\n\n');
}
exports.generateDoc = generateDoc;
function _isWindow() {
    return process.platform === 'win32';
}
function _getCmd(cmd) {
    return !_isWindow() ? cmd : 'cmd';
}
function end() {
    if (!ENABLE_DOC) {
        return;
    }
    const isWindows = _isWindow();
    const cmdArgsNpx = !isWindows
        ? ['apidoc', '-i', DIR_TMP, '-o', DIR]
        : ['/s', '/c', 'npx', 'apidoc', '-i', DIR_TMP, '-o', DIR];
    const cmdArgsRm = !isWindows ? ['-rf', DIR_TMP] : ['/s', '/c', 'rmdir', '/s', '/q', DIR_TMP];
    const cmdApidoc = (0, child_process_1.spawn)(_getCmd('npx'), cmdArgsNpx);
    cmdApidoc.on('close', code => {
        if (code === 1) {
            // eslint-disable-next-line
            console.error('[DocGenerator] an error when generate the apiDoc ');
        }
        (0, child_process_1.spawn)(_getCmd('rm'), cmdArgsRm);
    });
}
exports.end = end;
//# sourceMappingURL=docGenerator.js.map