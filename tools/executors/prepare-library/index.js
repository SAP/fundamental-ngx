"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const copy_schematics_1 = require("./utils/copy-schematics");
const sync_versions_1 = require("./utils/sync-versions");
const pack_1 = tslib_1.__importDefault(require("./utils/pack"));
async function prepareLibrary(_options, context) {
    var _a;
    const projectConfig = context.workspace.projects[context.projectName];
    let targetOptions = (0, devkit_1.readTargetOptions)({ project: context.projectName, target: context.targetName }, context);
    targetOptions = {
        ...targetOptions,
        ...{
            versionsOverrides: {
                projectVersion: (_options === null || _options === void 0 ? void 0 : _options.projectVersion) || ((_a = targetOptions.versionsOverrides) === null || _a === void 0 ? void 0 : _a.projectVersion)
            }
        }
    };
    if (!targetOptions.distPath) {
        throw new Error(`distPath was not provided for project ${context.projectName}`);
    }
    if (targetOptions === null || targetOptions === void 0 ? void 0 : targetOptions.schematics) {
        await (0, copy_schematics_1.copySchematics)(targetOptions, projectConfig, context.projectName);
    }
    await (0, sync_versions_1.syncVersions)(targetOptions, projectConfig, targetOptions.versionsOverrides, context.projectName);
    if (_options.pack) {
        return await (0, pack_1.default)(targetOptions, context);
    }
    return { success: true };
}
exports.default = prepareLibrary;
//# sourceMappingURL=index.js.map