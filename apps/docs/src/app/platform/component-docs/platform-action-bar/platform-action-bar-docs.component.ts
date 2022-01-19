import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import simpleActionBarHtml from '!./platform-action-bar-examples/platform-action-bar-simple-example.component.html?raw';
import simpleActionBarTs from '!./platform-action-bar-examples/platform-action-bar-simple-example.component.ts?raw';
import actionBarBackButtonTS from '!./platform-action-bar-examples/platform-action-bar-with-back-button-example.component.ts?raw';
import actionBarDescriptionTs from '!./platform-action-bar-examples/platform-action-bar-with-description-example.component.ts?raw';
import backButtonExampleHtml from '!./platform-action-bar-examples/platform-action-bar-with-back-button-example.component.html?raw';
import backButtonExamplecss from '!./platform-action-bar-examples/platform-action-bar-with-back-button-example.component.scss?raw';
import descriptionExampleHtml from '!./platform-action-bar-examples/platform-action-bar-with-description-example.component.html?raw';
import descriptionExamplecss from '!./platform-action-bar-examples/platform-action-bar-with-description-example.component.scss?raw';
import longPageTitleExampleHtml from '!./platform-action-bar-examples/platform-action-bar-with-long-title-example.component.html?raw';
import longPageTitleExampleTs from '!./platform-action-bar-examples/platform-action-bar-with-long-title-example.component.ts?raw';
import longPageTitleExamplecss from '!./platform-action-bar-examples/platform-action-bar-with-long-title-example.component.scss?raw';
import contextualMenuExampleHtml from '!./platform-action-bar-examples/platform-action-bar-contextual-menu-example.component.html?raw';
import contextualMenuExampleTs from '!./platform-action-bar-examples/platform-action-bar-contextual-menu-example.component.ts?raw';
import contextualMenuExamplecss from '!./platform-action-bar-examples/platform-action-bar-contextual-menu-example.component.scss?raw';
import positiveNegativeExampleHtml from '!./platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component.html?raw';
import positiveNegativeExampleTs from '!./platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component.ts?raw';
import positiveNegativecss from '!./platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component.scss?raw';
import simpleActionBarcss from '!./platform-action-bar-examples/platform-action-bar-simple-example.component.scss?raw';
import cozyModeExampleHtml from '!./platform-action-bar-examples/platform-action-bar-cozy-mode-example.component.html?raw';
import cozyModeExamplecss from '!./platform-action-bar-examples/platform-action-bar-cozy-mode-example.component.scss?raw';
import cozyModeExampleTs from '!./platform-action-bar-examples/platform-action-bar-cozy-mode-example.component.ts?raw';
@Component({
    selector: 'app-platform-action-bar',
    templateUrl: './platform-action-bar-docs.component.html',
    styleUrls: ['./platform-action-bar-docs.component.scss']
})
export class PlatformActionBarDocsComponent {
    simpleActionBar: ExampleFile[] = [
        {
            language: 'html',
            code: simpleActionBarHtml,
            fileName: 'platform-action-bar-simple-example',
            scssFileCode: simpleActionBarcss
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarExamplesComponent',
            code: simpleActionBarTs,
            fileName: 'platform-action-bar-simple-example'
        }
    ];

    backButtonExample: ExampleFile[] = [
        {
            language: 'html',
            code: backButtonExampleHtml,
            fileName: 'platform-action-bar-with-back-button-example',
            scssFileCode: backButtonExamplecss
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithBackButtonExampleComponent',
            code: actionBarBackButtonTS,
            fileName: 'platform-action-bar-with-back-button-example'
        }
    ];

    descriptionExample: ExampleFile[] = [
        {
            language: 'html',
            code: descriptionExampleHtml,
            fileName: 'platform-action-bar-with-description-example',
            scssFileCode: descriptionExamplecss
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithDescriptionExampleComponent',
            code: actionBarDescriptionTs,
            fileName: 'platform-action-bar-with-description-example'
        }
    ];

    longPageTitleExample: ExampleFile[] = [
        {
            language: 'html',
            code: longPageTitleExampleHtml,
            fileName: 'platform-action-bar-with-long-title-example',
            scssFileCode: longPageTitleExamplecss
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithLongPageTitleExampleComponent',
            code: longPageTitleExampleTs,
            fileName: 'platform-action-bar-with-long-title-example'
        }
    ];

    contextualMenuExample: ExampleFile[] = [
        {
            language: 'html',
            code: contextualMenuExampleHtml,
            fileName: 'platform-action-bar-contextual-menu-example',
            scssFileCode: contextualMenuExamplecss
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithContextualMenuExampleComponent',
            code: contextualMenuExampleTs,
            fileName: 'platform-action-bar-contextual-menu-example'
        }
    ];
    positiveNegativeExample: ExampleFile[] = [
        {
            language: 'html',
            code: positiveNegativeExampleHtml,
            fileName: 'platform-action-bar-positive-and-negative-action-example',
            scssFileCode: positiveNegativecss
        },
        {
            language: 'typescript',
            component: 'PlatformActionBarWithPositiveNegativeActionsExampleComponent',
            code: positiveNegativeExampleTs,
            fileName: 'platform-action-bar-positive-and-negative-action-example'
        }
    ];
    cozyModeExample: ExampleFile[] = [
        {
            language: 'html',
            code: cozyModeExampleHtml,
            fileName: 'platform-action-bar-cozy-mode-example',
            scssFileCode: cozyModeExamplecss
        },

        {
            language: 'typescript',
            component: 'PlatformActionBarCozyModeExampleComponent',
            code: cozyModeExampleTs,
            fileName: 'platform-action-bar-cozy-mode-example'
        }
    ];
}
