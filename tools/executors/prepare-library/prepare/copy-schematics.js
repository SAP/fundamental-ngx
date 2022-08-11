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
exports.__esModule = true;
exports.copySchematics = void 0;
var fs_extra_1 = require('fs-extra');
var child_process_1 = require('child_process');
function copySchematics(projectConfig, projectName) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var distFolder, options, rootFolder, tsConfigPath, schematicsPath;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log('=== Copying schematics of '.concat(projectName, ' ==='));
                    if (!projectName) {
                        projectName = projectConfig.name;
                    }
                    distFolder = (
                        (_b = (_a = projectConfig.targets) === null || _a === void 0 ? void 0 : _a.build) === null ||
                        _b === void 0
                            ? void 0
                            : _b.outputs
                    )[0];
                    if (!distFolder) {
                        throw new Error('No dist folder found for project '.concat(projectName));
                    }
                    options =
                        (_c = projectConfig.targets) === null || _c === void 0 ? void 0 : _c.prepare.options.schematics;
                    rootFolder = projectConfig.root;
                    tsConfigPath = ''.concat(rootFolder, '/').concat(options.tsConfig);
                    schematicsPath = ''.concat(rootFolder, '/').concat(options.collection);
                    if (
                        !(
                            (0, fs_extra_1.pathExistsSync)(schematicsPath) &&
                            (0, fs_extra_1.pathExistsSync)(tsConfigPath)
                        )
                    )
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, runTsc(tsConfigPath)];
                case 1:
                    _d.sent();
                    (0, fs_extra_1.copySync)(schematicsPath, ''.concat(distFolder, '/schematics'));
                    console.log('\u2705 Copied schematics for project '.concat(projectName));
                    return [3 /*break*/, 3];
                case 2:
                    throw new Error('No schematics found for project '.concat(projectName));
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
exports.copySchematics = copySchematics;
var runTsc = function (tsConfigPath) {
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [
                2 /*return*/,
                new Promise(function (resolve, reject) {
                    var _a, _b;
                    var process = (0, child_process_1.exec)('tsc -p '.concat(tsConfigPath));
                    (_a = process.stdout) === null || _a === void 0
                        ? void 0
                        : _a.on('data', function (data) {
                              console.log(data);
                          });
                    (_b = process.stderr) === null || _b === void 0
                        ? void 0
                        : _b.on('data', function (data) {
                              console.error(data);
                          });
                    process.on('close', function (code) {
                        if (code === 0) {
                            resolve(0);
                        } else {
                            reject(new Error('tsc exited with code '.concat(code)));
                        }
                    });
                })
            ];
        });
    });
};
