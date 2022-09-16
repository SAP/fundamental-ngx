import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
const simpleActionBarHtml = 'platform-action-bar-simple-example.component.html';
const simpleActionBarTs = 'platform-action-bar-simple-example.component.ts';
const actionBarBackButtonTS = 'platform-action-bar-with-back-button-example.component.ts';
const actionBarDescriptionTs = 'platform-action-bar-with-description-example.component.ts';
const backButtonExampleHtml = 'platform-action-bar-with-back-button-example.component.html';
const backButtonExamplecss = 'platform-action-bar-with-back-button-example.component.scss';
const descriptionExampleHtml = 'platform-action-bar-with-description-example.component.html';
const descriptionExamplecss = 'platform-action-bar-with-description-example.component.scss';
const longPageTitleExampleHtml = 'platform-action-bar-with-long-title-example.component.html';
const longPageTitleExampleTs = 'platform-action-bar-with-long-title-example.component.ts';
const longPageTitleExamplecss = 'platform-action-bar-with-long-title-example.component.scss';
const contextualMenuExampleHtml = 'platform-action-bar-contextual-menu-example.component.html';
const contextualMenuExampleTs = 'platform-action-bar-contextual-menu-example.component.ts';
const contextualMenuExamplecss = 'platform-action-bar-contextual-menu-example.component.scss';
const positiveNegativeExampleHtml = 'platform-action-bar-positive-and-negative-action-example.component.html';
const positiveNegativeExampleTs = 'platform-action-bar-positive-and-negative-action-example.component.ts';
const positiveNegativecss = 'platform-action-bar-positive-and-negative-action-example.component.scss';
const simpleActionBarcss = 'platform-action-bar-simple-example.component.scss';
const cozyModeExampleHtml = 'platform-action-bar-cozy-mode-example.component.html';
const cozyModeExamplecss = 'platform-action-bar-cozy-mode-example.component.scss';
const cozyModeExampleTs = 'platform-action-bar-cozy-mode-example.component.ts';

@Component({
    selector: 'app-platform-action-bar',
    templateUrl: './platform-action-bar-docs.component.html',
    styleUrls: ['./platform-action-bar-docs.component.scss']
})
export class PlatformActionBarDocsComponent {
    simpleActionBar: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(simpleActionBarHtml),
            fileName: 'platform-action-bar-simple-example',
            scssFileCode: getAssetFromModuleAssets(simpleActionBarcss)
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarExamplesComponent',
            code: getAssetFromModuleAssets(simpleActionBarTs),
            fileName: 'platform-action-bar-simple-example'
        }
    ];

    backButtonExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(backButtonExampleHtml),
            fileName: 'platform-action-bar-with-back-button-example',
            scssFileCode: getAssetFromModuleAssets(backButtonExamplecss)
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithBackButtonExampleComponent',
            code: getAssetFromModuleAssets(actionBarBackButtonTS),
            fileName: 'platform-action-bar-with-back-button-example'
        }
    ];

    descriptionExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(descriptionExampleHtml),
            fileName: 'platform-action-bar-with-description-example',
            scssFileCode: getAssetFromModuleAssets(descriptionExamplecss)
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithDescriptionExampleComponent',
            code: getAssetFromModuleAssets(actionBarDescriptionTs),
            fileName: 'platform-action-bar-with-description-example'
        }
    ];

    longPageTitleExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(longPageTitleExampleHtml),
            fileName: 'platform-action-bar-with-long-title-example',
            scssFileCode: getAssetFromModuleAssets(longPageTitleExamplecss)
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithLongPageTitleExampleComponent',
            code: getAssetFromModuleAssets(longPageTitleExampleTs),
            fileName: 'platform-action-bar-with-long-title-example'
        }
    ];

    contextualMenuExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(contextualMenuExampleHtml),
            fileName: 'platform-action-bar-contextual-menu-example',
            scssFileCode: getAssetFromModuleAssets(contextualMenuExamplecss)
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithContextualMenuExampleComponent',
            code: getAssetFromModuleAssets(contextualMenuExampleTs),
            fileName: 'platform-action-bar-contextual-menu-example'
        }
    ];
    positiveNegativeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(positiveNegativeExampleHtml),
            fileName: 'platform-action-bar-positive-and-negative-action-example',
            scssFileCode: getAssetFromModuleAssets(positiveNegativecss)
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithPositiveNegativeActionsExampleComponent',
            code: getAssetFromModuleAssets(positiveNegativeExampleTs),
            fileName: 'platform-action-bar-positive-and-negative-action-example'
        }
    ];
    cozyModeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(cozyModeExampleHtml),
            fileName: 'platform-action-bar-cozy-mode-example',
            scssFileCode: getAssetFromModuleAssets(cozyModeExamplecss)
        },

        {
            language: 'typescript',
            component: 'PlatformActionBarCozyModeExampleComponent',
            code: getAssetFromModuleAssets(cozyModeExampleTs),
            fileName: 'platform-action-bar-cozy-mode-example'
        }
    ];
}
