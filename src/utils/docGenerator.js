import { join as pathJoin } from 'path';
import fs from 'fs-extra';
import { spawn } from 'child_process';

import { TypeArray } from '../types/TypeArray';
import { TypeObject } from '../types/TypeObject';

let DIR;
let DIR_TMP;
let ENABLE_DOC = false;

function _capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function _removeLast(string) {
  const elems = string.split('/');
  elems.pop();
  return elems.join('/');
}

function _param(file, type, keyBase, location) {
  if (type instanceof TypeObject) {
    for (const key in type._schema) {
      const formatedLocation = location ? `[${location}] ` : '';
      const tmpType = type._schema[key];
      const sKey = keyBase ? `${keyBase}.${key}` : key;
      const sKeyD = !tmpType._isRequired ? `[${sKey}]` : sKey;
      const sType = _capitalize(tmpType._type || 'Any');
      const description = _capitalize(tmpType._getDescription());
      fs.appendFileSync(file, ` * @apiParam {${sType}} ${sKeyD} ${formatedLocation}${description}\n`);
      if (tmpType instanceof TypeObject) {
        _param(file, tmpType, sKey, location);
      }
    }
  } else if (type instanceof TypeArray) {
    const sType = _capitalize(type._type || 'Any');
    const description = _capitalize(type._getDescription());
    fs.appendFileSync(file, ` * @apiParam {${sType}} __ARRAY_BODY__ ${description}\n`);
  }
}

export function init(pathDir, enable) {
  ENABLE_DOC = !!enable;
  if (!ENABLE_DOC) return;
  DIR = pathDir || pathJoin(__dirname, '..', 'ApiDoc');
  DIR_TMP = pathJoin(__dirname, '..', 'ApiDocTmp');
  fs.removeSync(DIR_TMP);
  fs.mkdirpSync(DIR_TMP);
}

export function generateDoc(classRoute, route) {
  if (!ENABLE_DOC || classRoute.generateDoc === false || route.options.doc.disable === true) return;

  const { options } = route;
  const className = classRoute.constructor.name.replace('Route', '');
  const routePathFileName = options.routePath.replace(/:/g, '-'); // to be able to create folder in Windows
  fs.mkdirpSync(pathJoin(DIR_TMP, _removeLast(routePathFileName)));
  const file = pathJoin(DIR_TMP, `${routePathFileName || className}.js`);
  fs.writeFileSync(file, '\n');

  let group = '';
  if (classRoute.prefix) {
    group += _capitalize(classRoute.prefix.replace(/^\//, ''));
    if (group.length) group += '/';
  }
  group += _capitalize(className);

  fs.appendFileSync(file, '/**\n');
  fs.appendFileSync(file, ` * @api {${options.type}} ${options.routePath || '/'}\n`);
  fs.appendFileSync(file, ` * @apiGroup ${group}\n`);
  if (route.options.doc.version) {
    fs.appendFileSync(file, ` * @apiVersion ${route.options.doc.version}\n`);
  }

  if (Array.isArray(options.accesses) && options.accesses.length) {
    const apiPermission = options.accesses.map(e => e.name || e).join(' OR ');
    fs.appendFileSync(file, ` * @apiPermission ${apiPermission}\n`);
  } else if (Array.isArray(classRoute.accesses) && classRoute.accesses.length) {
    const apiPermission = classRoute.accesses.map(e => e.name).join(' ');
    fs.appendFileSync(file, ` * @apiPermission ${apiPermission}\n`);
  } else {
    fs.appendFileSync(file, ' * @apiPermission public\n');
  }
  const displayLocation = options.bodyType && options.queryType;
  _param(file, options.bodyType, undefined, displayLocation ? 'BODY' : null);
  _param(file, options.queryType, undefined, displayLocation ? 'QUERY' : null);

  if (options.doc.description) {
    fs.appendFileSync(file, ` * @apiDescription ${options.doc.description}\n`);
  }

  fs.appendFileSync(file, '*/\n\n');
}

function _isWindow() {
  return process.platform === 'win32';
}

function _getCmd(cmd) {
  return !_isWindow() ? cmd : 'cmd';
}

export function end() {
  if (!ENABLE_DOC) return;
  const isWindows = _isWindow();
  const cmdArgsNpx = !isWindows
    ? ['apidoc', '-i', DIR_TMP, '-o', DIR]
    : ['/s', '/c', 'npx', 'apidoc', '-i', DIR_TMP, '-o', DIR];
  const cmdArgsRm = !isWindows ? ['-rf', DIR_TMP] : ['/s', '/c', 'rmdir', '/s', '/q', DIR_TMP];

  const cmdApidoc = spawn(_getCmd('npx'), cmdArgsNpx);
  cmdApidoc.on('close', code => {
    if (code === 1) {
      // eslint-disable-next-line
      console.error('[DocGenerator] an error when generate the apiDoc ');
    }
    spawn(_getCmd('rm'), cmdArgsRm);
  });
}
