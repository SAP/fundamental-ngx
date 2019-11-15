import { Component, OnInit } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as simpleActionBarHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-simple-example.component.html';
import * as simpleActionBarTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-simple-example.component.ts';
import * as actionBarBackButtonTS from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-back-button-example.component.ts';
import * as actionBarDescriptionTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-description-example.component.ts';
import * as backButtonExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-back-button-example.component.html';
import * as backButtonExamplecss from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-back-button-example.component.scss';
import * as descriptionExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-description-example.component.html';
import * as descriptionExamplecss from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-description-example.component.scss';
import * as longPageTitleExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-long-title-example.component.html';
import * as longPageTitleExampleTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-long-title-example.component.ts';
import * as longPageTitleExamplecss from '!raw-loader!./platform-action-bar-examples/platform-action-bar-with-long-title-example.component.scss';
import * as editActionBarTitleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-edit-title-example.component.html';
import * as editActionBarTitleTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-edit-title-example.component.ts';
import * as editActionBarTitlecss from '!raw-loader!./platform-action-bar-examples/platform-action-bar-edit-title-example.component.scss';
import * as contextualMenuExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-contextual-menu-example.component.html';
import * as contextualMenuExampleTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-contextual-menu-example.component.ts';
import * as contextualMenuExamplecss from '!raw-loader!./platform-action-bar-examples/platform-action-bar-contextual-menu-example.component.scss';
import * as positiveNegativeExampleHtml from '!raw-loader!./platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component.html';
import * as positiveNegativeExampleTs from '!raw-loader!./platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component.ts';
import * as positiveNegativecss from '!raw-loader!./platform-action-bar-examples/platform-action-bar-positive-and-negative-action-example.component.scss';
import * as simpleActionBarcss from '!raw-loader!./platform-action-bar-examples/platform-action-bar-simple-example.component.scss';
@Component({
    selector: 'app-platform-action-bar',
    templateUrl: './platform-action-bar-docs.component.html',
    styleUrls: ['./platform-action-bar-docs.component.scss']
})
export class PlatformActionBarDocsComponent implements OnInit {
    constructor() {}
    simpleActionBar: ExampleFile[] = [
        {
            language: 'html',
            code: simpleActionBarHtml,
            fileName: 'platform-action-bar-simple-example',
            scssFileCode: simpleActionBarcss
        },
        {
            language: 'typescript',
            component: 'PlatformActionbarExamplesComponent',
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
            component: 'PlatformActionbarWithBackButtonExampleComponent',
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
            component: 'PlatformActionbarWithDescriptionExampleComponent',
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
            component: 'PlatformActionbarWithLongPageTitleExampleComponent',
            code: longPageTitleExampleTs,
            fileName: 'platform-action-bar-with-long-title-example'
        }
    ];

    editActionBarTitle: ExampleFile[] = [
        {
            language: 'html',
            code: editActionBarTitleHtml,
            fileName: 'platform-action-bar-edit-title-example',
            scssFileCode: editActionBarTitlecss
        },
        {
            language: 'typescript',
            component: 'PlatformActionbarEditTitleExampleComponent',
            code: editActionBarTitleTs,
            fileName: 'platform-action-bar-edit-title-example'
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
            component: 'PlatformActionbarWithContextualMenuExampleComponent',
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
            component: 'PlatformActionbarWithPositiveNegativeActionsExampleComponent',
            code: positiveNegativeExampleTs,
            fileName: 'platform-action-bar-positive-and-negative-action-example'
        }
    ];

    ngOnInit() {}
}
