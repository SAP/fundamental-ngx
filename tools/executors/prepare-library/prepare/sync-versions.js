'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
exports.__esModule = true;
exports.syncVersions = void 0;
var fs_extra_1 = require('fs-extra');
var packageJson = JSON.parse((0, fs_extra_1.readFileSync)('./package.json', 'utf8'));
var excludedFileTypes = ['js', 'mjs', 'map', 'ts'];
var versions = {
    VERSION_PLACEHOLDER: packageJson.version,
    // As Angular version listed as peerDependency it should be ^X.0.0 to support any minor version
    ANGULAR_VER_PLACEHOLDER: '^'.concat(packageJson.dependencies['@angular/core'].match(/(.*)1./)[0].concat('.0.0')),
    RXJS_VER_PLACEHOLDER: packageJson.dependencies.rxjs,
    FAST_DEEP_EQUAL_VER_PLACEHOLDER: packageJson.dependencies['fast-deep-equal'],
    FDSTYLES_VER_PLACEHOLDER: packageJson.dependencies['fundamental-styles'],
    FDNSTYLES_VER_PLACEHOLDER: packageJson.dependencies['@fundamental-styles/fn'],
    FOCUSTRAP_VER_PLACEHOLDER: packageJson.dependencies['focus-trap'],
    FOCUSVISIBLE_VER_PLACEHOLDER: packageJson.dependencies['focus-visible'],
    LODASH_ES_VER_PLACEHOLDER: packageJson.dependencies['lodash-es'],
    COMPARE_VERSIONS_VER_PLACEHOLDER: packageJson.dependencies['compare-versions'],
    DAYJS_VER_PLACEHOLDER: packageJson.dependencies['dayjs'],
    THEMING_VER_PLACEHOLDER: packageJson.dependencies['@sap-theming/theming-base-content']
};
function syncVersions(projectConfig, projectName) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var distFolder, replaced;
        return __generator(this, function (_b) {
            console.log('=== Syncing versions in '.concat(projectName, ' ==='));
            distFolder = ((_a = projectConfig.targets) === null || _a === void 0 ? void 0 : _a.build.outputs)[0];
            if (!distFolder) {
                throw new Error('No dist folder found for project '.concat(projectName));
            }
            replaced = getFiles(distFolder).map(replaceInFile).filter(Boolean);
            if (replaced.length === 0) {
                console.log('\u26A0 No version placeholders found in '.concat(projectName));
                return [2 /*return*/];
            }
            return [2 /*return*/];
        });
    });
}
exports.syncVersions = syncVersions;
var replaceInFile = function (file) {
    var fileContents = (0, fs_extra_1.readFileSync)(file, 'utf8');
    var replaced = false;
    Object.keys(versions).forEach(function (key) {
        while (fileContents.indexOf(key) > -1) {
            replaced = true;
            fileContents = fileContents.replace(key, versions[key]);
            console.log('\u2705 Replaced "'.concat(key, '" with "').concat(versions[key], '" in ').concat(file));
        }
        (0, fs_extra_1.writeFileSync)(file, fileContents);
    });
    return replaced;
};
var getFiles = function (dir) {
    var files = (0, fs_extra_1.readdirSync)(dir, { withFileTypes: true });
    return files
        .filter(function (file) {
            return excludedFileTypes.every(function (fileType) {
                return !file.name.endsWith('.' + fileType);
            });
        })
        .map(function (file) {
            if (file.isDirectory()) {
                return getFiles(''.concat(dir, '/').concat(file.name));
            }
            return ''.concat(dir, '/').concat(file.name);
        })
        .reduce(function (acc, next) {
            if (Array.isArray(next)) {
                return __spreadArray(__spreadArray([], acc, true), next, true);
            }
            acc.push(next);
            return acc;
        }, []);
};
