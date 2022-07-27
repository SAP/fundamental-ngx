import { Rule, SchematicContext, Tree, chain, SchematicsException } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
import { findStylesheetFiles } from '../../utils/file-utils';

import { sapFioriFonts, sapHorizonFonts } from './styles';
import { Schema } from './schema';

export function ngUpdate(options: any): Rule {
    return chain([addStylePathToConfig(options), createThemingStyleFiles(options)]);
}

interface AngularStyleObject {
    input: string;
    inject: boolean;
    bundleName: string;
}

const FONT_FACE_REGEX = /(@font-face)[\w\s]?{[\s\S\W\w]+?(?=\s}\s)?\s?}/gi;

const themeFontFiles = ['sap_fiori_3_fonts', 'sap_horizon_fonts'];

function createThemingStyleFiles(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const angularConfigPath = '/angular.json';
        const workspaceConfig = tree.read(angularConfigPath);

        if (!workspaceConfig) {
            throw new SchematicsException(
                `❌ Unable to find angular.json. Please manually configure your styles array.`
            );
        }

        const workspaceJson: WorkspaceSchema = JSON.parse(workspaceConfig.toString());

        const sourceRoot = workspaceJson.projects[options.project].sourceRoot;

        if (!tree.exists(`${sourceRoot}/theming/sap_fiori_3_fonts.css`)) {
            tree.create(`${sourceRoot}/theming/sap_fiori_3_fonts.css`, sapFioriFonts);
            context.logger.info(`✅️ Created sap_fiori_3_fonts.css file.`);
        }
        if (!tree.exists(`${sourceRoot}/theming/sap_horizon_fonts.css`)) {
            tree.create(`${sourceRoot}/theming/sap_horizon_fonts.css`, sapHorizonFonts);
            context.logger.info(`✅️ Created sap_horizon_fonts.css file.`);
        }

        if (options.autofixFontStyles) {
            const styleSheets = findStylesheetFiles(tree).filter(
                (s) => !s.endsWith('sap_horizon_fonts.css') && !s.endsWith('sap_fiori_3_fonts.css')
            );
            context.logger.info(styleSheets.join());

            if (styleSheets.length > 0) {
                styleSheets.forEach((styleSheet) => {
                    let contents = tree.read(styleSheet).toString();

                    if (FONT_FACE_REGEX.test(contents)) {
                        const matches = contents.match(FONT_FACE_REGEX).filter((m) => m.includes('/SAP-icons.woff'));

                        if (matches.length === 0) {
                            return;
                        }

                        matches.forEach((match) => {
                            contents = contents.replace(match, '');
                        });

                        tree.overwrite(styleSheet, contents);
                        context.logger.info(`✅️ Successfully migrated ${styleSheet}.`);
                    }
                });
            }
        }

        context.logger.info(
            `⚠️ Notice: If you have imported SAP-Icon icon font styles from @sap-theming, please remove it since now it controlled by fundamental-ngx`
        );

        return tree;
    };
}

// Adds the icon style path to the angular.json.
function addStylePathToConfig(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const angularConfigPath = '/angular.json';
        const workspaceConfig = tree.read(angularConfigPath);

        if (!workspaceConfig) {
            throw new SchematicsException(
                `❌ Unable to find angular.json. Please manually configure your styles array.`
            );
        }

        const workspaceJson: WorkspaceSchema = JSON.parse(workspaceConfig.toString());

        const sourceRoot = workspaceJson.projects[options.project].sourceRoot;

        try {
            let stylesArray = (workspaceJson!.projects[options.project]!.architect!.build!.options as any)[
                'styles'
            ] as (string | AngularStyleObject)[];

            if (
                !stylesArray.find(
                    (style) =>
                        (typeof style === 'object' && style.bundleName === 'fd_default_font_icons') ||
                        style === `${sourceRoot}/theming/${themeFontFiles[0]}.css`
                )
            ) {
                stylesArray.push({
                    input: `${sourceRoot}/theming/${themeFontFiles[0]}.css`,
                    inject: true,
                    bundleName: 'fd_default_font_icons'
                });
            }

            themeFontFiles.forEach((fontStyle) => {
                if (!stylesArray.find((style) => typeof style === 'object' && style.bundleName === `${fontStyle}`)) {
                    stylesArray.push({
                        input: `${sourceRoot}/theming/${fontStyle}.css`,
                        inject: false,
                        bundleName: fontStyle
                    });
                    context.logger.info(`✅️ Added ${fontStyle} font style to angular.json`);
                }
            });

            (workspaceJson!.projects[options.project]!.architect!.build!.options as any)['styles'] = stylesArray;
        } catch (e) {
            throw new SchematicsException(
                `❌ Unable to find angular.json project styles. Please manually configure your styles array.`
            );
        }

        tree.overwrite(angularConfigPath, JSON.stringify(workspaceJson, null, 2));

        return tree;
    };
}
