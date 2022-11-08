import { isJsonArray, isJsonObject } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { updateWorkspace } from '@schematics/angular/utility/workspace';

import { findStylesheetFiles } from '../../utils/file-utils';

export default function (): Rule {
    return chain([removeStylesFromConfig(), removeIconFonts(), removeFontStyles(), noticeAddSchematics()]);
}

function removeStylesFromConfig(): Rule {
    return async (_: Tree, context: SchematicContext) =>
        updateWorkspace((workspace) => {
            workspace.projects.forEach((project) => {
                project.targets.forEach((target) => {
                    const styles = target.options?.styles;

                    if (!target.options?.styles || !styles || !isJsonArray(styles)) {
                        return;
                    }

                    const themes = [
                        'sap_horizon',
                        'sap_horizon_dark',
                        'sap_horizon_hcb',
                        'sap_horizon_hcw',
                        'sap_fiori_3',
                        'sap_fiori_3_dark',
                        'sap_fiori_3_hcb',
                        'sap_fiori_3_hcw',
                        'sap_fiori_3_light_dark'
                    ];

                    const stylesToRemove = [
                        'node_modules/fundamental-styles/dist/icon.css',
                        './node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_fiori_3/css_variables.css',
                        './node_modules/fundamental-styles/dist/theming/sap_fiori_3.css',
                        ...themes.map(
                            (theme) =>
                                `./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/${theme}/css_variables.css`
                        ),
                        ...themes.map((theme) => `./node_modules/fundamental-styles/dist/theming/${theme}.css`)
                    ];

                    stylesToRemove.forEach((styleToRemove) => {
                        const indexInStylesArray = styles.findIndex(
                            (configStyle) => typeof configStyle === 'string' && configStyle === styleToRemove
                        );
                        if (indexInStylesArray > -1) {
                            styles.splice(indexInStylesArray, 1);
                            context.logger.info(`✅️ Removed '${styleToRemove}' style from angular.json`);
                        }
                    });

                    target.options.styles = styles;
                });
            });
        });
}

function removeIconFonts(): Rule {
    return (tree: Tree, context: SchematicContext) =>
        updateWorkspace((workspace) => {
            workspace.projects.forEach((project) => {
                project.targets.forEach((target) => {
                    const styles = target.options?.styles;

                    if (!target.options?.styles || !styles || !isJsonArray(styles)) {
                        return;
                    }

                    const iconFonts = ['sap_fiori_3_fonts', 'sap_horizon_fonts'];

                    iconFonts.forEach((fontFile) => {
                        // Remove file
                        const fontFileWithPath = `${project.sourceRoot}/theming/${fontFile}.css`;
                        if (tree.exists(fontFileWithPath)) {
                            tree.delete(fontFileWithPath);
                            context.logger.info(`✅️ Removed ${fontFile}.css file.`);
                        }

                        // Remove from config
                        const indexInStylesArray = styles.findIndex(
                            (style) => isJsonObject(style) && style?.bundleName === `${fontFile}`
                        );
                        if (indexInStylesArray > -1) {
                            styles.splice(indexInStylesArray, 1);
                            context.logger.info(`✅️ Removed '${fontFile}' style from angular.json`);
                        }
                    });

                    target.options.styles = styles;
                });
            });
        });
}

function removeFontStyles(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const styleSheets = findStylesheetFiles(tree);

        if (styleSheets.length > 0) {
            const FONT_FACE_REGEX = /(@font-face)[\w\s]?{[s\S\W\w]+?(?=\s}\s)?\s?}[\n\s]*/gi;

            styleSheets.forEach((styleSheet) => {
                let buffer = tree.read(styleSheet);
                if (!buffer) {
                    return;
                }

                let contents = buffer.toString();

                if (FONT_FACE_REGEX.test(contents)) {
                    const matches = contents
                        .match(FONT_FACE_REGEX)!
                        .filter((m) => m.match(/~@sap-theming.*\.woff/)?.length);

                    if (matches.length === 0) {
                        return;
                    }

                    matches.forEach((match) => {
                        contents = contents.replace(match, '');
                    });

                    tree.overwrite(styleSheet, contents);
                    context.logger.info(`✅️ Removed font styles from stylesheets.`);
                }
            });
        }

        context.logger.info(
            `⚠️ Notice: If you have imported font styles from @sap-theming, please remove it, since now it is controlled by fundamental-ngx`
        );

        return tree;
    };
}

function noticeAddSchematics(): Rule {
    return (_: Tree, context: SchematicContext) => {
        // Unfortunately we cannot run it on our own because ng-update doesn't respect schema so there is no way to get options and pass them further
        context.logger.info(`ℹ️ Now you have to run ng-add schematics once again to set up things in the right way.`);
    };
}
